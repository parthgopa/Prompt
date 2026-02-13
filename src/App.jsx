import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar';
import SimpleGenerator from './components/SImpleMode/SimpleGenerator';
import InteractiveGenerator from './components/InteractiveMode/InteractiveGenerator';
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState('simple');

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.tabsContainer}>
          <nav className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === 'simple' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('simple')}
            >
              Quick Generator
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'interactive' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('interactive')}
            >
              Interactive Builder
            </button>
          </nav>
        </div>

        <main className={styles.mainContent} key={activeTab}>
          {activeTab === 'simple' ? <SimpleGenerator /> : <InteractiveGenerator />}
        </main>
      </div>
    </div>
  );
}

export default App;