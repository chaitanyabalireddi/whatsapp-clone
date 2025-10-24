import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import ChatListItem from '../ChatListItem/ChatListItem';
import ProfileModal from '../ProfileModal/ProfileModal';
import { FaComment, FaUsers, FaEllipsisV, FaSignOutAlt, FaUser } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ onNewChat, onNewGroup }) => {
  const { user, logout } = useAuth();
  const { chats } = useChat();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <img
            src={user?.avatar || 'https://via.placeholder.com/40'}
            alt="Profile"
            className="user-avatar"
            onClick={() => setShowProfile(true)}
          />
          <span className="username">{user?.username}</span>
        </div>

        <div className="header-actions">
          <button
            className="icon-button"
            onClick={onNewChat}
            title="New Chat"
          >
            <FaComment />
          </button>
          <button
            className="icon-button"
            onClick={onNewGroup}
            title="New Group"
          >
            <FaUsers />
          </button>
          <div className="menu-container">
            <button
              className="icon-button"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FaEllipsisV />
            </button>
            {showMenu && (
              <div className="dropdown-menu">
                <button onClick={() => {
                  setShowProfile(true);
                  setShowMenu(false);
                }}>
                  <FaUser /> Profile
                </button>
                <button onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="chat-list">
        {chats.length === 0 ? (
          <div className="empty-state">
            <FaComment size={60} />
            <p>No chats yet</p>
            <span>Start a new conversation</span>
          </div>
        ) : (
          chats.map((chat) => (
            <ChatListItem key={chat._id} chat={chat} />
          ))
        )}
      </div>

      {showProfile && (
        <ProfileModal onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
};

export default Sidebar;

