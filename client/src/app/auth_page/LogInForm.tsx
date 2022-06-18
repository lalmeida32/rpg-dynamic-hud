import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { User } from 'model/User'

function submitPasswd(navigate) {
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = new User(username, username, password);
    user.auth();

    if (user.token)
        navigate('/rooms');

    else
        alert('Invalid username/password!!!');

}

export const LogInForm = () => {
  const navigate = useNavigate();

  return (
    <form>
      <p>
        It{"'"}s time to play! Log in or create an account to enter the game.
      </p>
      <TextLikeInput id="username" placeholder="Username/E-mail" />
      <TextLikeInput id="password" placeholder="Password" type="password" />
      <Button text="Log in" type="submit" onClick={() => submitPasswd(navigate)} />

      <div>
        <Link to="/auth/register">Register</Link>
        <Link to="/auth/reset">Reset Password</Link>
      </div>
    </form>
  );
};
