require("dotenv").config();

// Dependencias
const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const connectDB = require("./config/db");
const ChatServer = require("./ChatServer");

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

// Instanciamos el "ChatServer" (Subject)
const chatServer = new ChatServer(io);

// Arrancamos el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});