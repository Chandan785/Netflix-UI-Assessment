import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import './SignInScreen.css';

const SignInScreen = () => {
  const { loginAsGuest, loginWithFirebase } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await loginWithFirebase(email, password);
    } catch (err) {
      setError("Invalid credentials or user not found. Please try guest login.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-background">
        <div className="gradient-overlay"></div>
      </div>
      
      <motion.div 
        className="signin-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="logo-mega">
          Binaire<span className="logo-accent">App</span>
        </div>
        <h1 className="signin-title" style={{ fontSize: '3rem' }}>Unlimited TV.</h1>
        <p className="signin-subtitle">Sign in or proceed as guest.</p>
        
        <form onSubmit={handleSignIn} className="auth-form" style={{ maxWidth: '400px', margin: '0 auto 20px', textAlign: 'left' }}>
          {error && <div style={{ color: 'var(--accent-color)', marginBottom: '15px' }}>{error}</div>}
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="email" 
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '15px', borderRadius: '4px', background: 'rgba(0,0,0,0.7)', border: '1px solid #333', color: 'white', fontSize: '1rem' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '15px', borderRadius: '4px', background: 'rgba(0,0,0,0.7)', border: '1px solid #333', color: 'white', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Sign In with Firebase
          </button>
        </form>

        <div style={{ maxWidth: '400px', margin: '0 auto 30px' }}>
          <button className="btn-primary" onClick={loginAsGuest} style={{ width: '100%', justifyContent: 'center', background: '#333', boxShadow: 'none' }}>
            Sign In as Guest <span className="arrow" style={{marginLeft: '10px'}}>→</span>
          </button>
        </div>

        <p style={{ color: 'var(--text-secondary)' }}>
          New to Binaire? <Link to="/signup" style={{ color: 'white', fontWeight: 'bold' }}>Sign up now</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignInScreen;
