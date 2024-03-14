import Button from '../common/Button';

function LoginForm() {
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

  return (
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
  );
}

export default LoginForm;
