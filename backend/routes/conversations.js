const express = require('express');
const router = express.Router();
const {
  createOrGetConversation,
  getUserConversations,
  addMessageToConversation
} = require('../controllers/conversationController');

router.post('/', createOrGetConversation);
router.get('/:userId', getUserConversations);
router.post('/:conversationId/messages', addMessageToConversation);

module.exports = router;
