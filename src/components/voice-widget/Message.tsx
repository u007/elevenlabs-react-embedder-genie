
import React from 'react';

export interface MessageProps {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  theme?: 'light' | 'dark';
}

const Message: React.FC<MessageProps> = ({ id, text, isUser, timestamp, theme = 'light' }) => {
  return (
    <div
      className={`mb-3 max-w-[85%] ${
        isUser ? 'ml-auto' : 'mr-auto'
      }`}
    >
      <div
        className={`p-3 rounded-lg ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : theme === 'dark'
            ? 'bg-gray-700 text-gray-100 rounded-bl-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        {text}
      </div>
      <div
        className={`text-xs mt-1 text-gray-500 ${
          isUser ? 'text-right' : ''
        }`}
      >
        {timestamp.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  );
};

export default Message;
