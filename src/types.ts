export interface Question {
  id: number;
  text: string;
  options: string[];
  emoji: string;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  isTyping?: boolean;
}

export interface PersonalityResult {
  type: string;
  message: string;
  traits: string[];
  color: string;
}
