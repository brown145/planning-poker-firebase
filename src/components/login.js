import React, { useContext } from 'react';
import { signIn, signOut } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import { Button } from 'antd';

function Login() {
  const { user } = useContext(UserContext);
  const isAuthenticated = Boolean(user);

  const action = (isAuthenticated) ? signOut : signIn;
  const text = (isAuthenticated) ? 'Logout' : 'Login';

  return (
    <Button
      type="primary"
      ghost={isAuthenticated}
      onClick={action}
    >
      {text}
    </Button>
  );
}

export default Login;
