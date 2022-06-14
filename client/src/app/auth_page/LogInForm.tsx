import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';

export const LogInForm = () => {
  const navigate = useNavigate();
  return (
    <form>
      <p>
        It{"'"}s time to play! Log in or create an account to enter the game.
      </p>
      <TextLikeInput placeholder="Username/E-mail" />
      <TextLikeInput placeholder="Password" type="password" />
      <Button text="Log in" onClick={() => navigate('/rooms')} />

      <div>
        <Link to="/auth/register">Register</Link>
        <Link to="/auth/reset">Reset Password</Link>
      </div>
    </form>
  );
};
