import classes from './Button.module.css';

interface IButtonProps {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<IButtonProps> = props => {
  return (
    <button
      type={props.type}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
