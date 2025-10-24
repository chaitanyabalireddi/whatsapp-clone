const Chat = require('../models/Chat');
const User = require('../models/User');
const Message = require('../models/Message');

// Create or access one-on-one chat
exports.accessChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Check if chat already exists
    let chat = await Chat.findOne({
      isGroupChat: false,
      participants: { $all: [req.user._id, userId] }
    })
    .populate('participants', '-password')
    .populate({
      path: 'latestMessage',
      populate: { path: 'sender', select: 'username avatar' }
    });

    if (chat) {
      return res.json(chat);
    }

    // Create new chat
    const newChat = await Chat.create({
      isGroupChat: false,
      participants: [req.user._id, userId]
    });

    chat = await Chat.findById(newChat._id)
      .populate('participants', '-password')
      .populate({
        path: 'latestMessage',
        populate: { path: 'sender', select: 'username avatar' }
      });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all chats for current user
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id
    })
    .populate('participants', '-password')
    .populate('groupAdmin', '-password')
    .populate({
      path: 'latestMessage',
      populate: { path: 'sender', select: 'username avatar' }
    })
    .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create group chat
exports.createGroupChat = async (req, res) => {
  try {
    const { chatName, users } = req.body;

    if (!chatName || !users || users.length < 2) {
      return res.status(400).json({ 
        error: 'Group name and at least 2 users are required' 
      });
    }

    // Add current user to the group
    users.push(req.user._id.toString());

    const groupChat = await Chat.create({
      chatName,
      isGroupChat: true,
      participants: users,
      groupAdmin: req.user._id
    });

    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate('participants', '-password')
      .populate('groupAdmin', '-password');

    res.status(201).json(fullGroupChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Rename group
exports.renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    if (chat.groupAdmin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only admin can rename group' });
    }

    chat.chatName = chatName;
    await chat.save();

    const updatedChat = await Chat.findById(chatId)
      .populate('participants', '-password')
      .populate('groupAdmin', '-password');

    res.json(updatedChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add user to group
exports.addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    if (chat.groupAdmin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only admin can add users' });
    }

    if (chat.participants.includes(userId)) {
      return res.status(400).json({ error: 'User already in group' });
    }

    chat.participants.push(userId);
    await chat.save();

    const updatedChat = await Chat.findById(chatId)
      .populate('participants', '-password')
      .populate('groupAdmin', '-password');

    res.json(updatedChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove user from group
exports.removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    if (chat.groupAdmin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only admin can remove users' });
    }

    chat.participants = chat.participants.filter(
      p => p.toString() !== userId
    );
    await chat.save();

    const updatedChat = await Chat.findById(chatId)
      .populate('participants', '-password')
      .populate('groupAdmin', '-password');

    res.json(updatedChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

