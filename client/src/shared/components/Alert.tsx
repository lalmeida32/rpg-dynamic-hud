import { useContext } from 'react';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import classes from './Alert.module.css';
import close from 'shared/images/close.svg';

interface IAlertProps {
  children?: React.ReactNode;
}

export const Alert: React.FC<IAlertProps> = props => {
  const currentAlert = useContext(CurrentAlertContext);
  return (
    <div className={classes.alert_container}>
      <div className={classes.alert}>
        {props.children}
        <img
          className={classes.close_button}
          src={close}
          onClick={() => currentAlert.closeAlert()}
        />
      </div>
    </div>
  );
};
