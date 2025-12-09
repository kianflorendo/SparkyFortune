// Backend API URL - Force localhost for now
const API_URL = 'http://localhost:8000';
console.log('🔗 Backend API URL:', API_URL);

export interface PersonalityAnalysisResponse {
  type: string;
  message: string;
  traits: string[];
  color: string;
}

export const analyzePersonality = async (answers: string[]): Promise<PersonalityAnalysisResponse> => {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries}: Connecting to backend at ${API_URL}`);
      
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Successfully received personality analysis from backend:', data);
      return data;
    } catch (error) {
      lastError = error as Error;
      console.error(`❌ Attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        console.log(`Retrying in ${attempt} second(s)...`);
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
      }
    }
  }

  console.error('❌ All backend connection attempts failed. Using fallback personality generator.');
  console.error('Last error:', lastError);
  
  // Fallback personality based on answers
  return generateFallbackPersonality(answers);
};

const generateFallbackPersonality = (answers: string[]): PersonalityAnalysisResponse => {
  const personalities = [
    {
      type: "The Innovative Dreamer",
      message: "This is my message for you: Your creative spirit and love for technology make you a natural innovator. Keep dreaming big and turning those dreams into reality!",
      traits: [
        "Highly creative and imaginative",
        "Tech-savvy problem solver",
        "Embraces new possibilities",
        "Inspires others with ideas"
      ],
      color: "#667eea"
    },
    {
      type: "The Bold Trailblazer",
      message: "This is my message for you: Your energy and confidence are your superpowers! Don't be afraid to take the lead and show the world what you're made of.",
      traits: [
        "Passionate and driven",
        "Goal-oriented achiever",
        "Natural leader",
        "Takes initiative fearlessly"
      ],
      color: "#f5576c"
    },
    {
      type: "The Thoughtful Builder",
      message: "This is my message for you: Your attention to detail and methodical approach will help you build amazing things. Trust your process and keep creating!",
      traits: [
        "Systematic and organized",
        "Analytical thinker",
        "Loves deep learning",
        "Excellent problem solver"
      ],
      color: "#4ade80"
    }
  ];

  // Simple selection based on answer patterns
  const index = answers.join('').length % personalities.length;
  return personalities[index];
};
