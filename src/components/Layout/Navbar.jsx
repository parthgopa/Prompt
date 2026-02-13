import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoGroup}>
        <span className={styles.logoText}>MeriShiksha</span>
        <span className={styles.badge}>Prompt Architect</span>
      </div>

      {/* <div className={styles.rightSection}>
        <div className={styles.statusIndicator}>
          <span className={styles.statusDot} />
          System Online
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;