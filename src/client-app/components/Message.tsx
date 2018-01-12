import * as React from 'react';
import { MessageModel } from './Chat';
import styled from 'styled-components';

interface MessageProps {
  message: MessageModel;
}

const MessageTitle = styled.h4`
  font-size: 15px;
  font-weight: bold;
  color: black;
  font-family: sans-serif
`;

const MessageBody = styled.p`
background-color: #0f9d58;
padding: 6px;
color: #fefefe;
display: block;
position: relative;
border-radius: 5px;
&:before {
  height: 0;
  width: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid #0f9d58;
  position: absolute;
  left: 10px;
  top: -7px;
  display: block;
  content: '';

}`

const Message = ({ message }: MessageProps) =>
  <div>
    <MessageTitle>{ message.name }</MessageTitle>
    <MessageBody>{ message.body }</MessageBody>
  </div>

export default Message;
