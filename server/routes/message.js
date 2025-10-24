const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', messageController.sendMessage);
router.get('/:chatId', messageController.getMessages);
router.put('/read/:messageId', messageController.markAsRead);
router.delete('/:messageId', messageController.deleteMessage);

module.exports = router;

