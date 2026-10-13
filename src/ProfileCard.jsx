import React from 'react';

function ProfileCard({ user, onViewProfile }) {
  // Generate a consistent color based on the user's name
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];
  const colorIndex = user.name.length % colors.length;
  const avatarColor = colors[colorIndex];

  return (
    <div className="profile-card">
      <div className="card-top">
        <div className="card-avatar" style={{ backgroundColor: avatarColor }}>
          {user.name.charAt(0)}
        </div>
        <div className="card-info">
          <h3>{user.name}</h3>
          <p className="email">{user.email}</p>
        </div>
      </div>
      
      <div className="card-details">
        <div className="detail-row">
          <span className="icon">📞</span>
          <span>{user.phone}</span>
        </div>
        <div className="detail-row">
          <span className="icon">📍</span>
          <span>{user.city}, {user.state}</span>
        </div>
      </div>

      <button className="btn-primary" onClick={onViewProfile}>
        View Full Profile
      </button>
    </div>
  );
}

export default ProfileCard;