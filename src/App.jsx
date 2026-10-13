import React, { useState } from 'react';
import { usersData } from './data';
import ProfileCard from './ProfileCard';
import UserDetailCard from './UserDetailCard';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedUserId(null); 
  };

  const getFilteredUsers = () => {
    if (!searchQuery) return usersData;
    return usersData.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleViewUser = (id) => setSelectedUserId(id);
  const handleBackToList = () => { setSelectedUserId(null); setSearchQuery(''); };
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const selectedUser = usersData.find(user => user.id === selectedUserId);

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="app-header">
        <h1>Team Directory App</h1>
        <p>Laboratory Activity - Vanilla React</p>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <main className="app-main">
        {selectedUserId ? (
          <UserDetailCard user={selectedUser} onBack={handleBackToList} />
        ) : (
          <>
            <div className="controls">
              <h2>Team Members</h2>
              <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
            <div className="profile-grid">
              {getFilteredUsers().length > 0 ? (
                getFilteredUsers().map(user => (
                  <ProfileCard 
                    key={user.id} 
                    user={user} 
                    onViewProfile={() => handleViewUser(user.id)} 
                  />
                ))
              ) : (
                <p className="no-results">No users found matching "{searchQuery}"</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;