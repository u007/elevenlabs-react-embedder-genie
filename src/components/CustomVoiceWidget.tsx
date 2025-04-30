import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Send, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface CustomVoiceWidgetProps {
  theme?: 'light' | 'dark';
  agentName?: string;
}

const CustomVoiceWidget: React.FC<CustomVoiceWidgetProps> = ({ 
  theme = 'light',
  agentName = 'AI Assistant'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Add initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: `Hi there! I'm ${agentName}. How can I help you today?`,
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }, [agentName]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const toggleMicrophone = () => {
    if (isMicActive) {
      stopMicrophone();
    } else {
      startMicrophone();
    }
  };

  const startMicrophone = async () => {
    try {
      // Request microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Normally we would connect this to a speech recognition service
      // For now just simulate activation
      setIsMicActive(true);
      
      toast({
        title: "Microphone active",
        description: "Listening for your voice input",
      });
      
      // Cleanup function
      return () => {
        stream.getTracks().forEach(track => track.stop());
      };
    } catch (error) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use voice input",
        variant: "destructive",
      });
    }
  };

  const stopMicrophone = () => {
    setIsMicActive(false);
    // Would normally disconnect from speech recognition here
    
    // For demo, let's simulate that something was detected
    const demoText = "This is simulated voice input text.";
    handleUserInput(demoText);
  };

  const handleUserInput = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responseText = generateDemoResponse(text);
      const responseMessage: Message = {
        id: Date.now() + 1,
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInput(inputText);
  };

  // Simple demo response generator
  const generateDemoResponse = (input: string): string => {
    const input_lower = input.toLowerCase();
    
    if (input_lower.includes('hello') || input_lower.includes('hi')) {
      return "Hello there! How can I assist you today?";
    } else if (input_lower.includes('help')) {
      return "I'm here to help! What do you need assistance with?";
    } else if (input_lower.includes('thank')) {
      return "You're welcome! Is there anything else I can help with?";
    } else if (input_lower.includes('bye') || input_lower.includes('goodbye')) {
      return "Goodbye! Have a great day!";
    } else {
      return "That's interesting. Can you tell me more about that?";
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end`}>
      {/* Chat Widget */}
      {isOpen && (
        <Card className={`mb-4 w-80 md:w-96 shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <CardHeader className="p-4 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{agentName}</CardTitle>
              <Button variant="ghost" size="icon" onClick={toggleWidget}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className={theme === 'dark' ? 'text-gray-300' : ''}>
              Voice and text assistant
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="h-64 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 max-w-[85%] ${
                    message.isUser ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : theme === 'dark'
                        ? 'bg-gray-700 text-gray-100 rounded-bl-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`text-xs mt-1 text-gray-500 ${
                      message.isUser ? 'text-right' : ''
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
              <Button 
                type="button"
                size="icon" 
                variant={isMicActive ? "destructive" : "outline"}
                onClick={toggleMicrophone}
              >
                {isMicActive ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Toggle Button */}
      <Button
        onClick={toggleWidget}
        className={`rounded-full shadow-lg p-3 h-12 w-12 flex items-center justify-center ${
          !isOpen ? 'animate-pulse' : ''
        }`}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default CustomVoiceWidget;
