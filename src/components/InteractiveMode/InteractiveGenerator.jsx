import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { promptService } from '../../services/api';
import styles from './InteractiveGenerator.module.css';

const InteractiveGenerator = () => {
  // 1. UPDATE: Changed the initial message to match your new "Elite Agent" modes
  const [messages, setMessages] = useState([
    { 
      role: 'system', 
      text: `Unified Elite Prompt Engineer Agent initialized.

Please select the type of prompt you want:

A) Chatting Prompt (AI assistant style)
B) Deep Research Prompt (with sources & high accuracy)
C) Analytical/Professional Prompt (expert analysis, reports)
D) Other (Specify)

Enter A, B, C, or D to begin.` 
    }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // Add User Message to State
    const userMsg = { role: 'user', text: trimmed };
    const newHistory = [...messages, userMsg]; // Temp variable to send to API
    setMessages(newHistory);
    
    setInput('');
    setLoading(true);

    try {
      // 2. Call the new API endpoint
      // Note: We pass 'newHistory' so the latest user message is included in the context
      const data = await promptService.generateInteractive(newHistory, trimmed);
      
      const systemMsg = { role: 'system', text: data.reply };
      setMessages(prev => [...prev, systemMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'system', text: "Error: Failed to connect to the Elite Agent." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.chatHeader}>
          <h2 className={styles.chatHeaderTitle}>Interactive Builder</h2>
          <span className={styles.chatHeaderBadge}>Elite Agent Mode</span>
        </div>

        {/* Chat Window */}
        <div className={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.messageRow} ${
                msg.role === 'user' ? styles.messageRowUser : styles.messageRowSystem
              }`}
            >
              <div
                className={`${styles.message} ${
                  msg.role === 'user' ? styles.userMessage : styles.systemMessage
                }`}
              >
                {msg.role === 'system' ? (
                  <div className={styles.markdown}><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                ) : (
                  <div>{msg.text}</div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className={styles.typingIndicator}>
              <div className={styles.typingDots}>
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
              </div>
              <span className={styles.typingText}>Agent is thinking...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className={styles.inputArea}>
          <input
            type="text"
            className={styles.input}
            placeholder="Type your answer (e.g., 'A' or 'B')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg className={styles.sendIcon} viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGenerator;