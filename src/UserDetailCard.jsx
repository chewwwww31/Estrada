import React from 'react';

function UserDetailCard({ user, onBack }) {
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];
  const colorIndex = user.name.length % colors.length;
  const avatarColor = colors[colorIndex];

  return (
    <div className="user-detail-wrapper">
      <button className="btn-back" onClick={onBack}>
        &larr; Back to Directory
      </button>
      
      <div className="user-detail-card">
        <div className="detail-hero">
          <div className="hero-avatar" style={{ backgroundColor: avatarColor }}>
            {user.name.charAt(0)}
          </div>
          <div className="hero-info">
            <h2>{user.name}</h2>
            <p className="user-id">ID: #{user.id.toString().padStart(4, '0')}</p>
          </div>
        </div>
        
        <div className="detail-body">
          <h3 className="section-title">Contact Information</h3>
          
          <div className="detail-grid">
            <div className="detail-item">
              <div className="item-icon">✉️</div>
              <div className="item-content">
                <p className="label">Email Address</p>
                <p className="value">{user.email}</p>
              </div>
            </div>
            
            <div className="detail-item">
              <div className="item-icon">📞</div>
              <div className="item-content">
                <p className="label">Phone Number</p>
                <p className="value">{user.phone}</p>
              </div>
            </div>
            
            <div className="detail-item full-width">
              <div className="item-icon">🏠</div>
              <div className="item-content">
                <p className="label">Home Address</p>
                <p className="value">
                  {user.street}<br />
                  {user.city}, {user.state} {user.zip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailCard;