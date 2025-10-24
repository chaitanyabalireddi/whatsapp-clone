const Message = require('../models/Message');
const Chat = require('../models/Chat');
const User = require('../models/User');

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { chatId, content, messageType = 'text', fileUrl, fileName } = req.body;

    if (!chatId || (!content && !fileUrl)) {
      return res.status(400).json({ 
        error: 'Chat ID and content/file are required' 
      });
    }

    const messageData = {
      chat: chatId,
      sender: req.user._id,
      messageType
    };

    if (messageType === 'text') {
      messageData.content = content;
    } else {
      messageData.fileUrl = fileUrl;
      messageData.fileName = fileName;
      messageData.content = content || fileName;
    }

    let message = await Message.create(messageData);

    message = await message.populate('sender', 'username avatar');
    message = await message.populate('chat');
    message = await User.populate(message, {
      path: 'chat.participants',
      select: 'username avatar email isOnline'
    });

    // Update latest message in chat
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all messages for a chat
exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'username avatar email')
      .populate('chat')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Check if already read by this user
    const alreadyRead = message.readBy.some(
      r => r.user.toString() === req.user._id.toString()
    );

    if (!alreadyRead) {
      message.readBy.push({
        user: req.user._id,
        readAt: Date.now()
      });
      await message.save();
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this message' });
    }

    await message.deleteOne();

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

