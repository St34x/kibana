import React, { useState } from 'react';
import { EuiPanel, EuiFieldText, EuiButtonIcon, EuiSpacer } from '@elastic/eui';
import MessageBubble from './message-bubble';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      // Simulate sending a message to the backend
      const response = await fetch('/api/regul_aite/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      const botMessage: Message = {
        id: crypto.randomUUID(),
        content: data.message || 'No response received',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: 'Error communicating with the server.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <EuiPanel style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {messages.map((message) => (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
        ))}
      </div>

      <EuiSpacer size="m" />

      <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem' }}>
        <EuiFieldText
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isSending && handleSend()}
          fullWidth
        />
        <EuiButtonIcon
          iconType="arrowRight"
          onClick={handleSend}
          isDisabled={isSending || !input.trim()}
          aria-label="Send message"
        />
      </div>
    </EuiPanel>
  );
}
