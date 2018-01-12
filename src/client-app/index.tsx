import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import Chat, { MessageModel } from './components/Chat';
import { createStore, applyMiddleware, compose, Action } from 'redux';
import { Provider } from 'react-redux';
import { socketEpic$ } from './services/socketEpic';
import SocketService from './services/SocketService';
import { messageReducer } from './components/messageReducer';
import { messageEpic$ } from './components/messageEpic';
import { names } from './components/Users';

export interface State {
  messages: MessageModel[]
  username: string;
}

export interface EpicDependicies {
  socket: SocketService;
}

const randomUser = () => names[Math.floor(Math.random() * (names.length - 1))]
const rootEpic = combineEpics(
  socketEpic$,
  messageEpic$,
)
const epicMiddleware = createEpicMiddleware<Action, State, EpicDependicies>(rootEpic, 
  {
    dependencies: { socket: new SocketService() }
  });

const store = createStore(messageReducer, { messages: [], username: randomUser(), toUserName: randomUser()}, applyMiddleware(epicMiddleware), );

ReactDOM.render(
  <Provider store={store}>
    <Chat />
  </Provider>, 
document.querySelector('#app'));
