const User = require('../models/User');

// Search users
exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const users = await User.find({
      _id: { $ne: req.user._id },
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    })
    .select('-password')
    .limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add contact
exports.addContact = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(req.user._id);

    if (user.contacts.includes(userId)) {
      return res.status(400).json({ error: 'User already in contacts' });
    }

    user.contacts.push(userId);
    await user.save();

    const updatedUser = await User.findById(req.user._id)
      .populate('contacts', '-password');

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get contacts
exports.getContacts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('contacts', '-password');

    res.json(user.contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

