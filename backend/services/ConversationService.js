const Conversation = require('../models/Conversation');

class ConversationService {
  // Método para agregar un mensaje a una conversación existente
  async addMessageToConversation(conversationId, message) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new Error(`Conversación no encontrada: ${conversationId}`);
    }
    // Agregar el mensaje (el objeto message ya tiene la estructura y propiedades definidas)
    conversation.messages.push(message);
    await conversation.save();
    return conversation;
  }

  // Otros métodos relacionados con las conversaciones… 
}

module.exports = ConversationService;
