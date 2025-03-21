const Conversation = require('../models/Conversation');

class ConversationService {
  async saveMessage(conversationId, sender, content) {
    // Busca la conversación en la BD
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new Error(`Conversación no encontrada: ${conversationId}`);
    }

    // Agrega el mensaje
    conversation.messages.push({ sender, content });
    await conversation.save();

    return conversation;
  }

  // Otros métodos de negocio, por ejemplo:
  // createOrGetConversation(userId1, userId2) { ... }
  // getUserConversations(userId) { ... }
  // etc.
}

module.exports = ConversationService;
