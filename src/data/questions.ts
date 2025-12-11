import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: "Pick your favorite tech gadget!",
    options: [
      "Smartphone",
      "Laptop",
      "Smart Watch",
      "VR Headset"
    ],
    emoji: "📱"
  },
  {
    id: 2,
    text: "Choose your favorite color palette!",
    options: [
      "Blue & Purple",
      "Red & Orange",
      "Green & Yellow",
      "Black & Gold"
    ],
    emoji: "🎨"
  },
  {
    id: 3,
    text: "Which skill excites you the most?",
    options: [
      "Problem Solving",
      "Creative Design",
      "Communication",
      "Technical Skills"
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
      "Startup",
      "Creative Studio",
      "Tech Giant",
      "Remote"
    ],
    emoji: "🚀"
  }
];
