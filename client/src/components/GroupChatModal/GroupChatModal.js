import React, { useState } from 'react';
import { userAPI } from '../../utils/api';
import { useChat } from '../../context/ChatContext';
import { FaTimes, FaSearch, FaCheck } from 'react-icons/fa';
import './GroupChatModal.css';

const GroupChatModal = ({ onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { createGroupChat } = useChat();

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

  const toggleUserSelection = (user) => {
    const isSelected = selectedUsers.find((u) => u._id === user._id);

    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedUsers.length < 2) {
      alert('Group name and at least 2 users are required');
      return;
    }

    const userIds = selectedUsers.map((u) => u._id);
    const result = await createGroupChat(groupName, userIds);

    if (result.success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Group</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="group-form">
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="group-name-input"
          />

          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users to add..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {selectedUsers.length > 0 && (
            <div className="selected-users">
              {selectedUsers.map((user) => (
                <div key={user._id} className="selected-user-chip">
                  <span>{user.username}</span>
                  <button onClick={() => toggleUserSelection(user)}>
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="user-list">
          {loading && <div className="loading-state">Searching...</div>}

          {!loading && query.length >= 2 && users.length === 0 && (
            <div className="empty-state">No users found</div>
          )}

          {users.map((user) => {
            const isSelected = selectedUsers.find((u) => u._id === user._id);

            return (
              <div
                key={user._id}
                className={`user-item ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleUserSelection(user)}
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
                {isSelected && <FaCheck className="check-icon" />}
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          <button
            className="create-group-button"
            onClick={handleCreateGroup}
            disabled={!groupName.trim() || selectedUsers.length < 2}
          >
            Create Group ({selectedUsers.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;

