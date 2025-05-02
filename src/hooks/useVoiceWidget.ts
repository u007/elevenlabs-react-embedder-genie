
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
  const [language, setLanguage] = useState('en-US');
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

  // Language change effect
  useEffect(() => {
    if (language !== 'en-US' && messages.length > 0) {
      // Add a message indicating language change
      const languageName = new Intl.DisplayNames([language.split('-')[0]], { type: 'language' })
        .of(language.split('-')[0]) || language;
      
      const newMessage: Message = {
        id: Date.now(),
        text: `Language changed to ${languageName}. How can I help you?`,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
    }
  }, [language]);

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
      const responseText = generateDemoResponse(text, language);
      const responseMessage: Message = {
        id: Date.now() + 1,
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  // Simple demo response generator with language support
  const generateDemoResponse = (input: string, lang: string): string => {
    const input_lower = input.toLowerCase();
    
    // Simple translation for demo purposes
    const greetings: Record<string, string> = {
      'en-US': "Hello there! How can I assist you today?",
      'es-ES': "¡Hola! ¿Cómo puedo ayudarte hoy?",
      'fr-FR': "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      'de-DE': "Hallo! Wie kann ich Ihnen heute helfen?",
      'it-IT': "Ciao! Come posso aiutarti oggi?",
      'ja-JP': "こんにちは！今日はどのようにお手伝いできますか？",
      'ko-KR': "안녕하세요! 오늘 어떻게 도와드릴까요?",
      'zh-CN': "你好！今天我能帮你什么忙？",
    };
    
    if (input_lower.includes('hello') || input_lower.includes('hi')) {
      return greetings[lang] || greetings['en-US'];
    } else if (input_lower.includes('help')) {
      return lang.startsWith('en') ? 
        "I'm here to help! What do you need assistance with?" :
        "I'm here to help! (in your selected language)";
    } else {
      return lang.startsWith('en') ?
        "That's interesting. Can you tell me more about that?" :
        "That's interesting. Can you tell me more? (in your selected language)";
    }
  };

  return {
    isOpen,
    isMicActive,
    messages,
    language,
    toggleWidget,
    toggleMicrophone,
    handleUserInput,
    setLanguage
  };
};
