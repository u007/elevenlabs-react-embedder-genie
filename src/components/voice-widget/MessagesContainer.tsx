
import React, { useRef, useEffect, useState } from 'react';
import Message, { MessageProps } from './Message';
import { ChevronDown, Flag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳' },
];

interface MessagesContainerProps {
  messages: Omit<MessageProps, 'theme'>[];
  theme?: 'light' | 'dark';
  onLanguageChange?: (languageCode: string) => void;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ 
  messages, 
  theme = 'light',
  onLanguageChange = () => {} 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(LANGUAGES[0]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLanguageSelect = (language: LanguageOption) => {
    setCurrentLanguage(language);
    onLanguageChange(language.code);
  };

  return (
    <div className="flex flex-col h-64">
      <div className="overflow-y-auto p-4 flex-grow">
        {messages.map((message) => (
          <Message 
            key={message.id} 
            {...message} 
            theme={theme} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Language selector */}
      <div className="px-4 py-2 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-200 bg-white text-sm">
            <span className="text-base">{currentLanguage.flag}</span>
            <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-sm border border-gray-100">
            {LANGUAGES.map((language) => (
              <DropdownMenuItem
                key={language.code}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleLanguageSelect(language)}
              >
                <span className="text-base">{language.flag}</span>
                <span>{language.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MessagesContainer;
