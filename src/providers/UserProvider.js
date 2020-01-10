import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    return auth.onAuthStateChanged((authResult) => {
      if (authResult) {
        const { uid: id, displayName } = authResult;
        setUser({ id, displayName });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
