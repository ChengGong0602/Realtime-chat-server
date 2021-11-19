const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');
const formatMessage = require('./messages');
const db = require('./data/db-config')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', formatMessage('admin', `${user.name}, welcome to room ${user.room}.`));
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.name, message));
    db_insert(user.name, user.room, message );       
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', formatMessage('Admin', `${user.name} has left.`));
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));


const db_insert = async function(user_name,room_name, message) {
  try {
    console.log("db inserting ==>:",user_name);
      const users = await db.insert({
        user_name: user_name,
        room_name: room_name,
        message: message,
        created_at: new Date()
      });
    } catch (error) {
      console.log("error==>:",error);
    }
}

