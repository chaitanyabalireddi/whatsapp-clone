import React, { createContext, useState, useContext, useEffect } from 'react';
import { chatAPI, messageAPI } from '../utils/api';
import { getSocket } from '../utils/socket';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  useEffect(() => {
    if (user) {
      fetchChats();
      setupSocketListeners();
    }

    return () => {
      const socket = getSocket();
      socket.off('message-received');
      socket.off('typing');
      socket.off('stop-typing');
      socket.off('user-online');
      socket.off('user-offline');
      socket.off('message-read-update');
    };
  }, [user]);

  const setupSocketListeners = () => {
    const socket = getSocket();

    socket.on('message-received', (newMessage) => {
      if (!selectedChat || selectedChat._id !== newMessage.chat._id) {
        // Update chat list
        fetchChats();
      } else {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    socket.on('typing', (data) => {
      if (selectedChat && selectedChat._id === data.chatId) {
        setTyping(true);
      }
    });

    socket.on('stop-typing', (data) => {
      if (selectedChat && selectedChat._id === data.chatId) {
        setTyping(false);
      }
    });

    socket.on('user-online', (userId) => {
      setOnlineUsers((prev) => new Set(prev).add(userId));
    });

    socket.on('user-offline', (data) => {
      setOnlineUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(data.userId);
        return newSet;
      });
    });

    socket.on('message-read-update', (data) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === data.messageId
            ? {
                ...msg,
                readBy: [
                  ...msg.readBy,
                  { user: data.userId, readAt: data.readAt },
                ],
              }
            : msg
        )
      );
    });
  };

  const fetchChats = async () => {
    try {
      const response = await chatAPI.getChats();
      setChats(response.data);
    } catch (error) {
      console.error('Failed to fetch chats:', error);
      toast.error('Failed to load chats');
    }
  };

  const selectChat = async (chat) => {
    setSelectedChat(chat);
    setLoading(true);

    try {
      const response = await messageAPI.getMessages(chat._id);
      setMessages(response.data);

      const socket = getSocket();
      socket.emit('join-chat', chat._id);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content, messageType = 'text', fileUrl = null, fileName = null) => {
    if (!selectedChat) return;

    try {
      const messageData = {
        chatId: selectedChat._id,
        content,
        messageType,
        fileUrl,
        fileName,
      };

      const response = await messageAPI.sendMessage(messageData);
      const newMessage = response.data;

      setMessages((prev) => [...prev, newMessage]);

      const socket = getSocket();
      socket.emit('new-message', newMessage);

      // Update chat list
      fetchChats();
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  };

  const createOrAccessChat = async (userId) => {
    try {
      const response = await chatAPI.accessChat(userId);
      const chat = response.data;

      // Add to chats if not already there
      if (!chats.find((c) => c._id === chat._id)) {
        setChats([chat, ...chats]);
      }

      selectChat(chat);
    } catch (error) {
      console.error('Failed to create/access chat:', error);
      toast.error('Failed to open chat');
    }
  };

  const createGroupChat = async (chatName, userIds) => {
    try {
      const response = await chatAPI.createGroupChat({
        chatName,
        users: userIds,
      });

      setChats([response.data, ...chats]);
      toast.success('Group created successfully');
      return { success: true, chat: response.data };
    } catch (error) {
      console.error('Failed to create group:', error);
      toast.error('Failed to create group');
      return { success: false };
    }
  };

  const startTyping = () => {
    if (!selectedChat) return;

    const socket = getSocket();
    socket.emit('typing', {
      chatId: selectedChat._id,
      user: user,
    });
  };

  const stopTyping = () => {
    if (!selectedChat) return;

    const socket = getSocket();
    socket.emit('stop-typing', {
      chatId: selectedChat._id,
      user: user,
    });
  };

  const value = {
    chats,
    selectedChat,
    messages,
    loading,
    typing,
    onlineUsers,
    fetchChats,
    selectChat,
    sendMessage,
    createOrAccessChat,
    createGroupChat,
    startTyping,
    stopTyping,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

