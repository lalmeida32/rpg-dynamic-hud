import classes from './Button.module.css';

interface IButtonProps {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<IButtonProps> = props => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
