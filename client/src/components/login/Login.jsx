import { useSelector } from 'react-redux';
import Button from '../common/Button';
import LoginForm from './LoginForm';

function Login() {
  const user = useSelector((store) => store.user);
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
