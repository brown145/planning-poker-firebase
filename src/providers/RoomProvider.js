import React, { useState, useEffect, createContext } from 'react';
import firebase, { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utility/collectIdsAndDocs';

export const RoomContext = createContext({ room: null });

const RoomProvider = ({ children, roomId }) => {
  const [room, setRoom] = useState(null);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const getOrCreateRoom = async () => {
      const roomRef = await firestore.doc(`room/${roomId}`);
      const snapshot = await roomRef.get();

      if (!snapshot.exists) {
        const room = {
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        roomRef.set(room);
      }

      await roomRef.onSnapshot(snapshot => {
        setRoom(collectIdsAndDocs(snapshot));
      });
    }
    getOrCreateRoom();
  }, [roomId]);

  useEffect(() => {
    return firestore.collection(`room/${roomId}/issues`).onSnapshot(snapshot => {
      setIssues(snapshot.docs.map(collectIdsAndDocs));
    });
  }, [roomId]);

  const addIssue = ({ name }) => {
    const issue = {
      name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), // also set by cloud function
      status: 'pending'  // also set by cloud function
    };

    firestore.collection(`room/${roomId}/issues`).add(issue);
  };

  const updateIssueStatus = ({ issueId, status }) => {
    const issueRef = firestore.collection(`room/${roomId}/issues`).doc(issueId);
    issueRef.update({ status });
  };

  const startIssue = ({ id }) =>
    updateIssueStatus({ issueId: id, status: 'active' });

  const removeIssue = ({ id }) =>
    updateIssueStatus({ issueId: id, status: 'removed' });

  const closeIssue = ({ id }) =>
    updateIssueStatus({ issueId: id, status: 'inactive' });

  return (
    <RoomContext.Provider value={{
      addIssue,
      closeIssue,
      issues,
      removeIssue,
      room,
      startIssue,
    }}>
      {children}
    </RoomContext.Provider>
  );
}

export default RoomProvider;
