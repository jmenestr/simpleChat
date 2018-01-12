import * as React from 'react';
import * as socket from 'socket.io-client';
import Message from './Message';
import styled from 'styled-components';
import MessageInput from './MessageInput';
import { State } from '../index';
import { connect } from 'react-redux';
import { socketConnect, } from '../services/socketReducer';
import { Dispatch } from 'redux';

export interface MessageModel {
  name: string;
  body: string;
}


interface MappedDispatch {
  connectSocket: () => void;
}
const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const MessageContainer = styled.div`
background-color: #eee;
overflow-y: auto;
padding: 10px;
flex: 1;
height: 100%;
`

interface MappedProps {
  messages: Array<MessageModel>;
  username: string;
}

class ChatContainer extends React.PureComponent<MappedProps & MappedDispatch, {}> {
  componentDidMount() {
    this.props.connectSocket()
  }
  render() {
    return (
      <MessageWrapper>
        <h1>Welcome { this.props.username }</h1>
        <MessageContainer className='message-window'>
        {
          this.props.messages.map((message, idx) => <Message key={idx} message={message} />)
        }
        </MessageContainer>
        <MessageInput />
      </MessageWrapper>
    )
  }
}

const mapStateToProps = (state: State) => ({
  messages: state.messages,
  username: state.username,
})

const mapDispatchToProps = (dispatch: any): MappedDispatch => ({
  connectSocket: () => dispatch(socketConnect()),
})
const Chat = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainer);

export default Chat;
