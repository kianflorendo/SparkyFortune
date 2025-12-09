import type { ChatMessage } from '../types';
import './ChatBubble.css';

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  return (
    <div className={`chat-bubble ${message.sender}`}>
      <div className="bubble-content">
        {message.isTyping ? (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <p>{message.text}</p>
        )}
      </div>
    </div>
  );
};
