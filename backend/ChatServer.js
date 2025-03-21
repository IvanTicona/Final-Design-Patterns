const EventEmitter = require('events');

class ChatServer extends EventEmitter {
  constructor(io) {
    super();
    this.io = io;
    this.handleSocketConnection();
  }

  handleSocketConnection() {
    this.io.on('connection', (socket) => {
      console.log(`Cliente conectado: ${socket.id}`);

      socket.on('joinConversation', (conversationId) => {
        if (!conversationId) {
          console.log(`No se proporcionó conversationId para el socket ${socket.id}`);
          return;
        }
        socket.join(conversationId);
        console.log(`Socket ${socket.id} se unió a la conversación ${conversationId}`);
      });

      // Este evento se recibe cuando un cliente envía un mensaje
      socket.on('sendMessage', async (data) => {
        try {
          // data debe contener: { conversationId, sender, content }
          const { conversationId, sender, content } = data;
          if (!conversationId || !sender || !content) {
            console.error(`Datos incompletos para enviar mensaje desde ${socket.id}`);
            return;
          }

          // En lugar de guardar directamente en la BD aquí,
          // emitimos un evento para que "otros" (Observers) lo manejen
          // y realicen la lógica correspondiente.
          this.emit('messageReceived', data);

        } catch (error) {
          console.error('Error en sendMessage: ', error);
        }
      });

      socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
      });
    });
  }
}

module.exports = ChatServer;
