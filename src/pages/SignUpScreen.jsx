import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import './SignInScreen.css'; // Reusing layout css from SignInScreen

const SignUpScreen = () => {
  const { signUpWithFirebase } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithFirebase(email, password);
      // AuthProvider will automatically push to /home upon user detection
    } catch (err) {
      setError(err.message);
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
        <h1 className="signin-title" style={{ fontSize: '3rem' }}>Create Account</h1>
        <p className="signin-subtitle">Join us to access unlimited high quality content.</p>
        
        <form onSubmit={handleSignUp} className="auth-form" style={{ maxWidth: '400px', margin: '0 auto 40px' }}>
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
            Sign Up
          </button>
        </form>

        <p style={{ color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/signin" style={{ color: 'white', fontWeight: 'bold' }}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpScreen;
