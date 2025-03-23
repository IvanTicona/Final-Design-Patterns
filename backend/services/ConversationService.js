const Conversation = require('../models/Conversation');

class ConversationService {
  async createOrGetConversation(userDataArray) {
    const sortedParticipants = userDataArray.sort((a, b) =>
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

  async getUserConversations(userId) {
    return await Conversation.find({ "participants._id": userId });
  }
}

module.exports = new ConversationService();
