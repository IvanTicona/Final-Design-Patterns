const express = require('express');
const router = express.Router();
const {
  createOrGetConversation,
  getUserConversations,
  getConversation,
  addMessageToConversation
} = require('../controllers/conversationController');

router.post('/', createOrGetConversation);
router.get('/:userId', getUserConversations);
router.get('/conversation/:conversationId', getConversation);
router.post('/:conversationId/messages', addMessageToConversation);

module.exports = router;
