const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { generateChatRoomId } = require('../utils/chatUtils');

// Obtener historial de chat entre dos usuarios
router.get('/:userId1/:userId2', async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const chatRoomId = generateChatRoomId(userId1, userId2);

    const messages = await Message.find({ chatRoomId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener el historial de chat' });
  }
});

module.exports = router;
