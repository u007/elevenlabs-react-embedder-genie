
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const useVoiceWidget = (agentName: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
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

  return {
    isOpen,
    isMicActive,
    messages,
    toggleWidget,
    toggleMicrophone,
    handleUserInput
  };
};
