const MessageCommand = require('./MessageCommand');
const Conversation = require('../models/Conversation');

class DeleteMessageCommand extends MessageCommand {
  constructor(conversationId, messageId) {
    super();
    this.conversationId = conversationId;
    this.messageId = messageId;
  }

  async execute() {
    const conversation = await Conversation.findById(this.conversationId);
    if (!conversation) throw new Error("Conversation not found");
    conversation.messages.id(this.messageId).remove();
    await conversation.save();
    return conversation;
  }
}

module.exports = DeleteMessageCommand;
