import React from 'react';

const Maintenance = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Site Under Maintenance</h1>
      <p style={styles.message}>
        We are currently performing maintenance on our website. Please check back later.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  message: {
    fontSize: '16px',
  },
};

export default Maintenance;
