const MessageCommand = require('./MessageCommand');
const conversationService = require('../services/ConversationService');
const MessageFactory = require('../factories/MessageFactory');

class SendMessageCommand extends MessageCommand {
  constructor(data) {
    super();
    this.data = data; // { conversationId, sender, content, type }
  }

  async execute() {
    const message = MessageFactory.createMessage(this.data.type, {
      sender: this.data.sender,
      content: this.data.content
    });
    const conversation = await conversationService.addMessageToConversation(this.data.conversationId, message);
    return conversation;
  }
}

module.exports = SendMessageCommand;
