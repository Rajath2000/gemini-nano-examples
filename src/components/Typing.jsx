import React from 'react';

const TypingDots = () => {
  return (
    <div style={styles.container}>
      <span style={styles.dot}></span>
      <span style={styles.dot}></span>
      <span style={styles.dot}></span>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  dot: {
    width: '8px',
    height: '8px',
    margin: '0 4px',
    backgroundColor: '#007bff',
    borderRadius: '50%',
    animation: 'typing 1.5s infinite ease-in-out',
  },
  '@keyframes typing': {
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
};

export default TypingDots;
