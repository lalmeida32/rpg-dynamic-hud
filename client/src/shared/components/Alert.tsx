import classes from './Alert.module.css';

interface IAlertProps {
  children?: React.ReactNode;
}

export const Alert: React.FC<IAlertProps> = props => {
  return (
    <div className={classes.alert_container}>
      <div className={classes.alert}>{props.children}</div>
    </div>
  );
};
