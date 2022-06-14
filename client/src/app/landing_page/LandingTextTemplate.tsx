import classes from './LandingTextTemplate.module.css';
import dragon from 'shared/images/dragon.svg';
import { Outlet } from 'react-router-dom';

export const LandingTextTemplate: React.FC = () => {
  return (
    <div className={classes.landing_text_template}>
      <img src={dragon} />
      <div className={classes.landing_text_container}>
        <Outlet />
      </div>
    </div>
  );
};
