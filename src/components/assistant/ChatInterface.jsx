import React, { useState, useRef, useEffect } from 'react';
import { Send, Map, AlertTriangle, Clock, User, Bot, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

const QuickActionButton = ({ label, icon, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-light dark:bg-surface-dark rounded-full text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
  >
    {icon}
    <span>{label}</span>
  </button>
);

export const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! I'm your WalkWise AI assistant. How can I help you stay safe today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
      type: "text",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes("safe") && (input.includes("route") || input.includes("path"))) {
      return {
        id: Date.now().toString(),
        content: "I've found the safest route to your destination. This path avoids high-crime areas and stays on well-lit streets with CCTV coverage.",
        sender: "ai",
        timestamp: new Date(),
        type: "map",
        metadata: {
          mapPreview: true,
          safetyScore: 95,
          duration: "15 mins",
          distance: "1.2 miles",
        },
      };
    } else if (input.includes("atm") || input.includes("cash")) {
      return {
        id: Date.now().toString(),
        content: "I've located several safe ATMs near you. The closest one is 0.3 miles away at First National Bank on Main Street, which has good lighting and CCTV coverage.",
        sender: "ai",
        timestamp: new Date(),
        type: "suggestion",
        metadata: {
          suggestions: [
            { name: "First National Bank", distance: "0.3 miles", safety: "High" },
            { name: "City Credit Union", distance: "0.5 miles", safety: "High" },
            { name: "Metro Bank", distance: "0.8 miles", safety: "Medium" },
          ],
        },
      };
    } else if (input.includes("dangerous") || input.includes("avoid")) {
      return {
        id: Date.now().toString(),
        content: "Warning: The area ahead has reported 3 incidents in the past week. I recommend taking an alternative route or proceeding with caution.",
        sender: "ai",
        timestamp: new Date(),
        type: "alert",
        metadata: {
          alertLevel: "high",
          incidents: 3,
          recommendation: "Avoid area if possible",
        },
      };
    } else {
      return {
        id: Date.now().toString(),
        content: "I'm here to help you navigate safely. You can ask me about safe routes, nearby ATMs, potential dangers, or use the quick actions below.",
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      };
    }
  };

  const handleQuickAction = (action) => {
    let message = "";
    
    switch (action) {
      case "safe-route":
        message = "Find me the safest route to the nearest subway station";
        break;
      case "atm":
        message = "Where is the safest ATM near me?";
        break;
      case "check-in":
        message = "Send a check-in to my emergency contacts";
        break;
      case "danger":
        message = "Are there any dangerous areas near me?";
        break;
      default:
        message = "";
    }
    
    setInput(message);
    inputRef.current?.focus();
  };

  return (
    <Card className="flex flex-col h-[600px] w-full shadow-elevation-2">
      <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
        <div className="flex items-center gap-2">
          <div className="bg-primary-100 dark:bg-primary-900 p-1.5 rounded-full">
            <Bot size={20} className="text-primary-500" />
          </div>
          <h2 className="font-semibold">WalkWise AI Assistant</h2>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <X size={18} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.sender === "user"
                  ? "bg-primary-500 text-white rounded-tr-none"
                  : "bg-surface-light dark:bg-surface-dark rounded-tl-none"
              )}
            >
              {message.type === "text" && (
                <p>{message.content}</p>
              )}
              
              {message.type === "map" && message.metadata && (
                <div>
                  <p className="mb-2">{message.content}</p>
                  <div className="bg-gray-200 dark:bg-gray-700 h-40 rounded-md flex items-center justify-center mb-2">
                    <Map size={24} className="text-gray-500 dark:text-gray-400" />
                    <span className="ml-2 text-sm">Map Preview</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Safety: {message.metadata.safetyScore}%</span>
                    <span>{message.metadata.duration}</span>
                    <span>{message.metadata.distance}</span>
                  </div>
                  <Button size="sm" className="w-full mt-2" variant="primary">
                    Navigate Now
                  </Button>
                </div>
              )}
              
              {message.type === "suggestion" && message.metadata && (
                <div>
                  <p className="mb-2">{message.content}</p>
                  <div className="space-y-2 mt-2">
                    {message.metadata.suggestions.map((suggestion, index) => (
                      <div 
                        key={index} 
                        className="bg-white dark:bg-gray-700 rounded-md p-2 text-sm flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium">{suggestion.name}</div>
                          <div className="text-xs">{suggestion.distance}</div>
                        </div>
                        <div className={cn(
                          "px-2 py-0.5 rounded-full text-xs",
                          suggestion.safety === "High" ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300" :
                          suggestion.safety === "Medium" ? "bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300" :
                          "bg-danger-100 text-danger-700 dark:bg-danger-900 dark:text-danger-300"
                        )}>
                          {suggestion.safety}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {message.type === "alert" && message.metadata && (
                <div className="bg-danger-50 dark:bg-danger-900/30 border border-danger-200 dark:border-danger-800 rounded-md p-3 text-danger-800 dark:text-danger-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={18} />
                    <span className="font-semibold">Safety Alert</span>
                  </div>
                  <p className="mb-2">{message.content}</p>
                  <div className="text-sm">
                    <div>Recent incidents: {message.metadata.incidents}</div>
                    <div>Recommendation: {message.metadata.recommendation}</div>
                  </div>
                </div>
              )}
              
              <div className={cn(
                "flex items-center gap-1 mt-1 text-xs",
                message.sender === "user" ? "text-white/70 justify-end" : "text-gray-500 dark:text-gray-400"
              )}>
                <Clock size={12} />
                <span>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-surface-light dark:bg-surface-dark rounded-lg rounded-tl-none p-3 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-border-light dark:border-border-dark">
        <div className="flex flex-wrap gap-2 mb-3">
          <QuickActionButton 
            label="Find Safe Route" 
            icon={<Map size={14} />} 
            onClick={() => handleQuickAction("safe-route")} 
          />
          <QuickActionButton 
            label="Safe ATM" 
            icon={<AlertTriangle size={14} />} 
            onClick={() => handleQuickAction("atm")} 
          />
          <QuickActionButton 
            label="Check-in" 
            icon={<Clock size={14} />} 
            onClick={() => handleQuickAction("check-in")} 
          />
          <QuickActionButton 
            label="Danger Zones" 
            icon={<AlertTriangle size={14} />} 
            onClick={() => handleQuickAction("danger")} 
          />
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="text"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask for safety tips, directions, or alerts..."
            className="flex-1 rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-2 text-text-light-primary dark:text-text-dark-primary outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            variant="primary"
            size="sm"
            className="h-10 w-10 p-0 flex items-center justify-center"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
};
