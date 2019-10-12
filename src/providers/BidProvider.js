import React, { useContext, useState, useEffect, createContext } from 'react';
import { RoomContext } from '../providers/RoomProvider';
import { UserContext } from '../providers/UserProvider';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utility/collectIdsAndDocs';

export const BidContext = createContext({ room: null });

const BidProvider = ({ children, roomId, issueId, userId, userName }) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (!roomId) {
      return;
    }

    return firestore.collection(`room/${roomId}/issues/${issueId}/bids`).onSnapshot(snapshot => {
      setBids(snapshot.docs.map(collectIdsAndDocs));
    });
  }, [roomId, issueId]);

  const bidIssue = ({ bidValue }) => {
    const bid = {
      bidderId: userId,
      bidderName: userName,
      value: bidValue,
    };
    firestore.collection(`room/${roomId}/issues/${issueId}/bids`).add(bid);
  };

  return (
    <BidContext.Provider value={{
      bidIssue,
      bids,
    }}>
      {children}
    </BidContext.Provider>
  );
}

const Container = ({ children, issueId }) => {
  const { room } = useContext(RoomContext);
  const { user } = useContext(UserContext);

  const userName = (user) ? user.displayName : null;
  const userId = (user) ? user.id : null;

  // TODO: client side record of bid is lost if user reloads page; need to fetch

  return (
    <BidProvider
      issueId={issueId}
      roomId={(room) ? room.id : ''}
      userId={userId}
      userName={userName}
    >
      {children}
    </BidProvider>
  );
};

export default Container;
