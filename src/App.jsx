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
  
  // NEW: State for the active tab and favorite users
  const [activeTab, setActiveTab] = useState('all');
  const [favoriteIds, setFavoriteIds] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedUserId(null); 
  };

  // NEW: Function to toggle favorites
  const toggleFavorite = (id) => {
    setFavoriteIds(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  // UPDATED: Filter logic now considers both the search query AND the active tab
  const getFilteredUsers = () => {
    let filtered = usersData;

    // 1. Filter by Tab
    if (activeTab === 'favorites') {
      filtered = filtered.filter(user => favoriteIds.includes(user.id));
    } else if (activeTab === 'recent') {
      // For demo purposes, "Recent" just shows the last 4 users
      filtered = filtered.slice(-4); 
    }

    // 2. Filter by Search Query
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
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

              {/* NEW: Tab Navigation Bar */}
              <div className="tab-nav">
                <button 
                  className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  👥 All Members
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
                  onClick={() => setActiveTab('favorites')}
                >
                  ⭐ Favorites
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'recent' ? 'active' : ''}`}
                  onClick={() => setActiveTab('recent')}
                >
                  🕒 Recent
                </button>
              </div>
              
              <div className="stats-box">
                <p>Showing</p>
                <h3>{getFilteredUsers().length}</h3>
                <p>profiles</p>
              </div>
            </aside>

            <section className="content-area">
              <div className="content-header">
                <h2>
                  {activeTab === 'all' && 'All Team Members'}
                  {activeTab === 'favorites' && 'Favorite Members'}
                  {activeTab === 'recent' && 'Recently Added'}
                </h2>
                <span className="badge">{getFilteredUsers().length} profiles</span>
              </div>
              
              <div className="profile-grid">
                {getFilteredUsers().length > 0 ? (
                  getFilteredUsers().map(user => (
                    <ProfileCard 
                      key={user.id} 
                      user={user} 
                      onViewProfile={() => handleViewUser(user.id)}
                      // NEW: Pass favorite props to the card
                      isFavorite={favoriteIds.includes(user.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))
                ) : (
                  <div className="no-results">
                    <p>No users found in this section.</p>
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