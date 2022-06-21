import React from 'react';
import classes from './DefaultAlertContent.module.css';

interface IDefaultAlertContent {
  text: string;
  error?: boolean;
  success?: boolean;
}

export const DefaultAlertContent: React.FC<IDefaultAlertContent> = props => {
  return (
    <React.Fragment>
      {props.error ? (
        <p className={classes.error + ' ' + classes.paragraph}>Error</p>
      ) : props.success ? (
        <p className={classes.success + ' ' + classes.paragraph}>Success</p>
      ) : null}
      <p className={classes.paragraph}>{props.text}</p>
    </React.Fragment>
  );
};
