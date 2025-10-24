import React, { useState } from 'react';
import { userAPI } from '../../utils/api';
import { useChat } from '../../context/ChatContext';
import { FaTimes, FaSearch } from 'react-icons/fa';
import './UserSearch.css';

const UserSearch = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { createOrAccessChat } = useChat();

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);

    if (searchQuery.trim().length < 2) {
      setUsers([]);
      return;
    }

    setLoading(true);
    try {
      const response = await userAPI.searchUsers(searchQuery);
      setUsers(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = async (userId) => {
    await createOrAccessChat(userId);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Chat</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="user-list">
          {loading && <div className="loading-state">Searching...</div>}

          {!loading && query.length >= 2 && users.length === 0 && (
            <div className="empty-state">No users found</div>
          )}

          {users.map((user) => (
            <div
              key={user._id}
              className="user-item"
              onClick={() => handleSelectUser(user._id)}
            >
              <img
                src={user.avatar || 'https://via.placeholder.com/50'}
                alt={user.username}
                className="user-avatar"
              />
              <div className="user-info">
                <span className="user-name">{user.username}</span>
                <span className="user-email">{user.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;

