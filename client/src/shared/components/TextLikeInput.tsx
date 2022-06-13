import classes from './TextLikeInput.module.css';

interface ITextLikeInputProps {
  paragraph?: boolean;
  text?: string;
  type?: React.HTMLInputTypeAttribute;
  maxLength?: number;
  className?: string;
  placeholder?: string;
}

export const TextLikeInput: React.FC<ITextLikeInputProps> = props => {
  const className = `${classes.text_like_input} ${props.className}`;

  if (props.paragraph) return <p className={className}>{props.text}</p>;

  return (
    <input
      className={className}
      type={props.type || 'text'}
      maxLength={props.maxLength}
      placeholder={props.placeholder}
    />
  );
};
