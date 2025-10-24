const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/search', userController.searchUsers);
router.get('/contacts', userController.getContacts);
router.post('/contacts', userController.addContact);
router.get('/:id', userController.getUserById);

module.exports = router;

