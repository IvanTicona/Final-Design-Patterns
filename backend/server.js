require('dotenv').config();

// Dependencies
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const connectDB = require('./config/db');

const Message = require('./models/Message');
const { generateChatRoomId } = require('./utils/chatUtils');

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
// app.use('/api/chats', require('./routes/chat'));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Socket.io
io.on('connection', (socket) => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);

  // Un ejemplo de unirse a una sala (opcional, si manejas chats grupales)
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} se unió a la sala ${room}`);
  });

  // Evento para recibir un mensaje desde el cliente
  socket.on('sendMessage', (data) => {
    console.log(`Mensaje recibido de ${socket.id}: `, data);
    // Si el mensaje es para una sala en específico:
    if (data.room) {
      // Emite el mensaje a todos los clientes de la sala, excepto al remitente
      socket.to(data.room).emit('receiveMessage', data);
    } else {
      // En caso de ser un mensaje global, emítelo a todos los conectados
      io.emit('receiveMessage', data);
    }
  });

  // Evento de desconexión
  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});


// Server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});