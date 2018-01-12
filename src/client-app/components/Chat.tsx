import * as React from 'react';
import * as socket from 'socket.io-client';
import Message from './Message';
import styled from 'styled-components';
import MessageInput from './MessageInput';
import { State } from '../index';
import { connect } from 'react-redux';
import { socketConnect, registerSocket } from '../services/socketReducer';
import { Dispatch } from 'redux';
import Users from './Users';

export interface MessageModel {
  name: string;
  body: string;
  toUser?: string;
}


interface MappedDispatch {
  connectSocket: () => void;
  registerSocket: () => void;  
}
const MessageWrapper = styled.div`
  display: flex;
  height: 100%;
`
const MessageContainer = styled.div`
background-color: #eee;
padding: 10px;
flex: 4;
display: flex;
flex-direction: column;
box-sizing: border-box;
height: 100%;
`


interface MappedProps {
  messages: Array<MessageModel>;
  username: string;
  toUsername: string;
}
const Messages = styled.div`
overflow-y: auto;

flex: 1;
`
class ChatContainer extends React.PureComponent<MappedProps & MappedDispatch, {}> {
  componentDidMount() {
    this.props.connectSocket()
    this.props.registerSocket();
  }
  render() {
    return (
      <div style={{ height: '100%'}}>
      <MessageWrapper>
        
        <MessageContainer className='message-window'>
        <h1>Welcome { this.props.username }: Chatting with { this.props.toUsername }</h1>
        <Messages>
        {
          this.props.messages.map((message, idx) => <Message key={idx} message={message} />)
        }
        </Messages>
        <MessageInput />
        </MessageContainer>
        <Users />
      </MessageWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  messages: state.messages,
  username: state.username,
  toUsername: state.toUsername,
})

const mapDispatchToProps = (dispatch: any): MappedDispatch => ({
  connectSocket: () => dispatch(socketConnect()),
  registerSocket: () => dispatch(registerSocket()),
})
const Chat = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainer);

export default Chat;
