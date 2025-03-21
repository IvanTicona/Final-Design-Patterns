class MessageObserver {
  constructor(chatServer, conversationService) {
    // Se "suscribe" al ChatServer
    this.chatServer = chatServer;
    this.conversationService = conversationService;

    // Cuando el ChatServer emita 'messageReceived',
    // se llamará a onMessageReceived.
    this.chatServer.on('messageReceived', this.onMessageReceived.bind(this));
  }

  async onMessageReceived(data) {
    try {
      const { conversationId, sender, content } = data;
      // Guardamos el mensaje en la BD a través de un servicio
      await this.conversationService.saveMessage(conversationId, sender, content);

      // Luego, notificamos a todos los clientes en esa "room" de Socket.io
      this.chatServer.io.to(conversationId).emit('receiveMessage', data);

      console.log(`Mensaje procesado y notificado:`, data);
    } catch (error) {
      console.error('Error guardando mensaje o notificando a clientes:', error);
    }
  }
}

module.exports = MessageObserver;
