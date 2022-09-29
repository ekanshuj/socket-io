const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);

app.use(cors());

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(`user connected : ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`user ${socket.id} joined room ${data}`);
  })

  socket.on('send_msg', (data) => {
    socket.to(data.room).emit('receive_msg', data)
  })

  socket.on('disconnect', () => {
    console.log(`user disconnected : ${socket.id}`);
    socket.removeAllListeners('join_room');
    socket.removeAllListeners('send_msg');
    io.removeAllListeners('connection');
  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(5000, () => {
  console.log('server connected');
});

//https://stackoverflow.com/questions/19162582/socket-io-message-event-firing-multiple-times