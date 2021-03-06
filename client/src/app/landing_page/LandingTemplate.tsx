import classes from './LandingTemplate.module.css';
import logo from 'shared/images/game_die.svg';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/Button';

export const LandingTemplate = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.landing_template}>
      <header>
        <div className={classes.left_buttons}>
          <Link to="/home">
            <img className={classes.logo} src={logo} />
          </Link>
          <Link className={classes.about} to="/home/about">
            About
          </Link>
          <Link className={classes.contact} to="/home/contact">
            Contact
          </Link>
        </div>
        <div className={classes.right_buttons}>
          <Button text="Log in" onClick={() => navigate('/auth')} />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
