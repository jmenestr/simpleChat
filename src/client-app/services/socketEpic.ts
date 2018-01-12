import { Observable } from 'rxjs';
import { combineEpics, Epic } from 'redux-observable';
import { Action } from 'redux';
import { State, EpicDependicies } from '../index';
import { socketConnect, registerSocket } from './socketReducer';
import { receiveMessage, addUser, addUsers, removeUser } from '../components/messageReducer';
import { MessageModel } from '../components/Chat';


export const socketEpic$: Epic<Action, State, EpicDependicies> = (action$, state, { socket }) =>
  action$.ofType(socketConnect)
  .flatMap(action => {
    const messageObservable = 
    Observable.fromEvent(socket.getSocket(), 'message')
    .map(payload => receiveMessage({ message: payload as MessageModel}))
    const joinObservable = 
    Observable.fromEvent(socket.getSocket(), 'join')
    .map(payload => addUser({ user: payload as string}))
    const usersObservable =
      Observable.fromEvent(socket.getSocket(), 'users')
      .map(payload => addUsers({ users: payload as string[]}))
    
    const removeUserObservable =
      Observable.fromEvent(socket.getSocket(), 'userDisconnect')
        .map(payload => removeUser({ user: payload as string}))

    return Observable.merge(messageObservable, joinObservable, usersObservable, removeUserObservable)
  });

  export const registerUserSocketEpic$: Epic<any, State, EpicDependicies> = (action$, state, { socket }) =>
  action$.ofType(registerSocket)
  .mergeMap((action) => {
    socket.registerUser(state.getState().username);
    return Observable.empty();
  })
