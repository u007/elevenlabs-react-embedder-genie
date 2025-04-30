
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onToggleMicrophone: () => void;
  isMicActive: boolean;
  theme?: 'light' | 'dark';
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  onToggleMicrophone, 
  isMicActive, 
  theme = 'light'
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
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
        onClick={onToggleMicrophone}
      >
        {isMicActive ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
    </form>
  );
};

export default MessageInput;
