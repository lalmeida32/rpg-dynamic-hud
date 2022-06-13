import { Link } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { LandingTemplate } from './LandingTemplate';
import classes from './NotFound.module.css';

export const NotFound = () => {
  return (
    <LandingTemplate className={classes.not_found}>
      <p>The required page was not found.</p>
      <Link to="/">
        <Button text="Go to the home page" />
      </Link>
    </LandingTemplate>
  );
};
