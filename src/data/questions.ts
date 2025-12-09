import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: "Pick your favorite tech gadget!",
    options: [
      "Smartphone - Always connected",
      "Laptop - Power and versatility",
      "Smart Watch - Health and efficiency",
      "VR Headset - Immersive experiences"
    ],
    emoji: "📱"
  },
  {
    id: 2,
    text: "Choose your favorite color palette!",
    options: [
      "Blue & Purple - Calm and creative",
      "Red & Orange - Bold and energetic",
      "Green & Yellow - Fresh and optimistic",
      "Black & Gold - Elegant and sophisticated"
    ],
    emoji: "🎨"
  },
  {
    id: 3,
    text: "Which skill excites you the most?",
    options: [
      "Problem Solving - Finding solutions",
      "Creative Design - Making things beautiful",
      "Communication - Connecting with people",
      "Technical Skills - Building & coding"
    ],
    emoji: "⚡"
  },
  {
    id: 4,
    text: "How do you spend your free time?",
    options: [
      "Learning new things",
      "Creating art or content",
      "Hanging out with friends",
      "Gaming or watching movies"
    ],
    emoji: "🎯"
  },
  {
    id: 5,
    text: "What's your dream work environment?",
    options: [
      "Startup - Fast-paced and innovative",
      "Creative Studio - Artistic and flexible",
      "Tech Giant - Structured and resourceful",
      "Remote - Freedom and independence"
    ],
    emoji: "🚀"
  }
];
