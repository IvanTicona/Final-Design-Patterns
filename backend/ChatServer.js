const EventEmitter = require("events");

class ChatServer extends EventEmitter {
  constructor(io) {
    super();
    this.io = io;
    this.setupSocket();
  }

  setupSocket() {
    this.io.on("connection", (socket) => {
      console.log(`Cliente conectado: ${socket.id}`);

      // Unirse a una sala de conversación
      socket.on("joinConversation", (conversationId) => {
        if (!conversationId) return;
        socket.join(conversationId);
        console.log(`Socket ${socket.id} se unió a la conversación ${conversationId}`);
      });

      // Recibir y reenviar mensajes
      socket.on("sendMessage", (data) => {
        if (!data.conversationId || !data.sender || !data.content || !data.type) {
          console.error(`Datos incompletos desde ${socket.id}`, data);
          return;
        }
        this.emit("messageReceived", data);
        console.log(`Mensaje recibido de ${socket.id}:`, data);
      });

      // **WebRTC - Manejo de llamadas**
      
      // Un usuario quiere hacer una llamada
      socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        console.log(`Llamada entrante de ${from} a ${userToCall}`);
        this.io.to(userToCall).emit("callIncoming", { signal: signalData, from, name });
      });

      // Responder una llamada
      socket.on("answerCall", ({ to, signal }) => {
        console.log(`Llamada respondida por ${socket.id}`);
        this.io.to(to).emit("callAccepted", signal);
      });

      // Manejo de desconexión
      socket.on("disconnect", () => {
        console.log(`Cliente desconectado: ${socket.id}`);
      });
    });
  }
}

module.exports = ChatServer;

