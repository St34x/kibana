import React, { useState, useEffect, useRef } from 'react';
import { EuiPanel, EuiFieldText, EuiButtonIcon, EuiSpacer } from '@elastic/eui';
import MessageBubble from './message-bubble';
import "../app.scss";
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

    // Ref to track the last message
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to the last message whenever messages update
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

  // Simulated API call to send the message
  const sendMessageToAPI = async (message: string): Promise<string> => {
    console.log('Sending message to API:', message); // Debug log
    try {
      const response = await fetch('/api/regulaite/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      console.log('Response from API:', data); // Debug log
      return data.message || 'No response from the server.';
    } catch (error) {
      console.error('Error sending message:', error);
      return 'Error communicating with the server.';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) {
      console.warn('Attempted to send empty message'); // Debug log
      return;
    }

    const userMessage: Message = {
      id: uuidv4(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add user message to the chat
    setMessages((prevMessages) => {
      console.log('Previous messages:', prevMessages); // Debug log
      return [...prevMessages, userMessage];
    });

    setInput('');
    setIsSending(true);

    try {
      // Send message to the backend and get the bot's response
      const botResponse = await sendMessageToAPI(input);

      const botMessage: Message = {
        id: uuidv4(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      // Add bot response to the chat
      setMessages((prevMessages) => {
        console.log('Adding bot message:', botMessage); // Debug log
        return [...prevMessages, botMessage];
      });
    } catch (error) {
      console.error('Error during handleSend:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <EuiPanel className="chatBox">
      {/* Message Display */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {messages.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888' }}>No messages yet.</p>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {/* Invisible div to anchor the scroll */}
        <div ref={messagesEndRef} />
      </div>

      <EuiSpacer size="m" />

      {/* Input Area */}
      <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem' }}>
        <EuiFieldText
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isSending) {
              console.log('Enter key pressed'); // Debug log
              handleSend();
            }
          }}
          fullWidth
        />
        <EuiButtonIcon
          iconType="arrowRight"
          onClick={() => {
            console.log('Send button clicked'); // Debug log
            handleSend();
          }}
          isDisabled={isSending || !input.trim()}
          aria-label="Send message"
        />
      </div>
    </EuiPanel>
  );
};

export default ChatInterface;
