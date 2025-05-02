
import React, { useState } from 'react';
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
  textColor = '#ffffff'
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
  const [btnTextColor, setBtnTextColor] = useState(textColor);

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

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBtnTextColor(e.target.value);
  };

  const buttonStyle = {
    background: `linear-gradient(to right, ${startColor}, ${endColor})`,
    color: btnTextColor
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

      {/* Toggle Button - Updated to be more like the image */}
      {!isOpen ? (
        <div className="flex items-center gap-2 bg-white rounded-full shadow-sm p-2 pr-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-300 to-amber-500"></div>
          
          {/* Color customization dropdowns */}
          <div className="flex gap-2 mr-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full" style={{ backgroundColor: startColor }}>
                  <span className="sr-only">Start color</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="start-color">Gradient Start Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="start-color"
                      value={startColor}
                      onChange={handleStartColorChange}
                      className="w-8 h-8"
                    />
                    <Input
                      type="text"
                      value={startColor}
                      onChange={handleStartColorChange}
                      placeholder="#f97316"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full" style={{ backgroundColor: endColor }}>
                  <span className="sr-only">End color</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="end-color">Gradient End Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="end-color"
                      value={endColor}
                      onChange={handleEndColorChange}
                      className="w-8 h-8"
                    />
                    <Input
                      type="text"
                      value={endColor}
                      onChange={handleEndColorChange}
                      placeholder="#f59e0b"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full" style={{ backgroundColor: btnTextColor }}>
                  <span className="sr-only">Text color</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="text-color">Text Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="text-color"
                      value={btnTextColor}
                      onChange={handleTextColorChange}
                      className="w-8 h-8"
                    />
                    <Input
                      type="text"
                      value={btnTextColor}
                      onChange={handleTextColorChange}
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <Button
            onClick={toggleWidget}
            className={`rounded-full shadow-sm h-12 px-6 gap-2`}
            style={buttonStyle}
          >
            <Phone className="h-5 w-5" />
            Start a call
          </Button>
          
          {/* Language selector - Fixed positioning */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-200 bg-white text-sm">
                <span className="text-base">{currentLanguage.flag}</span>
                <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                side="top" 
                className="bg-white shadow-sm border border-gray-100"
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
          className={`rounded-full shadow-sm h-12 w-12 flex items-center justify-center`}
        >
          <X className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default CustomVoiceWidget;

