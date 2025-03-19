const express = require('express');
const router = express.Router();
const {
  createOrGetConversation,
  getUserConversations,
  addMessageToConversation
} = require('../controllers/conversationController');

// Crear o recuperar conversación (requiere: userId1, userId2 en el body)
router.post('/', createOrGetConversation);

// Obtener todas las conversaciones de un usuario
router.get('/:userId', getUserConversations);

// Agregar un mensaje a una conversación
router.post('/:conversationId/messages', addMessageToConversation);

module.exports = router;
