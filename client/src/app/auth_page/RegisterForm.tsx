import { Link } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';

export const RegisterForm = () => {
  return (
    <form>
      <p>
        It{"'"}s time to play! Log in or create an account to enter the game.
      </p>
      <TextLikeInput placeholder="Username" />
      <TextLikeInput placeholder="E-mail" type="email" />
      <TextLikeInput placeholder="Password" type="password" />
      <TextLikeInput placeholder="Confirm Password" type="password" />
      <Button text="Register" type="submit" />
      <div>
        <Link to="/auth/login">Log in</Link>
        <Link to="/auth/reset">Reset Password</Link>
      </div>
    </form>
  );
};
