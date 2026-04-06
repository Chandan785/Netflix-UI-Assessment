import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

const NetworkNotifier = () => {
  // Start with current navigator status
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false);
  const [justReconnected, setJustReconnected] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
      setJustReconnected(false);
    };
    const handleOnline = () => {
      setIsOffline(false);
      setJustReconnected(true);
      setTimeout(() => setJustReconnected(false), 3000); // Hide reconnected toast after 3s
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          key="offline-toast"
          initial={{ y: 50, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 50, opacity: 0, x: '-50%' }}
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            background: 'var(--accent-color)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 9999,
            fontWeight: 'bold',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap'
          }}
        >
          <WifiOff size={20} />
          You are currently offline. Viewing cached content.
        </motion.div>
      )}
      
      {justReconnected && (
        <motion.div
          key="online-toast"
          initial={{ y: 50, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 50, opacity: 0, x: '-50%' }}
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            background: '#2ecc71',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 9999,
            fontWeight: 'bold',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap'
          }}
        >
          <Wifi size={20} />
          Back online! Data is syncing.
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NetworkNotifier;
