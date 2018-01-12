import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeReciever } from './messageReducer';
import { State } from '../index';
export const names = [
  'jmenestr',
  'allison',
  'mark',
  'bob',
  'skye',
  'harrison',
]

const UserList = styled.ul`
background-color: #eee;
flex: 1;
list-style: none;
padding: 0;
margin: 0;
border-left: 1px solid black;
padding-left: 5px;
box-sizing: border-box;

`
const UserItem = styled.li`
&:hover {
  background-color: #ddd;
}
`
const Users = ( { onClick, users }: { onClick: (username: string) => void, users: string[]}) =>
  <UserList>
    <h4> Users Online </h4>
    { users.map(name => <UserItem key={name} onClick={() => onClick(name)}> { name }</UserItem>) }
  </UserList>

const mapDispatchToProps = (dispatch: any) => ({
  onClick: (username: string) => dispatch(changeReciever({ username }))
})
export default connect(
  (state: State) => ({
    users: state.users.filter(name => name !== state.username),
  }),
  mapDispatchToProps
)(Users)
