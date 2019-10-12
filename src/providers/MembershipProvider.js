import React, { useState, useEffect, createContext, useContext } from 'react';
import { RoomContext } from '../providers/RoomProvider';
import { UserContext } from '../providers/UserProvider';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utility/collectIdsAndDocs';

export const MembershipContext = createContext({ room: null });

const MembershipProvider = ({ children, roomId, memberName, memberId }) => {
  const [roomMembers, setRoomMembers] = useState([]);

  useEffect(() => {
    if (!roomId) {
      return;
    }

    return firestore.collection(`room/${roomId}/members`).onSnapshot(snapshot => {
      setRoomMembers(snapshot.docs.map(collectIdsAndDocs));
    });
  }, [roomId]);

  useEffect(() => {
    if (!roomId || !memberId) {
      return;
    }

    firestore
      .collection(`room/${roomId}/members`)
      .doc(memberId)
      .set(
        { displayName: memberName },
        { merge: true }
      );
  }, [roomId, memberName, memberId]);

  const exitRoom = (userId) => {
    return firestore
      .collection(`room/${roomId}/members/`)
      .doc(`${userId}`)
      .delete();
  }

  const isRoomMember = (user) => {
    if (!user) {
      return false;
    }

    return roomMembers
      .map(member => member.id)
      .includes(user.id);
  }


  return (
    <MembershipContext.Provider value={{
      exitRoom,
      isRoomMember,
      roomMembers
    }}>
      {children}
    </MembershipContext.Provider>
  );
}

const Container = ({ children }) => {
  const { room } = useContext(RoomContext);
  const { user } = useContext(UserContext);

  const roomId = (room) ? room.id : null;
  const memberName = (user) ? user.displayName : null;
  const memberId = (user) ? user.id : null;

  return (
    <MembershipProvider
      memberId={memberId}
      memberName={memberName}
      roomId={roomId}
    >
      {children}
    </MembershipProvider>
  );
};

export default Container;
