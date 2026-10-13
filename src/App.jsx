import React, { useState } from 'react';
import { usersData } from './data';
import ProfileCard from './ProfileCard';
import UserDetailCard from './UserDetailCard';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleViewUser = (id) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedUserId(id);
      setIsLoading(false);
    }, 3000);
  };

  const handleBackToList = () => { 
    setSelectedUserId(null); 
    setSearchQuery(''); 
  };
  
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const selectedUser = usersData.find(user => user.id === selectedUserId);

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      
      {/* New Header UI */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-area">
            <span className="logo-icon">👥</span>
            <h1>TeamHub</h1>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      <main className="app-main">
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <h2>Fetching Profile...</h2>
            <p>Please wait a moment</p>
          </div>
        ) : selectedUserId ? (
          <UserDetailCard user={selectedUser} onBack={handleBackToList} />
        ) : (
          <div className="dashboard-layout">
            
            {/* New Sidebar UI */}
            <aside className="sidebar">
              <h2 className="sidebar-title">Directory</h2>
              <p className="sidebar-subtitle">Find your team members easily.</p>
              
              <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search by name..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
              
              <div className="stats-box">
                <p>Total Members</p>
                <h3>{getFilteredUsers().length}</h3>
              </div>
            </aside>

            {/* Main Content Area */}
            <section className="content-area">
              <div className="content-header">
                <h2>Team Members</h2>
                <span className="badge">{getFilteredUsers().length} profiles</span>
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
                  <div className="no-results">
                    <p>No users found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;