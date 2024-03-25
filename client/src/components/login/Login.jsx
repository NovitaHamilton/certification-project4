import { useSelector, useDispatch } from 'react-redux';
import Button from '../common/Button';
import LoginForm from './LoginForm';
import { logoutUser } from '../../reducers/userReducer';

function Login() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <div>
      {user ? (
        <div className="logged-in">
          <p>
            <strong>{user.name}</strong>
          </p>
          <Button onClick={() => dispatch(logoutUser())}>Log out</Button>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default Login;
