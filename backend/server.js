require('dotenv').config();

// Dependencies
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const Conversation = require('./models/Conversation'); // Importa el modelo de Conversación


// Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});


// Database connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/conversations', require('./routes/conversations')); // Endpoints de conversaciones

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
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