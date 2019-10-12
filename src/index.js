import React from 'react';
import { render } from 'react-dom';
import App from './App';
import UserProvider from './providers/UserProvider';
import RoomProvider from './providers/RoomProvider';
import MembershipProvider from './providers/MembershipProvider';
import { getSetRoomId } from './utility/getSetRoomId';
import './antd-theme.less';

let roomId = getSetRoomId(window);

render(
  <UserProvider>
    <RoomProvider roomId={roomId}>
      <MembershipProvider>
        <App />
      </MembershipProvider>
    </RoomProvider>
  </UserProvider>,
  document.getElementById('root')
);
