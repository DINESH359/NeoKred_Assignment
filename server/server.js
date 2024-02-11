const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const markdownRouter = require('./routes/markdown');
const app = express();
const connectDB = require('./config/db');
const fileRoutes = require('./routes/fileRoutes'); // Fix typo in the require statement
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});
const PORT = process.env.PORT || 3001; // Change port to 3001 if not specified in config

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

connectDB(); // Call connectDB to establish MongoDB connection

io.on('connection', (socket) => {
    console.log('connection Established ..!!!');
    markdownRouter(io,socket);
    socket.on('disconnect', () => {
        console.log('connection lost ..!!');
    });
});

app.use('/file', fileRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
