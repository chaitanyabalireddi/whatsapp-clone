const User = require('../models/User');
const Message = require('../models/Message');
const Chat = require('../models/Chat');

const setupSocket = (io) => {
  // Store online users
  const onlineUsers = new Map();

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // User joins
    socket.on('setup', async (userData) => {
      try {
        socket.join(userData._id);
        onlineUsers.set(userData._id, socket.id);
        
        // Update user's online status and socket ID
        await User.findByIdAndUpdate(userData._id, {
          isOnline: true,
          socketId: socket.id
        });

        socket.emit('connected');
        
        // Broadcast to all users that this user is online
        socket.broadcast.emit('user-online', userData._id);
      } catch (error) {
        console.error('Setup error:', error);
      }
    });

    // Join a chat room
    socket.on('join-chat', (chatId) => {
      socket.join(chatId);
      console.log('User joined chat:', chatId);
    });

    // Leave a chat room
    socket.on('leave-chat', (chatId) => {
      socket.leave(chatId);
      console.log('User left chat:', chatId);
    });

    // Typing indicator
    socket.on('typing', (data) => {
      socket.to(data.chatId).emit('typing', data);
    });

    socket.on('stop-typing', (data) => {
      socket.to(data.chatId).emit('stop-typing', data);
    });

    // Send message
    socket.on('new-message', async (message) => {
      try {
        const chat = await Chat.findById(message.chat._id).populate('participants');
        
        if (!chat) return;

        // Send message to all participants except sender
        chat.participants.forEach(user => {
          if (user._id.toString() === message.sender._id.toString()) return;
          socket.to(user._id.toString()).emit('message-received', message);
        });

        // Mark as delivered to online users
        const onlineParticipants = chat.participants.filter(
          user => onlineUsers.has(user._id.toString())
        );

        if (onlineParticipants.length > 0) {
          await Message.findByIdAndUpdate(message._id, {
            $addToSet: { 
              deliveredTo: { 
                $each: onlineParticipants.map(u => u._id) 
              } 
            }
          });
        }
      } catch (error) {
        console.error('New message error:', error);
      }
    });

    // Message read
    socket.on('message-read', async (data) => {
      try {
        const { messageId, chatId, userId } = data;
        
        const message = await Message.findById(messageId);
        if (message) {
          const alreadyRead = message.readBy.some(
            r => r.user.toString() === userId
          );

          if (!alreadyRead) {
            message.readBy.push({ user: userId, readAt: Date.now() });
            await message.save();
          }

          // Notify sender
          socket.to(chatId).emit('message-read-update', {
            messageId,
            userId,
            readAt: Date.now()
          });
        }
      } catch (error) {
        console.error('Message read error:', error);
      }
    });

    // User disconnect
    socket.on('disconnect', async () => {
      console.log('User disconnected:', socket.id);
      
      // Find and update user's online status
      const userId = Array.from(onlineUsers.entries())
        .find(([, socketId]) => socketId === socket.id)?.[0];

      if (userId) {
        onlineUsers.delete(userId);
        
        await User.findByIdAndUpdate(userId, {
          isOnline: false,
          lastSeen: Date.now(),
          socketId: null
        });

        // Broadcast to all users that this user is offline
        socket.broadcast.emit('user-offline', {
          userId,
          lastSeen: Date.now()
        });
      }
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });
};

module.exports = setupSocket;

