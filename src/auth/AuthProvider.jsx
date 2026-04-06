import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from '../services/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for guest
    const savedUser = localStorage.getItem('guestSession');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setLoading(false);
    }

    // Subscribe to real firebase auth
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // If a real user is signed in, overwrite guest session
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          role: 'user'
        });
        localStorage.removeItem('guestSession');
      } else if (!savedUser) {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginAsGuest = () => {
    const guestUser = { id: 'guest', name: 'Guest User', role: 'guest' };
    setUser(guestUser);
    localStorage.setItem('guestSession', JSON.stringify(guestUser));
  };

  const loginWithFirebase = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithFirebase = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (user?.role === 'guest') {
      setUser(null);
      localStorage.removeItem('guestSession');
    } else {
      await signOut(auth);
      setUser(null);
    }
  };

  if (loading) {
    return <div className="loader" style={{margin: '40px auto'}}></div>;
  }

  return (
    <AuthContext.Provider value={{ user, loginAsGuest, loginWithFirebase, signUpWithFirebase, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
