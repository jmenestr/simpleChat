import actionCreatorFactory from 'typescript-fsa';
import { reducerWithoutInitialState } from "typescript-fsa-reducers";
import { State } from '../index';
import { MessageModel } from './Chat';

const actionCreator = actionCreatorFactory();

export const sendMessage = actionCreator<{ message: string }>('SEND');
export const receiveMessage = actionCreator<{ message: MessageModel }>('RECEIVE');
export const changeReciever = actionCreator<{ username: string}>("CHANGE_RECEIVER");
export const addUser = actionCreator<{user: string}>('ADD_USER');
export const addUsers = actionCreator<{users: string[]}>('ADD_USERS');
export const removeUser = actionCreator<{ user: string }>('REMOVE_USER');

export const messageReducer =
  reducerWithoutInitialState()
    .case(receiveMessage, (state: State, {message}) => {
      const name = message.name;
      if (name === state.toUsername || name === state.username) {
        return {
          ...state,
          messages: state.messages.concat(message),
        }
      }
      return state;
     
    })
    .case(changeReciever, (state: State, { username }) => {
      return {
        ...state,
        toUsername: username,
        messages: [],
      }
    })
    .case(addUser, (state: State, { user }) => {
      return {
        ...state,
        users: state.users.concat(user)
      }
    })
    .case(addUsers, (state: State, { users }) => {
      console.log(users)
      return {
        ...state,
        users: users
      }
    })
    .case(removeUser, (state: State, { user }) => {
      return {
        ...state,
        users: state.users.filter(name => name !== user)
      }
    })

