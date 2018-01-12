import * as socket from 'socket.io-client'
import Message from '../components/Message';
import { MessageModel } from '../components/Chat';

export default class SocketService {
  private socket: SocketIOClient.Socket;
  
  constructor() {
    this.socket = socket.connect('http://localhost:3000');
  }

  getSocket() {
    return this.socket;
  }

  sendMessage(message: MessageModel) {
    this.socket.emit('message', message);
  }

  registerUser(username: string) {
    this.socket.emit('register', username);
  }

}

