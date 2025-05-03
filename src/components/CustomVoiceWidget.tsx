
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Phone, X, ChevronDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import WidgetHeader from './voice-widget/WidgetHeader';
import MessagesContainer from './voice-widget/MessagesContainer';
import MessageInput from './voice-widget/MessageInput';
import { useVoiceWidget } from '@/hooks/useVoiceWidget';

interface CustomVoiceWidgetProps {
  theme?: 'light' | 'dark';
  agentName?: string;
  gradientStartColor?: string;
  gradientEndColor?: string;
  textColor?: string;
}

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

const CustomVoiceWidget: React.FC<CustomVoiceWidgetProps> = ({ 
  theme = 'light',
  agentName = 'AI Assistant',
  gradientStartColor = '#f97316',
  gradientEndColor = '#f59e0b',
  textColor
}) => {
  const {
    isOpen,
    isMicActive,
    messages,
    toggleWidget,
    toggleMicrophone,
    handleUserInput,
    setLanguage
  } = useVoiceWidget(agentName);
  
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(LANGUAGES[0]);
  const [startColor, setStartColor] = useState(gradientStartColor);
  const [endColor, setEndColor] = useState(gradientEndColor);
  const [pulseOpacity, setPulseOpacity] = useState(1);

  // Animated pulsing effect for the AI icon
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setPulseOpacity(prev => {
          // Alternate between 0.6 and 1 for a subtle "breathing" effect
          return prev >= 1 ? 0.6 : 1;
        });
      }, 1500); // Change opacity every 1.5 seconds

      return () => clearInterval(interval);
    } else {
      setPulseOpacity(1); // Reset to full opacity when widget is opened
    }
  }, [isOpen]);

  const handleLanguageChange = (language: LanguageOption) => {
    setCurrentLanguage(language);
    setLanguage(language.code);
  };

  const handleStartColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartColor(e.target.value);
  };

  const handleEndColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndColor(e.target.value);
  };

  // Determine text color based on theme or custom setting
  const getTextColor = () => {
    if (textColor) {
      return textColor;
    }
    return theme === 'dark' ? '#ffffff' : '#000000';
  };

  const buttonStyle = {
    background: `linear-gradient(to right, ${startColor}, ${endColor})`,
    color: getTextColor()
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end`}>
      {/* Chat Widget */}
      {isOpen && (
        <Card className={`mb-4 w-80 md:w-96 shadow-sm ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <WidgetHeader 
            agentName={agentName} 
            theme={theme} 
            onClose={toggleWidget} 
          />
          
          <CardContent className="p-0">
            <MessagesContainer 
              messages={messages} 
              theme={theme}
              onLanguageChange={setLanguage}
            />
            <MessageInput 
              onSendMessage={handleUserInput}
              onToggleMicrophone={toggleMicrophone}
              isMicActive={isMicActive}
              theme={theme}
            />
          </CardContent>
        </Card>
      )}

      {/* Toggle Button - Updated to respect theme */}
      {!isOpen ? (
        <div className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-full shadow-sm p-2 pr-3`}>
          <div 
            className={`w-10 h-10 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 transition-opacity duration-1000`}
            style={{ opacity: pulseOpacity }}
          ></div>
          
          <Button
            onClick={toggleWidget}
            className={`rounded-full shadow-sm h-12 px-6 gap-2`}
            style={buttonStyle}
          >
            <Phone className="h-5 w-5" />
            <span style={{ color: getTextColor() }}>Start a call</span>
          </Button>
          
          {/* Language selector - Fixed positioning */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
                theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-white text-gray-800'
              }`}>
                <span className="text-base">{currentLanguage.flag}</span>
                <ChevronDown className={`h-4 w-4 ml-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`} />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                side="top" 
                className={`${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-100'} shadow-sm border`}
                sideOffset={5}
              >
                {LANGUAGES.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleLanguageChange(language)}
                  >
                    <span className="text-base">{language.flag}</span>
                    <span>{language.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <Button
          onClick={toggleWidget}
          className={`rounded-full shadow-sm h-12 w-12 flex items-center justify-center ${
            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}
        >
          <X className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default CustomVoiceWidget;
