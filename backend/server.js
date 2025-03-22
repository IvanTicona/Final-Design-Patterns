require("dotenv").config();

// Dependencias
const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const connectDB = require("./config/db");
const ConversationService = require("./services/ConversationService");
const ChatServer = require("./ChatServer");
const MessageObserver = require("./observers/MessageObserver");

// Inicializaciones
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/conversations", require("./routes/conversations"));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/profile', require('./routes/profile'));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get('/api/conversations', async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.json(conversations);
  }
  catch (error) {
    res.status(500).json({ msg: 'Error obteniendo las conversaciones' });
  }
});

// Socket.io
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Unir a una sala específica (se espera que se envíe un conversationId válido)
  socket.on('joinConversation', (conversationId) => {
    if (!conversationId) {
      console.log(`No se proporcionó conversationId para el socket ${socket.id}`);
      return;
    }
    socket.join(conversationId);
    console.log(`Socket ${socket.id} se unió a la conversación ${conversationId}`);
  });

  // Manejo del envío de mensajes en tiempo real
  socket.on('sendMessage', async (data) => {
    try {
      // data debe contener: conversationId, sender y content
      const { conversationId, sender, content } = data;
      if (!conversationId || !sender || !content) {
        console.error(`Datos incompletos para enviar mensaje desde ${socket.id}`);
        return;
      }
      
      // Buscar y actualizar la conversación en la base de datos
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        console.error(`Conversación no encontrada: ${conversationId}`);
        return;
      }
      conversation.messages.push({ sender, content });
      await conversation.save();
      
      // Emitir el mensaje a todos los sockets en la sala
      io.to(conversationId).emit('receiveMessage', data);
      console.log(`Mensaje recibido de ${socket.id}: `, data);
    } catch (error) {
      console.error('Error en sendMessage: ', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});


// Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
