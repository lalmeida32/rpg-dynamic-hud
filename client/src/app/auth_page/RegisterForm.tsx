import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { DefaultAlertContent } from 'shared/components/DefaultAlertContent';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { services } from 'shared/services/services';

export const RegisterForm = () => {
  const currentAlert = useContext(CurrentAlertContext);

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const username = target['username'].value;
        const email = target['email'].value;
        const password = target['password'].value;
        const confirmPassword = target['confirmPassword'].value;
        if (password !== confirmPassword)
          return currentAlert.setAlert(
            <DefaultAlertContent
              error
              text="Passowrd field does not match with confirm password field."
            />
          );

        try {
          await services.user.registerUser({
            email,
            password,
            username,
          });
          currentAlert.setAlert(
            <DefaultAlertContent success text="User created successfully." />
          );
        } catch (e) {
          if (e instanceof Error) {
            currentAlert.setAlert(
              <DefaultAlertContent error text={e.message} />
            );
          }
        }
      }}
    >
      <p>
        It{"'"}s time to play! Log in or create an account to enter the game.
      </p>
      <TextLikeInput placeholder="Username" name="username" />
      <TextLikeInput placeholder="E-mail" type="email" name="email" />
      <TextLikeInput placeholder="Password" type="password" name="password" />
      <TextLikeInput
        placeholder="Confirm Password"
        type="password"
        name="confirmPassword"
      />
      <Button text="Register" type="submit" />
      <div>
        <Link to="/auth/login">Log in</Link>
        <Link to="/auth/reset">Reset Password</Link>
      </div>
    </form>
  );
};
