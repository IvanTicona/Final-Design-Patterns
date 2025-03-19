const Conversation = require('../models/Conversation');

/**
 * Crea o retorna una conversación entre dos usuarios.
 * Se espera recibir en el body: { userId1, userId2 }
 */
exports.createOrGetConversation = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;
    if (!userId1 || !userId2) {
      return res.status(400).json({ msg: 'Debe proporcionar ambos IDs de usuario' });
    }
    // Ordenar de forma determinista
    const participants = [userId1, userId2].sort();
    
    // Buscar si ya existe una conversación con estos participantes
    let conversation = await Conversation.findOne({ participants });
    
    if (!conversation) {
      conversation = new Conversation({ participants, messages: [] });
      await conversation.save();
    }
    
    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error creando o obteniendo la conversación' });
  }
};

/**
 * Obtiene todas las conversaciones en las que participa un usuario.
 * Se espera recibir el userId en req.params.
 */
exports.getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({ participants: userId })
      .populate('participants', 'username') // Opcional: para traer datos de los usuarios
      .sort({ updatedAt: -1 });
    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error obteniendo las conversaciones' });
  }
};

/**
 * Agrega un mensaje a una conversación.
 * Se espera en req.params: { conversationId }
 * y en req.body: { sender, content }
 */
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
    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al agregar el mensaje' });
  }
};
