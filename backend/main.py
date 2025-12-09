from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Fun Fortune API")

# Configure CORS - allows both development and production origins
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:5174,http://localhost:5175").split(",")
if os.getenv("PRODUCTION_URL"):
    ALLOWED_ORIGINS.append(os.getenv("PRODUCTION_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS if len(ALLOWED_ORIGINS) > 0 else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    print("✅ Gemini API key loaded successfully")
else:
    print("❌ Gemini API key not found. Please set GEMINI_API_KEY in your .env file")


# Models
class AnalysisRequest(BaseModel):
    answers: List[str]


class PersonalityAnalysisResponse(BaseModel):
    type: str
    message: str
    traits: List[str]
    color: str


class Question(BaseModel):
    id: int
    text: str
    options: List[str]
    emoji: str


# Questions data
QUESTIONS = [
    {
        "id": 1,
        "text": "Pick your favorite tech gadget!",
        "options": [
            "Smartphone - Always connected",
            "Laptop - Power and versatility",
            "Smart Watch - Health and efficiency",
            "VR Headset - Immersive experiences"
        ],
        "emoji": "📱"
    },
    {
        "id": 2,
        "text": "Choose your favorite color palette!",
        "options": [
            "Blue & Purple - Calm and creative",
            "Red & Orange - Bold and energetic",
            "Green & Yellow - Fresh and optimistic",
            "Black & Gold - Elegant and sophisticated"
        ],
        "emoji": "🎨"
    },
    {
        "id": 3,
        "text": "Which skill excites you the most?",
        "options": [
            "Problem Solving - Finding solutions",
            "Creative Design - Making things beautiful",
            "Communication - Connecting with people",
            "Technical Skills - Building & coding"
        ],
        "emoji": "⚡"
    },
    {
        "id": 4,
        "text": "How do you spend your free time?",
        "options": [
            "Learning new things",
            "Creating art or content",
            "Hanging out with friends",
            "Gaming or watching movies"
        ],
        "emoji": "🎯"
    },
    {
        "id": 5,
        "text": "What's your dream work environment?",
        "options": [
            "Startup - Fast-paced and innovative",
            "Creative Studio - Artistic and flexible",
            "Tech Giant - Structured and resourceful",
            "Remote - Freedom and independence"
        ],
        "emoji": "🚀"
    }
]


# Fallback personalities
FALLBACK_PERSONALITIES = [
    {
        "type": "The Innovative Dreamer",
        "message": "This is my message for you: Your creative spirit and love for technology make you a natural innovator. Keep dreaming big and turning those dreams into reality!",
        "traits": [
            "Highly creative and imaginative",
            "Tech-savvy problem solver",
            "Embraces new possibilities",
            "Inspires others with ideas"
        ],
        "color": "#667eea"
    },
    {
        "type": "The Bold Trailblazer",
        "message": "This is my message for you: Your energy and confidence are your superpowers! Don't be afraid to take the lead and show the world what you're made of.",
        "traits": [
            "Passionate and driven",
            "Goal-oriented achiever",
            "Natural leader",
            "Takes initiative fearlessly"
        ],
        "color": "#f5576c"
    },
    {
        "type": "The Thoughtful Builder",
        "message": "This is my message for you: Your attention to detail and methodical approach will help you build amazing things. Trust your process and keep creating!",
        "traits": [
            "Systematic and organized",
            "Analytical thinker",
            "Loves deep learning",
            "Excellent problem solver"
        ],
        "color": "#4ade80"
    }
]


def generate_fallback_personality(answers: List[str]) -> dict:
    """Generate a fallback personality based on answers."""
    index = len(''.join(answers)) % len(FALLBACK_PERSONALITIES)
    return FALLBACK_PERSONALITIES[index]


@app.get("/")
async def root():
    return {"message": "Fun Fortune API is running!", "version": "1.0.0"}


@app.get("/api/questions", response_model=List[Question])
async def get_questions():
    """Get all personality quiz questions."""
    return QUESTIONS


@app.post("/api/analyze", response_model=PersonalityAnalysisResponse)
async def analyze_personality(request: AnalysisRequest):
    """Analyze personality based on quiz answers."""
    
    print("=" * 50)
    print("🔵 RECEIVED REQUEST TO /api/analyze")
    print(f"📊 Answers received: {len(request.answers)} answers")
    print(f"📝 First answer: {request.answers[0] if request.answers else 'None'}")
    print("=" * 50)
    
    if not request.answers or len(request.answers) == 0:
        raise HTTPException(status_code=400, detail="No answers provided")
    
    # If no API key, return fallback
    if not GEMINI_API_KEY:
        return generate_fallback_personality(request.answers)
    
    try:
        # Configure the model - Using Gemini 2.5 Flash Lite
        model = genai.GenerativeModel(
            model_name='gemini-2.5-flash-lite',
            generation_config={
                'temperature': 0.9,
                'top_k': 40,
                'top_p': 0.95,
                'max_output_tokens': 1024,
            }
        )
        
        # Create the prompt
        answers_text = '\n'.join([f"{i+1}. {answer}" for i, answer in enumerate(request.answers)])
        
        prompt = f"""You are a creative personality analyst. Based on these personality test answers, create a fun and engaging personality profile:

Answers:
{answers_text}

You MUST respond with ONLY a valid JSON object in this exact format:
{{
  "type": "A creative personality type name (e.g., The Innovative Dreamer, The Bold Visionary)",
  "message": "An inspiring 2-3 sentence message that starts with 'This is my message for you:' and feels warm and personal",
  "traits": [
    "First key personality trait (be specific and descriptive)",
    "Second key personality trait",
    "Third key personality trait",
    "Fourth key personality trait"
  ],
  "color": "#hexcolor (choose from: #667eea, #f5576c, #4ade80, #fbbf24, #8b5cf6, #ec4899)"
}}

Requirements:
- Make it fun, positive, and memorable
- Personalize based on the answers provided
- Use NO emojis in traits or message
- Return ONLY valid JSON, nothing else
- Be creative with the personality type name

JSON Response:"""
        
        # Generate content
        response = model.generate_content(prompt)
        text = response.text.strip()
        
        print(f"Gemini API Response: {text}")
        
        # Clean up response - remove markdown code blocks if present
        text = text.replace('```json', '').replace('```', '').strip()
        
        # Try to extract JSON from the response
        try:
            # Find JSON object in response
            start_idx = text.find('{')
            end_idx = text.rfind('}') + 1
            
            if start_idx != -1 and end_idx > start_idx:
                json_text = text[start_idx:end_idx]
                parsed = json.loads(json_text)
                
                # Validate required fields
                required_fields = ['type', 'message', 'traits', 'color']
                if not all(field in parsed for field in required_fields):
                    raise ValueError("Missing required fields in response")
                
                # Ensure traits is an array
                if not isinstance(parsed['traits'], list):
                    raise ValueError("Traits must be an array")
                
                print(f"Successfully parsed AI response: {parsed}")
                return PersonalityAnalysisResponse(**parsed)
            else:
                raise ValueError("No JSON object found in response")
                
        except (json.JSONDecodeError, ValueError) as e:
            print(f"Error parsing JSON: {e}")
            print(f"Using fallback personality generator")
            return generate_fallback_personality(request.answers)
    
    except Exception as e:
        print(f"Error analyzing personality with Gemini API: {e}")
        print("Using fallback personality generator")
        return generate_fallback_personality(request.answers)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
