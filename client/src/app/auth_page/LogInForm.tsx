import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { serverService } from 'shared/services/serverService';

export const LogInForm = () => {
  const userLogin = useContext(UserLoginContext);

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const user = target['user'].value;
        const password = target['password'].value;
        userLogin.login(await serverService.logIn(user, password));
      }}
    >
      <p>
        It{"'"}s time to play! Log in or create an account to enter the game.
      </p>
      <TextLikeInput placeholder="Username/E-mail" name="user" />
      <TextLikeInput placeholder="Password" type="password" name="password" />
      <Button text="Log in" type="submit" />

      <div>
        <Link to="/auth/register">Register</Link>
        <Link to="/auth/reset">Reset Password</Link>
      </div>
    </form>
  );
};
