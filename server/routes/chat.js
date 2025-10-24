const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', chatController.accessChat);
router.get('/', chatController.getChats);
router.post('/group', chatController.createGroupChat);
router.put('/group/rename', chatController.renameGroup);
router.put('/group/add', chatController.addToGroup);
router.put('/group/remove', chatController.removeFromGroup);

module.exports = router;

