import React from 'react';

function ProfileCard({ user, onViewProfile }) {
  return (
    <div className="profile-card">
      <div>
        <h3>{user.name}</h3>
        <p className="email">{user.email}</p>
        <div className="details">
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>City:</strong> {user.city}, {user.state}</p>
        </div>
      </div>
      <button className="btn-primary" onClick={onViewProfile}>
        View Profile
      </button>
    </div>
  );
}

export default ProfileCard;