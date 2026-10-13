import React from 'react';

function UserDetailCard({ user, onBack }) {
  return (
    <div className="user-detail-card">
      <button className="btn-back" onClick={onBack}>
        &larr; Back to Directory
      </button>
      
      <div className="detail-header">
        <div className="avatar">{user.name.charAt(0)}</div>
        <div>
          <h2>{user.name}</h2>
          <p className="user-id">User ID: #{user.id}</p>
        </div>
      </div>
      
      <div className="detail-grid">
        <div className="detail-item">
          <p className="label">Email</p>
          <p>{user.email}</p>
        </div>
        <div className="detail-item">
          <p className="label">Phone</p>
          <p>{user.phone}</p>
        </div>
        <div className="detail-item full-width">
          <p className="label">Address</p>
          <p>{user.street}<br />{user.city}, {user.state} {user.zip}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetailCard;