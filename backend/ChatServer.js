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

      socket.on('joinConversation', (conversationId) => {
        if (!conversationId) return;
        socket.join(conversationId);
        console.log(`Socket ${socket.id} se unió a la conversación ${conversationId}`);
      });

      socket.on('sendMessage', (data) => {
        // data debe incluir conversationId, sender, content, type
        if (!data.conversationId || !data.sender || !data.content || !data.type) {
          console.error(`Datos incompletos desde ${socket.id}`, data);
          return;
        }
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
