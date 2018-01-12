import actionCreatorFactory from 'typescript-fsa';
import { reducerWithoutInitialState } from "typescript-fsa-reducers";
import { State } from '../index';
import { MessageModel } from './Chat';

const actionCreator = actionCreatorFactory();

export const sendMessage = actionCreator<{ message: string }>('SEND');
export const receiveMessage = actionCreator<{ message: MessageModel }>('RECEIVE');

export const messageReducer =
  reducerWithoutInitialState()
    .case(receiveMessage, (state: State, {message}) => {
      return {
        ...state,
        messages: state.messages.concat(message),
      }
    })
