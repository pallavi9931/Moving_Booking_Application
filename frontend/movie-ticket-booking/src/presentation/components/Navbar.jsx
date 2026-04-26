import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Search, User, Bell, Menu, X } from 'lucide-react';
import { apiClient, getToken, clearToken } from '../../data/api/apiClient';
import { clearSessionUsername, getSessionUsername } from '../../data/auth/jwtUsername';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState(() => getSessionUsername() || 'Guest');
  const [authed, setAuthed] = useState(() => !!getToken());

  useEffect(() => {
    const syncAuth = () => setAuthed(!!getToken());
    window.addEventListener('storage', syncAuth);
    window.addEventListener('authchange', syncAuth);
    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('authchange', syncAuth);
    };
  }, []);

  useEffect(() => {
    const loadProfile = () => {
      const u = getSessionUsername();
      if (u) {
        setUserName(u);
        return;
      }
      const savedUser = localStorage.getItem('user_profile');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUserName(parsed.name || 'Guest');
      }
    };

    loadProfile();
    window.addEventListener('profileUpdate', loadProfile);
    window.addEventListener('authchange', loadProfile);
    return () => {
      window.removeEventListener('profileUpdate', loadProfile);
      window.removeEventListener('authchange', loadProfile);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.post('/auth/logout', {});
    } catch {
      // Still clear session locally if server unreachable
    } finally {
      clearToken();
      clearSessionUsername();
      window.dispatchEvent(new Event('authchange'));
      navigate('/login', { replace: true });
    }
  };

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
          
          {authed ? (
            <>
              <div className="profile-dropdown">
                <button className="profile-btn" onClick={() => navigate('/profile')}>
                  <div className="profile-avatar">
                    <User size={18} />
                  </div>
                  <span className="profile-name">{userName}</span>
                </button>
              </div>
              <button type="button" className="btn btn-outline" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <div className="flex-center gap-2">
              <Link to="/login" className="btn btn-outline">
                Log in
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
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
            {authed ? (
              <>
                <button className="btn btn-primary full-width flex-center gap-2" onClick={() => navigate('/profile')}>
                  <User size={18} /> {userName}
                </button>
                <button type="button" className="btn btn-outline full-width" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline full-width flex-center gap-2">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-primary full-width flex-center gap-2">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

