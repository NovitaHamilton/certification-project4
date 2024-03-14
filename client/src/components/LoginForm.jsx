import { useState } from 'react';
import Button from './common/Button';

function LoginForm({ user }) {
  const [formInput, setFormInput] = useState({
    name: '',
    password: '',
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (action) => {
    const user = formInput;
    console.log('Action:', action);
    if (action === 'login') {
      handleLogin(user);
    } else {
      handleSignUp(user);
    }
  };

  const handleSignUp = () => {};
  const handleLogin = () => {};
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
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Username:
            <input
              name="name"
              type="text"
              placeholder="Enter username"
              value={formInput.name}
              onChange={handleInputChange}
            ></input>{' '}
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={formInput.password}
              onChange={handleInputChange}
            ></input>
          </label>
          <div className="login-signup-buttons">
            <Button type="submit" onClick={() => handleSubmit('login')}>
              Login
            </Button>
            <Button type="submit" onClick={() => handleSubmit('signup')}>
              Sign Up
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
