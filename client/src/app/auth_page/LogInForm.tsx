import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { DefaultAlertContent } from 'shared/components/DefaultAlertContent';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { services } from 'shared/services/services';

export const LogInForm = () => {
  /* STATE */
  const userLogin = useContext(UserLoginContext);
  const currentAlert = useContext(CurrentAlertContext);

  /* LOGIC */
  const handleForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const userId = target['userId'].value;
      const password = target['password'].value;

      try {
        const [username, token] = await services.auth.logIn(userId, password);
        userLogin.login(username, token);
      } catch (e) {
        if (e instanceof Error) {
          currentAlert.setAlert(<DefaultAlertContent text={e.message} error />);
        }
      }
    },
    [currentAlert, userLogin]
  );

  /* VIEW */
  return (
    <form onSubmit={handleForm}>
      <p>
        It{"'"}s time to play! Log in or create an account to enter the game.
      </p>
      <TextLikeInput placeholder="Username/E-mail" name="userId" />
      <TextLikeInput placeholder="Password" type="password" name="password" />
      <Button text="Log in" type="submit" />

      <div>
        <Link to="/auth/register">Register</Link>
        <Link to="/auth/reset">Reset Password</Link>
      </div>
    </form>
  );
};
