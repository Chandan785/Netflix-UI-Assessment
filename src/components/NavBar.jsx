import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { Search, Popcorn, Tv, PlaySquare, Gamepad2, LogOut } from 'lucide-react';
import './NavBar.css';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const displayName = user?.email || user?.name || 'Guest';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/home', icon: Popcorn },
    { name: 'TV Shows', path: '/category/TV_SERIES', icon: Tv },
    { name: 'Movies', path: '/category/MOVIE', icon: PlaySquare },
    { name: 'Video Games', path: '/category/VIDEO_GAME', icon: Gamepad2 }
  ];

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/home" className="logo">
            Binaire<span className="logo-accent">App</span>
          </Link>
          <nav className="nav-links">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="navbar-right">
          <Link to="/search" className={`search-btn ${location.pathname === '/search' ? 'active' : ''}`}>
            <Search size={22} />
          </Link>
          <button onClick={logout} className="logout-btn" title="Sign Out">
            <LogOut size={22} />
          </button>
          <Link to="/profile" className="avatar" title="Go to Profile">
            <img src={`https://ui-avatars.com/api/?name=${displayName}&background=e50914&color=fff`} alt="Profile" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
