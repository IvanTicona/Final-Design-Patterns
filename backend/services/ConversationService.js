const Conversation = require('../models/Conversation');

class ConversationService {
  // Crea o retorna una conversación entre los participantes (denormalizada)
  // participantsData: Array de objetos { _id, username, profilePicture }
  async createOrGetConversation(participantsData) {
    // Ordenar de forma determinista
    const sortedParticipants = participantsData.sort((a, b) =>
      a._id.toString().localeCompare(b._id.toString())
    );
    const participantIds = sortedParticipants.map(p => p._id);

    let conversation = await Conversation.findOne({
      "participants._id": { $all: participantIds }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: sortedParticipants,
        messages: []
      });
      await conversation.save();
    }
    return conversation;
  }

  // Agrega un mensaje a la conversación y lo guarda en la DB
  async addMessageToConversation(conversationId, message) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new Error(`Conversación no encontrada: ${conversationId}`);
    }
    const messageObj = {
      sender: message.sender,
      content: message.content,
      type: message.getType(),
      timestamp: message.timestamp
    };
    conversation.messages.push(messageObj);
    await conversation.save();
    return conversation;
  }

  // Obtiene todas las conversaciones en las que participa un usuario
  async getUserConversations(userId) {
    return await Conversation.find({ "participants._id": userId });
  }
}

module.exports = new ConversationService();
