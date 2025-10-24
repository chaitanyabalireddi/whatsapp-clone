import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import UserSearch from '../components/UserSearch/UserSearch';
import GroupChatModal from '../components/GroupChatModal/GroupChatModal';
import './Chat.css';

const Chat = () => {
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  return (
    <div className="chat-page">
      <Sidebar
        onNewChat={() => setShowUserSearch(true)}
        onNewGroup={() => setShowGroupModal(true)}
      />
      <ChatWindow />

      {showUserSearch && (
        <UserSearch onClose={() => setShowUserSearch(false)} />
      )}

      {showGroupModal && (
        <GroupChatModal onClose={() => setShowGroupModal(false)} />
      )}
    </div>
  );
};

export default Chat;

