import React, { useState } from 'react';
import { EuiPanel, EuiFieldText, EuiButtonIcon, EuiSpacer } from '@elastic/eui';
import MessageBubble from './message-bubble';
import "../app.scss";
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

  // Simulated API call to send the message
  const sendMessageToAPI = async (message: string): Promise<string> => {
    try {
      // Replace with backend endpoint
      const response = await fetch('/api/regulaite/send_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      return data.message || 'No response received from the server.';
    } catch (error) {
      console.error('Error sending message:', error);
      return 'Error communicating with the server.';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add user message to the chat
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      // Send message to the backend and get the bot's response
      const botResponse = await sendMessageToAPI(input);

      const botMessage: Message = {
        id: crypto.randomUUID(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      // Add bot response to the chat
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      // Handle errors gracefully
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: 'Something went wrong. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };


  return (
      <EuiPanel className='chatBox'>
        {/* Message Display */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>

        <EuiSpacer size="m" />

        {/* Input Area */}
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
};

export default ChatInterface;
