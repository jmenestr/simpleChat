import * as express from 'express';
import { serveStatic } from 'serve-static';
import * as io from 'socket.io';
import * as path from 'path';
import * as http from 'http';
import * as r from 'ramda';

const app = express();
const server = new http.Server(app);
const ioServer = io(server);

const users: { [username: string]: string} = {};
app.use('/js', express.static(path.join(__dirname, 'js')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

ioServer.on('connection', (socket) => {
  socket.emit('users', r.keys(users))
  socket.on('register', username => {
    users[username] = socket.id;
    ioServer.emit('join', username);
  });

  socket.on('message', message => {
    const toUser = message.toUser;
    const targetScoket = users[toUser];
    if (targetScoket) {
      [socket.id, targetScoket].forEach(s => ioServer.to(s).emit('message', message))
    }
  

  });

  socket.on('disconnect', () => {
    const flippedUsers = r.invertObj(users);
    const userToDelete = flippedUsers[socket.id];
    delete users[userToDelete];
    ioServer.emit('userDisconnect', userToDelete);

  })

})
server.listen(3000, () => console.log('Example app listening on port 3000!'))
