import React, { useState } from 'react';
import { promptService } from '../../services/api';
import styles from './SimpleGenerator.module.css';

const SimpleGenerator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const data = await promptService.generateSimple(input);
      setOutput(data.result);
    } catch (error) {
      setOutput("Error: Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Quick Generator</h2>
          <p className={styles.cardDescription}>
            Describe your idea and let AI craft a professional prompt for you.
          </p>
        </div>

        <label className={styles.label}>Initial Thought / Raw Idea</label>
        <textarea
          className={styles.textarea}
          rows="5"
          placeholder="e.g., Create a Python script to scrape stock prices..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className={styles.buttonGroup}>
          <button
            className={styles.generateBtn}
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
          >
            {loading ? (
              <>
                <span className={styles.spinner} />
                Processing...
              </>
            ) : (
              'Generate Prompt'
            )}
          </button>
        </div>

        {output && (
          <div className={styles.resultSection}>
            <div className={styles.resultHeader}>
              <h3 className={styles.resultTitle}>Generated Output</h3>
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className={styles.resultArea}>
              <pre className={styles.pre}>{output}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleGenerator;