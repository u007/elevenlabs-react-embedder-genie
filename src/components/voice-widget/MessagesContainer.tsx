
import React, { useRef, useEffect } from 'react';
import Message, { MessageProps } from './Message';

interface MessagesContainerProps {
  messages: Omit<MessageProps, 'theme'>[];
  theme?: 'light' | 'dark';
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages, theme = 'light' }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-64 overflow-y-auto p-4">
      {messages.map((message) => (
        <Message 
          key={message.id} 
          {...message} 
          theme={theme} 
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;
