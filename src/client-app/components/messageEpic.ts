import { Observable } from 'rxjs';
import { combineEpics, Epic } from 'redux-observable';
import { Action } from 'redux';
import { State, EpicDependicies } from '../index';
import { receiveMessage } from '../components/messageReducer';
import { sendMessage, } from './messageReducer';


export const messageEpic$: Epic<any, State, EpicDependicies> = (action$, state, { socket }) =>
  action$.ofType(sendMessage)
  .mergeMap(({ payload }: { payload: { message: string } }) => {
    const name = state.getState().username;
    socket.sendMessage({ name, body: payload.message, toUser: state.getState().toUsername });
    return Observable.empty();
  })
