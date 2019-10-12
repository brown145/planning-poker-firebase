import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    return auth.onAuthStateChanged(({ uid: id, displayName }) =>
      setUser({ id, displayName })
    );

    // return auth.onAuthStateChanged(({ uid: id, displayName }) => console.log('!!!', id, displayName))
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
