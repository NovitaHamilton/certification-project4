import { useState } from 'react';
import Button from '../common/Button';
import LoginForm from './LoginForm';

function Login({ user }) {
  const handleLogout = () => {};
  return (
    <div>
      {user ? (
        <div className="logged-in">
          <p>
            <strong>{user.name}</strong> is logged in
          </p>
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default Login;
