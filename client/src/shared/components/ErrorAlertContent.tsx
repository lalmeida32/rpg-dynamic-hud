import React from 'react';
import classes from './ErrorAlertContent.module.css';

interface IErrorAlertContent {
  text: string;
}

export const ErrorAlertContent: React.FC<IErrorAlertContent> = props => {
  return (
    <React.Fragment>
      <p className={classes.error + ' ' + classes.paragraph}>Error</p>
      <p className={classes.paragraph}>{props.text}</p>
    </React.Fragment>
  );
};
