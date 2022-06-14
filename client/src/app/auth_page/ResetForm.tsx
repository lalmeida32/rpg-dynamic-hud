import { Link } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';

export const ResetForm = () => {
  return (
    <form>
      <p>Enter your e-mail to receive a recovery link.</p>
      <TextLikeInput placeholder="E-mail" />
      <Button text="Reset" />
      <div>
        <Link to="/auth/login">Log in</Link>
        <Link to="/auth/register">Register</Link>
      </div>
    </form>
  );
};
