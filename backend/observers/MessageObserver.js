const MessageFactory = require('../factories/MessageFactory'); // Ruta según tu estructura
const ConversationService = require('../services/ConversationService');

class MessageObserver {
  constructor(chatServer, conversationService) {
    this.chatServer = chatServer;
    this.conversationService = conversationService;
    // Se suscribe al evento 'messageReceived' del ChatServer
    this.chatServer.on('messageReceived', this.onMessageReceived.bind(this));
  }

  async onMessageReceived(data) {
    try {
      // Se espera que data tenga: conversationId, sender, content, type
      const { conversationId, sender, content, type } = data;
      if (!conversationId || !sender || !content || !type) {
        console.error('Datos incompletos en el mensaje recibido:', data);
        return;
      }

      // Crear el objeto mensaje usando el factory
      const message = MessageFactory.createMessage(type, { sender, content });

      // Guardar el mensaje en la conversación (mediante el servicio de conversaciones)
      await this.conversationService.addMessageToConversation(conversationId, message);

      // Emitir el mensaje a todos los sockets en la sala correspondiente
      this.chatServer.io.to(conversationId).emit('receiveMessage', message);
      console.log(`Mensaje procesado y enviado: ${message.getType()}`, message);
    } catch (error) {
      console.error('Error en MessageObserver:', error);
    }
  }
}

module.exports = MessageObserver;
