const Conversation = require('../models/Conversation');
const User = require('../models/User');

exports.createOrGetConversation = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;
    if (!userId1 || !userId2) {
      return res.status(400).json({ msg: 'Debe proporcionar ambos IDs de usuario' });
    }

    const participantsSorted = [userId1, userId2].sort();
    let conversation = await Conversation.findOne({
      "participants._id": { $all: participantsSorted }
    });

    if (!conversation) {
      const participantData = await Promise.all(
        [userId1, userId2].map(async (id) => {
          const user = await User.findById(id);
          return {
            _id: user._id,
            username: user.username,
            profilePicture: user.profilePicture
          };
        })
      );
      conversation = new Conversation({ participants: participantData, messages: [] });
      await conversation.save();
    }
    
    return res.status(200).json(conversation);
  } catch (error) {
    console.error('Error creando u obteniendo la conversación:', error);
    return res.status(500).json({ msg: 'Error creando u obteniendo la conversación' });
  }
};

exports.getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({ "participants._id": userId });
    return res.status(200).json(conversations);
  } catch (error) {
    console.error('Error obteniendo conversaciones:', error);
    return res.status(500).json({ msg: 'Error obteniendo las conversaciones' });
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

    conversation.messages.push({ sender, content, type: 'text' });
    await conversation.save();

    return res.status(201).json(conversation);
  } catch (error) {
    console.error('Error al agregar el mensaje:', error);
    return res.status(500).json({ msg: 'Error al agregar el mensaje' });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ msg: 'Conversación no encontrada' });
    }
    return res.status(200).json(conversation);
  } catch (error) {
    console.error('Error obteniendo la conversación:', error);
    return res.status(500).json({ msg: 'Error obteniendo la conversación' });
  }
};
