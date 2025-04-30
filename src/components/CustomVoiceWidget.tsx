
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, X } from "lucide-react";
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
    handleUserInput
  } = useVoiceWidget(agentName);

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end`}>
      {/* Chat Widget */}
      {isOpen && (
        <Card className={`mb-4 w-80 md:w-96 shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <WidgetHeader 
            agentName={agentName} 
            theme={theme} 
            onClose={toggleWidget} 
          />
          
          <CardContent className="p-0">
            <MessagesContainer messages={messages} theme={theme} />
            <MessageInput 
              onSendMessage={handleUserInput}
              onToggleMicrophone={toggleMicrophone}
              isMicActive={isMicActive}
              theme={theme}
            />
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
