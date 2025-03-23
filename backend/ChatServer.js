const EventEmitter = require('events');

class ChatServer extends EventEmitter {
  constructor(io) {
    super();
    this.io = io;
    this.setupSocket();
  }

  setupSocket() {
    this.io.on('connection', (socket) => {
      console.log(`Cliente conectado: ${socket.id}`);

      // Unirse a una sala de conversación
      socket.on('joinConversation', (conversationId) => {
        if (!conversationId) return;
        socket.join(conversationId);
        console.log(`Socket ${socket.id} se unió a la conversación ${conversationId}`);
      });

      // Recibir y reenviar mensajes
      socket.on('sendMessage', (data) => {
        // Se espera que data tenga: conversationId, sender, content, type
        if (!data.conversationId || !data.sender || !data.content || !data.type) {
          console.error(`Datos incompletos desde ${socket.id}`, data);
          return;
        }
        // Emite un evento para que los observadores lo procesen
        this.emit('messageReceived', data);
        console.log(`Mensaje recibido de ${socket.id}:`, data);
      });

      socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
      });
    });
  }
}

module.exports = ChatServer;
