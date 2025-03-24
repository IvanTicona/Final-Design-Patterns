const MessageCommand = require('./MessageCommand');
const Conversation = require('../models/Conversation');

class EditMessageCommand extends MessageCommand {
  constructor(conversationId, messageId, newContent) {
    super();
    this.conversationId = conversationId;
    this.messageId = messageId;
    this.newContent = newContent;
  }

  async execute() {
    const conversation = await Conversation.findById(this.conversationId);
    if (!conversation) throw new Error("Conversation not found");
    const message = conversation.messages.id(this.messageId);
    if (!message) throw new Error("Message not found");
    message.content = this.newContent;
    await conversation.save();
    return conversation;
  }
}

module.exports = EditMessageCommand;
