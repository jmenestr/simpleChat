import * as React from 'react';
import styled from 'styled-components';
import { sendMessage } from './messageReducer';
import { connect } from 'react-redux';

const MessagewWrapper = styled.div`
display: flex;
height: 50px;
`
const SendButton = styled.button`
outline: none;
background-color: #0f9d58;
color: white;
padding: 5px;
border: none;
height: 50px;
width: 100px;
`
const MessageText = styled.textarea`
resize: none;
height: 100%;
flex: 1;
box-sizing: border-box;
`
interface MappedDispatch {
  sendMessage: (message: string) => void;
}
class MessageInputComponent extends React.PureComponent<MappedDispatch, { message: string }> {
  constructor(props: MappedDispatch) {
    super(props);
    this.state = {
      message: ''
    }
  }

  onMessageSend = () => {
    this.props.sendMessage(this.state.message);
  }

  onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ message: e.target.value })
  render() {
    return (
      <MessagewWrapper>
        <MessageText onChange={this.onChange} placeholder='Type your message...' />
        <SendButton onClick={this.onMessageSend}>Send</SendButton>
      </MessagewWrapper>
    )
  }
}

const mapDispatchToProps = (dispatch: any): MappedDispatch => ({
  sendMessage: (message: string) => dispatch(sendMessage({ message }))
})

const MessageInput = connect(
  () => ({}),
  mapDispatchToProps,
)(MessageInputComponent);

export default MessageInput;
