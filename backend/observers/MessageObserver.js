const SendMessageCommand = require('../commands/SendMessageCommand');
const CommandInvoker = require('../commands/CommandInvoker');

class MessageObserver {
  constructor(chatServer) {
    this.chatServer = chatServer;
    this.invoker = new CommandInvoker();
    this.chatServer.on('messageReceived', this.onMessageReceived.bind(this));
  }

  async onMessageReceived(data) {
    try {
      const command = new SendMessageCommand(data);
      const conversation = await this.invoker.executeCommand(command);
      const lastMessage = conversation.messages[conversation.messages.length - 1];
      //this.chatServer.io.to(conversationId).emit('receiveMessage', lastMessage);
      const messageToSend = { ...lastMessage.toObject(), conversationId };
      this.chatServer.io.to(conversationId).emit('receiveMessage', messageToSend);


      console.log(`Mensaje procesado y emitido: ${message.getType()}`);
    } catch (error) {
      console.error('Error en MessageObserver:', error);
    }
  }
}

module.exports = MessageObserver;
