import { useState, useEffect } from 'react';
import { User, Mail, Shield, Settings, Heart, History, LogOut, ChevronRight, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getSessionUsername } from '../../data/auth/jwtUsername';

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Pallavi',
    email: 'pallavi.cine@example.com',
    memberSince: 'April 2026',
    loyaltyPoints: 1250,
    preferredGenre: 'Action',
    phone: '+91 98765 43210',
    recentBookings: [
      { id: 'b1', movie: 'Apex Legends: The Movie', date: '21 Apr', seats: 'B12, B13' },
      { id: 'b2', movie: 'Neon Nights', date: '15 Apr', seats: 'D4' }
    ]
  });

  const [editData, setEditData] = useState({ ...user });

  useEffect(() => {
    const accountName = getSessionUsername();
    if (accountName) {
      setUser((prev) => ({ ...prev, name: accountName }));
      setEditData((prev) => ({ ...prev, name: accountName }));
    }
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser((prev) => ({ ...prev, ...parsed, name: parsed.name || accountName || prev.name }));
      setEditData((prev) => ({ ...prev, ...parsed, name: parsed.name || accountName || prev.name }));
    }
  }, []);

  const handleSave = () => {
    setUser(editData);
    localStorage.setItem('user_profile', JSON.stringify(editData));
    setIsEditing(false);
    // Optional: dispatch event to notify other components (like Navbar)
    window.dispatchEvent(new Event('profileUpdate'));
  };

  const handleCancel = () => {
    setEditData({ ...user });
    setIsEditing(false);
  };

  return (
    <div className="profile-container container animate-fade-in py-16">
      
      <div className="profile-header flex align-center gap-10 mb-16 px-8">
        <div className="profile-avatar-large">
          <User size={64} />
          <div className="status-indicator"></div>
        </div>
        <div className="profile-hero-text">
          <h1 className="display-name text-gradient-ruby">{user.name}</h1>
          <p className="text-muted text-lg">CineReserve Platinum Member</p>
          <div className="flex gap-4 mt-4">
            <span className="badge bms-badge-outline">Member since {user.memberSince}</span>
            <span className="badge bms-badge">{user.loyaltyPoints} Points</span>
          </div>
        </div>
      </div>

      <div className="profile-layout">
        <div className="profile-sidebar">
          <div className="glass-panel p-6 mb-8">
            <nav className="side-nav">
              <button className="nav-item active"><User size={20} /> Personal Info</button>
              <button className="nav-item" onClick={() => navigate('/dashboard')}><History size={20} /> Booking History</button>
              <button className="nav-item"><Heart size={20} /> Favorites</button>
              <button className="nav-item"><Shield size={20} /> Security</button>
              <button className="nav-item"><Settings size={20} /> Settings</button>
              <div className="divider my-4"></div>
              <button className="nav-item text-danger"><LogOut size={20} /> Logout</button>
            </nav>
          </div>
        </div>

        <div className="profile-content">
          <div className="glass-panel p-10 mb-12">
            <div className="flex-between mb-8">
              <h3 className="section-subtitle">Basic Information</h3>
              {!isEditing ? (
                <button className="btn btn-outline" onClick={() => setIsEditing(true)}>Edit Profile</button>
              ) : (
                <div className="flex gap-4">
                  <button className="btn btn-primary" onClick={handleSave}><Save size={18} /> Save</button>
                  <button className="btn btn-outline" onClick={handleCancel}><X size={18} /> Cancel</button>
                </div>
              )}
            </div>

            <div className="info-grid">
              <div className="info-group">
                <label>Full Name</label>
                {isEditing ? (
                  <input 
                    className="edit-input" 
                    value={editData.name} 
                    onChange={e => setEditData({...editData, name: e.target.value})}
                  />
                ) : (
                  <div className="info-value">{user.name}</div>
                )}
              </div>
              <div className="info-group">
                <label>Email Address</label>
                {isEditing ? (
                  <input 
                    className="edit-input" 
                    value={editData.email} 
                    onChange={e => setEditData({...editData, email: e.target.value})}
                  />
                ) : (
                  <div className="info-value">{user.email}</div>
                )}
              </div>
              <div className="info-group">
                <label>Favorite Genre</label>
                {isEditing ? (
                  <select 
                    className="edit-input" 
                    value={editData.preferredGenre} 
                    onChange={e => setEditData({...editData, preferredGenre: e.target.value})}
                  >
                    <option>Action</option>
                    <option>Sci-Fi</option>
                    <option>Drama</option>
                    <option>Comedy</option>
                    <option>Horror</option>
                  </select>
                ) : (
                  <div className="info-value text-primary bold">{user.preferredGenre}</div>
                )}
              </div>
              <div className="info-group">
                <label>Phone Number</label>
                {isEditing ? (
                  <input 
                    className="edit-input" 
                    value={editData.phone} 
                    onChange={e => setEditData({...editData, phone: e.target.value})}
                  />
                ) : (
                  <div className="info-value">{user.phone}</div>
                )}
              </div>
            </div>
          </div>

          <div className="glass-panel p-10">
            <h3 className="section-subtitle mb-8">Recent Bookings</h3>
            <div className="booking-list">
              {user.recentBookings.map(b => (
                <div key={b.id} className="mini-booking-card">
                  <div className="flex-between">
                    <div>
                      <h4 className="mb-1">{b.movie}</h4>
                      <p className="text-muted-small">{b.date} • {b.seats}</p>
                    </div>
                    <button className="icon-btn" onClick={() => navigate('/dashboard')}>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary full-width mt-8" onClick={() => navigate('/')}>Book New Movie</button>
          </div>
        </div>
      </div>

      <style>{`
        .profile-layout { display: grid; grid-template-columns: 280px 1fr; gap: 2rem; }
        .profile-avatar-large { 
          width: 120px; height: 120px; border-radius: 50%; 
          background: linear-gradient(135deg, var(--primary), var(--accent-lime));
          display: flex; align-items: center; justify-content: center; position: relative;
          border: 4px solid var(--surface-light);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
        }
        .status-indicator { 
          position: absolute; bottom: 8px; right: 8px; width: 24px; height: 24px;
          background: var(--success); border-radius: 50%; border: 4px solid var(--surface);
          box-shadow: 0 0 10px var(--success);
        }
        .text-gradient-ruby {
          background: linear-gradient(135deg, white 0%, var(--primary) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          font-size: 3.5rem; font-weight: 800;
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
        }
        .side-nav { display: flex; flex-direction: column; gap: 0.5rem; }
        .nav-item { 
          display: flex; align-items: center; gap: 1rem; padding: 1rem;
          border: none; background: transparent; color: var(--text-muted);
          width: 100%; border-radius: 12px; cursor: pointer; transition: all 0.2s;
        }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: var(--text-main); }
        .nav-item.active { background: var(--primary); color: #020d0a; font-weight: 600; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .info-group label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px; }
        .info-value { font-size: 1.1rem; color: var(--text-main); min-height: 28px; }
        
        .edit-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 8px;
          padding: 0.6rem 1rem;
          color: white;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s;
        }
        .edit-input:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
        }
        select.edit-input option {
          background: #020d0a;
          color: white;
        }

        .mini-booking-card { padding: 1.5rem; background: var(--surface-light); border-radius: 16px; margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.05); }
        .divider { height: 1px; background: rgba(255,255,255,0.1); width: 100%; }

        @media (max-width: 992px) {
          .profile-layout { grid-template-columns: 1fr; }
          .profile-header { flex-direction: column; text-align: center; }
          .text-gradient-ruby { font-size: 2.5rem; }
          .info-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

