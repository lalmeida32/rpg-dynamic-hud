import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { userAuthenticate } from 'services/user'

function submitPasswd(e, navigate) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (userAuthenticate(username, password))
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
      <Button text="Log in" type="submit" onClick={(e) => submitPasswd(e, navigate)} />

      <div>
        <Link to="/auth/register">Register</Link>
        <Link to="/auth/reset">Reset Password</Link>
      </div>
    </form>
  );
};
