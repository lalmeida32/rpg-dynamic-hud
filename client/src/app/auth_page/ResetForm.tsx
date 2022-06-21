import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { serverService } from 'shared/services/serverService';

export const ResetForm = () => {
  const currentAlert = useContext(CurrentAlertContext);

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const email = target['email'].value;

        try {
          await serverService.sendResetPasswordEmail(email);
          currentAlert.setAlert(<p>E-mail sent successfully.</p>);
        } catch (e) {
          if (e instanceof Error) {
            currentAlert.setAlert(<p>{e.message}</p>);
          }
        }
      }}
    >
      <p>Enter your e-mail to receive a recovery link.</p>
      <TextLikeInput placeholder="E-mail" type="email" name="email" />
      <Button text="Reset" type="submit" />
      <div>
        <Link to="/auth/login">Log in</Link>
        <Link to="/auth/register">Register</Link>
      </div>
    </form>
  );
};
