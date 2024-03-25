import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loginUser, createUser } from '../../reducers/userReducer';

function LoginForm() {
  const [formInput, setFormInput] = useState({
    name: '',
    password: '',
  });

  // For dispatching action
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (action) => {
    // Distinguish button click
    if (action === 'login') {
      dispatch(loginUser(formInput));
    } else {
      dispatch(createUser(formInput));
    }
    setFormInput({
      name: '',
      password: '',
    });
  };

  return (
    <div className="login-form-container">
      <h1>Task Manager App</h1>
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
    </div>
  );
}

export default LoginForm;
