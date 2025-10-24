import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import MessageItem from '../MessageItem/MessageItem';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder';
import MicrophoneTest from '../MicrophoneTest/MicrophoneTest';
import { FaSmile, FaPaperPlane, FaPaperclip, FaArrowLeft, FaMicrophone } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import './ChatWindow.css';

const ChatWindow = () => {
  const { selectedChat, messages, sendMessage, typing, startTyping, stopTyping, onlineUsers } = useChat();
  const { user } = useAuth();
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showMicrophoneTest, setShowMicrophoneTest] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTyping = (e) => {
    setMessageText(e.target.value);

    if (!selectedChat) return;

    startTyping();

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!messageText.trim() || !selectedChat) return;

    sendMessage(messageText.trim());
    setMessageText('');
    stopTyping();
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiData) => {
    setMessageText((prev) => prev + emojiData.emoji);
  };

  const handleSendVoice = (audioData, duration) => {
    if (!selectedChat) return;
    
    sendMessage(`🎤 Voice message (${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')})`, 'voice', audioData);
    setShowVoiceRecorder(false);
  };

  const getChatInfo = () => {
    if (!selectedChat) return null;

    if (selectedChat.isGroupChat) {
      return {
        name: selectedChat.chatName,
        avatar: selectedChat.groupAvatar || 'https://via.placeholder.com/40',
        subtitle: `${selectedChat.participants?.length || 0} participants`,
        isOnline: false,
      };
    } else {
      const otherUser = selectedChat.participants?.find((p) => p._id !== user?._id);
      const isOnline = onlineUsers.has(otherUser?._id);
      return {
        name: otherUser?.username || 'Unknown',
        avatar: otherUser?.avatar || 'https://via.placeholder.com/40',
        subtitle: isOnline ? 'Online' : 'Offline',
        isOnline,
      };
    }
  };

  if (!selectedChat) {
    return (
      <div className="chat-window empty">
        <div className="empty-chat-state">
          <h2>WhatsApp Clone</h2>
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  const chatInfo = getChatInfo();

  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <div className="chat-header-info">
          <button className="back-button">
            <FaArrowLeft />
          </button>
          <img src={chatInfo.avatar} alt={chatInfo.name} className="chat-header-avatar" />
          <div className="chat-header-text">
            <span className="chat-header-name">{chatInfo.name}</span>
            <span className={`chat-header-status ${chatInfo.isOnline ? 'online' : ''}`}>
              {chatInfo.subtitle}
            </span>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <MessageItem key={message._id} message={message} />
        ))}
        {typing && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input-container">
        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme="dark"
              width="100%"
              height="350px"
            />
          </div>
        )}

        <form onSubmit={handleSendMessage} className="message-input-form">
          <button
            type="button"
            className="input-icon-button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <FaSmile />
          </button>

          <button type="button" className="input-icon-button">
            <FaPaperclip />
          </button>

          <button 
            type="button" 
            className="input-icon-button voice-button"
            onClick={() => setShowMicrophoneTest(true)}
            title="Send voice message"
          >
            <FaMicrophone />
          </button>

          <input
            type="text"
            placeholder="Type a message"
            value={messageText}
            onChange={handleTyping}
            className="message-input"
          />

          <button
            type="submit"
            className="send-button"
            disabled={!messageText.trim()}
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>

      {showMicrophoneTest && (
        <MicrophoneTest
          onClose={() => {
            setShowMicrophoneTest(false);
            setShowVoiceRecorder(true);
          }}
        />
      )}

      {showVoiceRecorder && (
        <VoiceRecorder
          onSendVoice={handleSendVoice}
          onClose={() => setShowVoiceRecorder(false)}
        />
      )}
    </div>
  );
};

export default ChatWindow;

