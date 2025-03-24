require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Conectar a MongoDB
connectDB();

// Configurar Express
const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/conversations', require('./routes/conversations'));
app.use('/api/file', require('./routes/file'));
app.use('/api/profile', require('./routes/profile')); // [Cambio] se incluye la ruta de perfil

app.get('/', (req, res) => {
  res.send('API de Chat en Tiempo Real está corriendo');
});

// Crear servidor HTTP y configurar Socket.IO
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

// Instanciar ChatServer (Observer)
const ChatServer = require('./ChatServer');
const chatServer = new ChatServer(io);

// Instanciar MessageObserver (Observer + Command)
const MessageObserver = require('./observers/MessageObserver');
new MessageObserver(chatServer);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
