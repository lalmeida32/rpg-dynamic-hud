import { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { DefaultAlertContent } from 'shared/components/DefaultAlertContent';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { services } from 'shared/services/services';

export const ResetForm = () => {
  /* STATE */
  const currentAlert = useContext(CurrentAlertContext);

  /* LOGIC */
  const handleForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const email = target['email'].value;

      try {
        await services.email.sendResetPasswordEmail(email);
        currentAlert.setAlert(
          <DefaultAlertContent success text="E-mail sent successfully." />
        );
      } catch (e) {
        if (e instanceof Error) {
          currentAlert.setAlert(<DefaultAlertContent error text={e.message} />);
        }
      }
    },
    [currentAlert]
  );

  /* VIEW */
  return (
    <form onSubmit={handleForm}>
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
