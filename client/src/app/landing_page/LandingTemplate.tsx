import { ReactNode } from 'react';
import classes from './LandingTemplate.module.css';
import logo from 'shared/images/game_die.svg';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/Button';

interface ILandingTemplateProps {
  children?: ReactNode;
  className?: string;
}

export const LandingTemplate: React.FC<ILandingTemplateProps> = props => {
  return (
    <div className={classes.landing_template}>
      <header>
        <div className={classes.left_buttons}>
          <Link to="/">
            <img className={classes.logo} src={logo} />
          </Link>
          <Link className={classes.about} to="/about">
            About
          </Link>
          <Link className={classes.contact} to="/contact">
            Contact
          </Link>
        </div>
        <div className={classes.right_buttons}>
          <Button text="Sign in"></Button>
          <Button text="Sign up"></Button>
        </div>
      </header>
      <main className={props.className}>{props.children}</main>
      <footer></footer>
    </div>
  );
};
