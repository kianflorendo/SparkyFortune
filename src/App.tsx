import { useState, useEffect, useRef } from 'react';
import './App.css';
import type { ChatMessage, PersonalityResult } from './types';
import { questions } from './data/questions';
import { ChatBubble } from './components/ChatBubble';
import { QuestionOptions } from './components/QuestionOptions';
import { PersonalityCard } from './components/PersonalityCard';
import { analyzePersonality } from './services/gemini';
import sparkyMascot from './assets/Sparky Thinking.png';
import sparkySitting from './assets/Sparky Sitting.png';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [personalityResult, setPersonalityResult] = useState<PersonalityResult | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showSparkySitting, setShowSparkySitting] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only scroll if there are messages and user hasn't manually scrolled
    if (messages.length > 0) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [messages]);

  const startQuiz = () => {
    setShowSparkySitting(true);
    
    // Wait for Sparky pop-in animation (0.6s) + brief pause
    setTimeout(() => {
      // Trigger transition to chat which starts Sparky slide animation
      setHasStarted(true);
      
      // Wait for Sparky slide animation to complete (1.2s) before showing first message
      setTimeout(() => {
        const welcomeMessage: ChatMessage = {
          id: Date.now(),
          text: "Hey there! 👋 Welcome to Fun Fortune! I'm here to discover your unique personality type. Answer a few fun questions, and I'll reveal what makes you special. Ready to begin? Let's go! ✨",
          sender: 'bot'
        };
        setMessages([welcomeMessage]);
        
        setTimeout(() => {
          askQuestion(0);
        }, 1000);
      }, 1200);
    }, 800);
  };

  const askQuestion = (index: number) => {
    if (index < questions.length) {
      const question = questions[index];
      const questionMessage: ChatMessage = {
        id: Date.now(),
        text: question.text,
        sender: 'bot'
      };
      setMessages(prev => [...prev, questionMessage]);
    }
  };

  const handleAnswer = async (answer: string) => {
    setIsProcessing(true);

    // Add user's answer to chat
    const userMessage: ChatMessage = {
      id: Date.now(),
      text: answer,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Wait a bit for natural conversation flow
    await new Promise(resolve => setTimeout(resolve, 800));

    if (currentQuestionIndex < questions.length - 1) {
      // More questions to go
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      askQuestion(currentQuestionIndex + 1);
      setIsProcessing(false);
    } else {
      // All questions answered - analyze personality
      const thinkingMessage: ChatMessage = {
        id: Date.now(),
        text: '',
        sender: 'bot',
        isTyping: true
      };
      setMessages(prev => [...prev, thinkingMessage]);

      // Get AI analysis
      const result = await analyzePersonality(newAnswers);
      
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      // Add completion message
      const completionMessage: ChatMessage = {
        id: Date.now(),
        text: "✨ Amazing! I've analyzed your responses and discovered something special about you. Check out your personality profile below! 🎉",
        sender: 'bot'
      };
      setMessages(prev => [...prev, completionMessage]);

      setPersonalityResult(result);
      setIsProcessing(false);
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsProcessing(false);
    setPersonalityResult(null);
    setHasStarted(false);
    setShowSparkySitting(false);
  };

  return (
    <div className="app">
      {!showSparkySitting ? (
        <div className="welcome-screen">
          <div className="welcome-content">
            <div className="welcome-icon">
              <img src={sparkyMascot} alt="Sparky - Fun Fortune Mascot" className="mascot-image" />
            </div>
            <h2>Welcome to Fun Fortune!</h2>
            <p>Ready to discover what makes you uniquely you?</p>
            <p className="welcome-description">
              Answer 5 quick questions and I'll reveal your personality type 
              with a special message just for you!
            </p>
            <button className="start-button" onClick={startQuiz}>
              Start Your Journey
            </button>
          </div>
        </div>
      ) : null}

      {showSparkySitting && (
        <div className={hasStarted ? "sparky-sitting-container" : "sparky-sitting-center"}>
          <img 
            src={sparkySitting} 
            alt="Sparky"
            className={hasStarted ? "sparky-sitting-img" : "sparky-sitting-center-img"}
          />
        </div>
      )}

      {hasStarted && (
          <div className="chat-container">
          <div className="chat-messages">
            {messages.map(message => (
              <ChatBubble key={message.id} message={message} />
            ))}

            {!personalityResult && currentQuestionIndex < questions.length && !isProcessing && (
              <QuestionOptions
                options={questions[currentQuestionIndex].options}
                onSelect={handleAnswer}
                disabled={isProcessing}
              />
            )}

            <div ref={chatEndRef} />
          </div>

          {personalityResult && (
            <PersonalityCard result={personalityResult} onRestart={handleRestart} />
          )}
          </div>
      )}

      <footer className="app-footer">
        <div className="footer-content">
          <img src={sparkyMascot} alt="Sparky" className="footer-mascot" />
          <p>Powered by <strong>Sparky</strong> | Made with Gemini AI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
