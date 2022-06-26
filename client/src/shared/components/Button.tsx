import { useMemo } from 'react';
import classes from './Button.module.css';

interface IButtonProps {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  tabIndex?: number;
}

export const Button: React.FC<IButtonProps> = props => {
  const className = useMemo(
    () =>
      props.className ? `${classes.button} ${props.className}` : classes.button,
    [props.className]
  );
  return (
    <button
      type={props.type}
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
      tabIndex={props.tabIndex}
    >
      {props.text}
    </button>
  );
};
