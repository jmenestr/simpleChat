import actionCreatorFactory from 'typescript-fsa';
import { reducerWithoutInitialState } from "typescript-fsa-reducers";
import { State } from '../index';


const actionCreator = actionCreatorFactory('SOCKET');

export const socketConnect = actionCreator('CONNECT');
export const registerSocket = actionCreator('REGISTER');
