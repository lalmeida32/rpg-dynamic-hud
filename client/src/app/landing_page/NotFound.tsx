import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import classes from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div className={classes.not_found}>
      <p>The required page was not found.</p>
      <Link to="/home">
        <Button text="Go to the home page" />
      </Link>
    </div>
  );
};
