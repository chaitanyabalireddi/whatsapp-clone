import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import moment from 'moment';
import { FaCheck, FaCheckDouble, FaPlay, FaPause, FaMicrophone } from 'react-icons/fa';
import './MessageItem.css';

const MessageItem = ({ message }) => {
  const { user } = useAuth();
  const isSender = message.sender._id === user?._id;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const isRead = message.readBy && message.readBy.length > 0;
  const isDelivered = message.deliveredTo && message.deliveredTo.length > 0;

  const playVoice = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseVoice = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`message-item ${isSender ? 'sent' : 'received'}`}>
      {!isSender && (
        <img
          src={message.sender.avatar || 'https://via.placeholder.com/30'}
          alt={message.sender.username}
          className="message-avatar"
        />
      )}

      <div className="message-content">
        {!isSender && (
          <span className="message-sender-name">{message.sender.username}</span>
        )}

        {message.messageType === 'text' && (
          <div className="message-text">{message.content}</div>
        )}

        {message.messageType === 'image' && (
          <div className="message-image-container">
            <img src={message.fileUrl} alt="Sent" className="message-image" />
            {message.content && <div className="message-text">{message.content}</div>}
          </div>
        )}

        {message.messageType === 'file' && (
          <div className="message-file">
            <span>📎 {message.fileName}</span>
            <a href={message.fileUrl} target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </div>
        )}

        {message.messageType === 'voice' && (
          <div className="message-voice">
            <button 
              className="voice-play-button"
              onClick={isPlaying ? pauseVoice : playVoice}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <FaMicrophone className="voice-icon" />
            <span className="voice-text">{message.content}</span>
            <audio
              ref={audioRef}
              src={message.fileUrl}
              onEnded={() => setIsPlaying(false)}
              style={{ display: 'none' }}
            />
          </div>
        )}

        <div className="message-meta">
          <span className="message-time">
            {moment(message.createdAt).format('HH:mm')}
          </span>
          {isSender && (
            <span className="message-status">
              {isRead ? (
                <FaCheckDouble className="read" />
              ) : isDelivered ? (
                <FaCheckDouble className="delivered" />
              ) : (
                <FaCheck className="sent" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;

