import React from 'react';
import { EuiText } from '@elastic/eui';

interface MessageProps {
  message: {
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  };
}

export default function MessageBubble({ message }: MessageProps) {
  const isUser = message.sender === 'user';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '8px',
      }}
    >
      <div
        style={{
          minWidth:'33%',
          maxWidth: '70%',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          backgroundColor: isUser ? '#007acc' : '#f5f5f5',
          color: isUser ? '#ffffff' : '#000000',
        }}
      >
        <EuiText size="s">{message.content}</EuiText>
        <EuiText
          size="xs"
          color="subdued"
          style={{ marginTop: '4px', textAlign: isUser ? 'right' : 'left' }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </EuiText>
      </div>
    </div>
  );
}
