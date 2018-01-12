import * as express from 'express';
import { serveStatic } from 'serve-static';
import * as io from 'socket.io';
import * as path from 'path';
import * as http from 'http';

const app = express();
const server = new http.Server(app);
const ioServer = io(server);

const users: { [username: string]: string} = {};
app.use('/js', express.static(path.join(__dirname, 'js')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

ioServer.on('connection', (socket) => {

  socket.on('register', username => {
    console.log(username);
  })
  socket.on('message', message => {
    ioServer.emit('message', message);

  });

})
server.listen(3000, () => console.log('Example app listening on port 3000!'))
