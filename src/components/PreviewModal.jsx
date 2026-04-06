import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Play, X } from 'lucide-react';

const PreviewModal = ({ title, onClose }) => {
  const [inWatchlist, setInWatchlist] = React.useState(false);

  useEffect(() => {
    // Check if in watchlist
    const wl = JSON.parse(localStorage.getItem('binaire_watchlist') || '[]');
    setInWatchlist(wl.some(item => item.id === title.id));
  }, [title.id]);

  const toggleWatchlist = () => {
    const wl = JSON.parse(localStorage.getItem('binaire_watchlist') || '[]');
    if (inWatchlist) {
      const updated = wl.filter(item => item.id !== title.id);
      localStorage.setItem('binaire_watchlist', JSON.stringify(updated));
      setInWatchlist(false);
    } else {
      wl.push(title);
      localStorage.setItem('binaire_watchlist', JSON.stringify(wl));
      setInWatchlist(true);
    }
  };

  const handlePlay = () => {
    const hist = JSON.parse(localStorage.getItem('binaire_history') || '[]');
    if (!hist.some(item => item.id === title.id)) {
      hist.push(title);
      localStorage.setItem('binaire_history', JSON.stringify(hist));
    }
    alert(`Playing ${title.primaryTitle || title.title || title.name}... (Simulated)`);
  };

  const bannerImg = title.primaryImage?.url || title.image?.url || 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2000&auto=format';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.85)', zIndex: 10000, display: 'flex',
        alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        transition={{ type: 'spring', bounce: 0.3 }}
        style={{
          background: 'var(--bg-secondary)', width: '90%', maxWidth: '800px',
          borderRadius: '12px', overflow: 'hidden', position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex' }}>
          <X size={24} />
        </button>

        <div style={{ width: '100%', height: '350px', backgroundImage: `url(${bannerImg})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, var(--bg-secondary), transparent)' }}></div>
          <div style={{ position: 'absolute', bottom: 20, left: 40, width: '90%' }}>
            <h1 style={{ fontSize: '3rem', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.8)', paddingBottom: '10px' }}>{title.primaryTitle || title.title || title.name}</h1>
          </div>
        </div>

        <div style={{ padding: '20px 40px', display: 'flex', gap: '20px' }}>
          <button onClick={handlePlay} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            <Play fill="currentColor" size={20} /> Play
          </button>
          <button onClick={toggleWatchlist} className="btn-add" style={{ padding: '0 25px' }}>
             {inWatchlist ? <Check size={20}/> : <Plus size={20}/>} {inWatchlist ? 'Added' : 'My List'}
          </button>
        </div>

        <div style={{ padding: '10px 40px 40px', color: 'var(--text-secondary)' }}>
           <div style={{ marginBottom: '20px' }}>
             {title.startYear && <span style={{ fontWeight: 'bold', color: 'white', marginRight: '15px', fontSize: '1.1rem' }}>{title.startYear}</span>}
             {title.genres && <span style={{ marginRight: '15px' }}>{title.genres.join(', ')}</span>}
           </div>
           <p style={{ lineHeight: '1.6', fontSize: '1.05rem', color: '#ccc' }}>
             {title.description || title.plot || 'An exciting new media title. Start streaming now without limits with your Binaire Access Pass.'}
           </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PreviewModal;
