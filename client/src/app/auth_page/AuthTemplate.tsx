import { Outlet } from 'react-router-dom';
import classes from './AuthTemplate.module.css';

export const AuthTemplate = () => {
  return (
    <div className={classes.auth_template}>
      <div className={classes.form_container}>
        <Outlet />
      </div>
    </div>
  );
};
