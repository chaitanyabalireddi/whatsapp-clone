const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  isGroupChat: {
    type: Boolean,
    default: false
  },
  chatName: {
    type: String,
    trim: true
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  groupAvatar: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Chat', chatSchema);

