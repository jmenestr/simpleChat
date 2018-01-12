import { Observable } from 'rxjs';
import { combineEpics, Epic } from 'redux-observable';
import { Action } from 'redux';
import { State, EpicDependicies } from '../index';
import { socketConnect } from './socketReducer';
import { receiveMessage } from '../components/messageReducer';
import { MessageModel } from '../components/Chat';


export const socketEpic$: Epic<Action, State, EpicDependicies> = (action$, state, { socket }) =>
  action$.ofType(socketConnect)
  .mergeMap(action => {
    return Observable.fromEvent(socket.getSocket(), 'message')
      .map(payload => receiveMessage({ message: payload as MessageModel}))
  })
