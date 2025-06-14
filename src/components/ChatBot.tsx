
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Loader } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  userHealthProfile?: any;
}

const ChatBot: React.FC<ChatBotProps> = ({ userHealthProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your MediQueue health assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API call to Gemini
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue, userHealthProfile),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string, healthProfile: any) => {
    const input = userInput.toLowerCase();
    
    // Health-related responses
    if (input.includes('headache') || input.includes('head pain')) {
      return "For headaches, I recommend staying hydrated, getting adequate rest, and managing stress. If you experience severe or persistent headaches, please consult with a neurologist. Would you like me to help you book an appointment?";
    }
    
    if (input.includes('fever') || input.includes('temperature')) {
      return "Fever can be a sign of infection. Monitor your temperature, stay hydrated, and rest. If fever persists above 101°F (38°C) for more than 2 days, please consult a general physician. I can help you find available doctors nearby.";
    }
    
    if (input.includes('appointment') || input.includes('book') || input.includes('doctor')) {
      return "I can help you book an appointment! What type of specialist are you looking for? We have cardiologists, dermatologists, orthopedists, and many more available across the city.";
    }
    
    if (input.includes('symptoms') || input.includes('pain')) {
      return "I understand you're experiencing some discomfort. While I can provide general guidance, it's important to consult with a healthcare professional for proper diagnosis. Based on your symptoms, I can suggest the most appropriate specialist to see.";
    }
    
    if (input.includes('emergency') || input.includes('urgent')) {
      return "For medical emergencies, please call 108 immediately or visit the nearest emergency room. I can also help you find the closest hospital with emergency services. Your safety is the top priority.";
    }
    
    // Default responses
    const responses = [
      "I'm here to help with your health-related questions and appointment bookings. Could you please provide more details about what you're looking for?",
      "As your health assistant, I can help you understand symptoms, find appropriate specialists, and book appointments. What specific health concern can I assist you with?",
      "I'd be happy to help! Whether you need to book an appointment, understand symptoms, or get health advice, I'm here to assist. What would you like to know?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 btn-primary rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] glass-strong rounded-3xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <Bot className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Health Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-emerald-600">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs rounded-2xl p-3 ${
                    message.isUser
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white'
                      : 'glass text-gray-700'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!message.isUser && (
                      <Bot size={16} className="text-sky-500 mt-1 flex-shrink-0" />
                    )}
                    <p className="text-sm">{message.text}</p>
                    {message.isUser && (
                      <User size={16} className="text-white/80 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="glass rounded-2xl p-3 max-w-xs">
                  <div className="flex items-center gap-2">
                    <Bot size={16} className="text-sky-500" />
                    <Loader size={16} className="text-sky-500 animate-spin" />
                    <span className="text-sm text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about symptoms, book appointments..."
                className="flex-1 glass rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="btn-primary rounded-xl px-4 py-2 disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
