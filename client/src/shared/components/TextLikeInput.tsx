import { useMemo } from 'react';
import classes from './TextLikeInput.module.css';

interface ITextLikeInputProps {
  paragraph?: boolean;
  text?: string;
  type?: React.HTMLInputTypeAttribute;
  maxLength?: number;
  className?: string;
  placeholder?: string;
  name?: string;
}

export const TextLikeInput: React.FC<ITextLikeInputProps> = props => {
  const className = useMemo(
    () =>
      props.className !== undefined
        ? `${classes.text_like_input} ${props.className}`
        : classes.text_like_input,
    [props.className]
  );

  if (props.paragraph) return <p className={className}>{props.text}</p>;

  return (
    <input
      className={className}
      type={props.type || 'text'}
      maxLength={props.maxLength}
      placeholder={props.placeholder}
      name={props.name}
      defaultValue={props.text}
    />
  );
};
