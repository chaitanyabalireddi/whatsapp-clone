import React from 'react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import moment from 'moment';
import './ChatListItem.css';

const ChatListItem = ({ chat }) => {
  const { selectChat, selectedChat, onlineUsers } = useChat();
  const { user } = useAuth();

  // Get chat name and avatar
  const getChatInfo = () => {
    if (chat.isGroupChat) {
      return {
        name: chat.chatName,
        avatar: chat.groupAvatar || 'https://via.placeholder.com/50',
        isOnline: false,
      };
    } else {
      const otherUser = chat.participants?.find((p) => p._id !== user?._id);
      return {
        name: otherUser?.username || 'Unknown',
        avatar: otherUser?.avatar || 'https://via.placeholder.com/50',
        isOnline: onlineUsers.has(otherUser?._id),
      };
    }
  };

  const chatInfo = getChatInfo();
  const isSelected = selectedChat?._id === chat._id;

  const getLastMessageText = () => {
    if (!chat.latestMessage) return 'Start a conversation';

    const message = chat.latestMessage;
    const sender = message.sender?.username || 'Someone';
    const prefix = chat.isGroupChat ? `${sender}: ` : '';

    if (message.messageType === 'image') {
      return `${prefix}📷 Image`;
    } else if (message.messageType === 'file') {
      return `${prefix}📎 ${message.fileName}`;
    } else {
      return `${prefix}${message.content}`;
    }
  };

  const getLastMessageTime = () => {
    if (!chat.latestMessage) return '';
    return moment(chat.latestMessage.createdAt).fromNow();
  };

  return (
    <div
      className={`chat-list-item ${isSelected ? 'selected' : ''}`}
      onClick={() => selectChat(chat)}
    >
      <div className="chat-avatar-container">
        <img src={chatInfo.avatar} alt={chatInfo.name} className="chat-avatar" />
        {chatInfo.isOnline && <span className="online-indicator"></span>}
      </div>

      <div className="chat-info">
        <div className="chat-header">
          <span className="chat-name">{chatInfo.name}</span>
          <span className="chat-time">{getLastMessageTime()}</span>
        </div>
        <div className="chat-message">
          <span className="last-message">{getLastMessageText()}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;

