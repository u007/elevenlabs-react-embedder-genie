
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Phone, X } from "lucide-react";
import WidgetHeader from './voice-widget/WidgetHeader';
import MessagesContainer from './voice-widget/MessagesContainer';
import MessageInput from './voice-widget/MessageInput';
import { useVoiceWidget } from '@/hooks/useVoiceWidget';

interface CustomVoiceWidgetProps {
  theme?: 'light' | 'dark';
  agentName?: string;
}

const CustomVoiceWidget: React.FC<CustomVoiceWidgetProps> = ({ 
  theme = 'light',
  agentName = 'AI Assistant'
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
  
  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode);
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
              onLanguageChange={handleLanguageChange}
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
          <Button
            onClick={toggleWidget}
            className={`rounded-full shadow-sm bg-amber-400 hover:bg-amber-500 text-white h-12 px-6 gap-2`}
          >
            <Phone className="h-5 w-5" />
            Start a call
          </Button>
          
          {/* Language selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-200 bg-white text-sm">
              <span className="text-base">🇺🇸</span>
              <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-sm border border-gray-100">
              {/* The language items will be the same as in MessagesContainer */}
            </DropdownMenuContent>
          </DropdownMenu>
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
