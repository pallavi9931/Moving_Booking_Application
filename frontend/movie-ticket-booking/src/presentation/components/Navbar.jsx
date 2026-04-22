import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Search, User, Bell, Menu, X } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('Pallavi');

  useEffect(() => {
    const loadProfile = () => {
      const savedUser = localStorage.getItem('user_profile');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUserName(parsed.name);
      }
    };

    loadProfile();
    window.addEventListener('profileUpdate', loadProfile);
    return () => window.removeEventListener('profileUpdate', loadProfile);
  }, []);

  return (
    <nav className="navbar glass-navbar">
      <div className="navbar-container">
        
        <Link to="/" className="navbar-brand">
          <div className="brand-logo-wrapper">
            <Film className="brand-icon text-primary" size={28} />
          </div>
          <span className="brand-text">BOOK<span className="text-primary">SHOWS</span></span>
        </Link>
        
        <div className="navbar-search hidden-mobile">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Discover movies, theaters & events..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="navbar-actions hidden-mobile gap-8">
          <button 
            className="icon-btn" 
            aria-label="Notifications"
            onClick={() => alert("No new notifications")}
          >
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          
          <div className="profile-dropdown">
            <button className="profile-btn" onClick={() => navigate('/profile')}>
              <div className="profile-avatar">
                <User size={18} />
              </div>
              <span className="profile-name">{userName}</span>
            </button>
          </div>
        </div>

        <button 
          className="mobile-menu-btn hidden-desktop"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="search-input-wrapper full-width">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search movies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="mobile-actions">
            <button className="btn btn-outline full-width flex-center gap-2">
              <Bell size={18} /> Notifications
            </button>
            <button className="btn btn-primary full-width flex-center gap-2" onClick={() => navigate('/profile')}>
              <User size={18} /> {userName}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

