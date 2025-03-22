const Conversation = require('../models/Conversation');

exports.createOrGetConversation = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;

    if (!userId1 || !userId2) {
      return res.status(400).json({ msg: 'Debe proporcionar ambos IDs de usuario' });
    }
    const participants = [userId1, userId2].sort();
    
    let conversation = await Conversation.findOne({ participants });
    
    if (!conversation) {
      conversation = new Conversation({ participants, messages: [] });
      await conversation.save();
    }
    
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ msg: 'Error creando u obteniendo la conversación' });
  }
};

exports.getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.find({ participants: userId })
      .populate('participants', 'username') // Opcional: para traer datos de los usuarios
      .sort({ updatedAt: -1 });
    
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo las conversaciones' });
  }
};

exports.addMessageToConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { sender, content } = req.body;
    
    if (!sender || !content) {
      return res.status(400).json({ msg: 'Falta el remitente o contenido del mensaje' });
    }
    
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ msg: 'Conversación no encontrada' });
    }
    
    conversation.messages.push({ sender, content });
    await conversation.save();

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ msg: 'Error al agregar el mensaje' });
  }
};
