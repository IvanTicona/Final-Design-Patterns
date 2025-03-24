const MessageFactory = require('../factories/MessageFactory');
const conversationService = require('../services/ConversationService');

class MessageObserver {
  constructor(chatServer) {
    this.chatServer = chatServer;
    // Se suscribe al evento "messageReceived"
    this.chatServer.on('messageReceived', this.onMessageReceived.bind(this));
  }

  async onMessageReceived(data) {
    try {
      const { conversationId, sender, content, type } = data;
      // Crea el objeto mensaje según el tipo usando el Factory
      const message = MessageFactory.createMessage(type, { sender, content });
      // Guarda el mensaje en la conversación
      const conversation = await conversationService.addMessageToConversation(conversationId, message);
      // Emite el mensaje a todos los clientes conectados a esa sala
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
