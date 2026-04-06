import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import TitleCard from '../components/TitleCard';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const wl = JSON.parse(localStorage.getItem('binaire_watchlist') || '[]');
    const hist = JSON.parse(localStorage.getItem('binaire_history') || '[]');
    setWatchlist(wl);
    setHistory(hist);
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
        <div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>Profile</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
            Logged in as: <span style={{ color: 'white' }}>{user?.email || user?.name}</span> ({user?.role})
          </p>
        </div>
        <button onClick={logout} className="btn-primary" style={{ background: '#333', padding: '12px 30px' }}>
          Sign Out
        </button>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>My Watchlist</h2>
        {watchlist.length === 0 ? <p style={{color: '#888', fontSize: '1.1rem'}}>Your watchlist is empty. Add movies while browsing!</p> : (
          <div className="card-grid">
            {watchlist.map((item, i) => <TitleCard key={'wl-'+i} title={item} index={i} />)}
          </div>
        )}
      </div>

      <div>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Watch History</h2>
        {history.length === 0 ? <p style={{color: '#888', fontSize: '1.1rem'}}>No video history found.</p> : (
          <div className="card-grid">
            {history.map((item, i) => <TitleCard key={'hs-'+i} title={item} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileScreen;
