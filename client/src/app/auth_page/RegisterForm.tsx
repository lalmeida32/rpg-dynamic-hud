import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { signup } from 'mocks/signup'


const sendUserData = (e, navigate) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        signup(username, email, password);
        navigate('/auth/login');
        alert('Account created with success!');
    } catch(err) {

        /*
         * Caso o signup falhe -- Usuário já existe, email invalido, etc...
         * */
        alert(err);
        console.log(err);
    }
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  return (
    <form>
      <p>
        It{"'"}s time to play! Log in or create an account to enter the game.
      </p>
      <TextLikeInput id="username" placeholder="Username" />
      <TextLikeInput id="email" placeholder="E-mail" type="email" />
      <TextLikeInput id="password" placeholder="Password" type="password" />
      <TextLikeInput id="repeat-passwd" placeholder="Confirm Password" type="password" />
      <Button onClick={(e) => sendUserData(e, navigate)} id="submit" text="Register" type="submit" />
      <div>
        <Link to="/auth/login">Log in</Link>
        <Link to="/auth/reset">Reset Password</Link>
      </div>
    </form>
  );
};
