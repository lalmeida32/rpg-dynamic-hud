import { getDefaultColors } from '../constants/colors';

const colors = getDefaultColors();

interface ITextLikeInputProps {
  padding?: string;
  backgroundColor?: string;
  textColor?: string;
  width?: string;
  paragraph?: boolean;
  text?: string;
  type?: React.HTMLInputTypeAttribute;
  maxLength?: number;
  textSize?: string;
}

export const TextLikeInput: React.FC<ITextLikeInputProps> = props => {
  const style: React.CSSProperties = {
    border: 'none',
    borderRadius: '100vmax',
    background: props.backgroundColor || colors.darker,
    color: props.textColor || colors.white,
    width: props.width || '100%',
    padding: props.padding || 0,
    textAlign: 'center',
    fontSize: props.textSize,
  };

  if (props.paragraph) return <p style={style}>{props.text}</p>;

  return (
    <input
      style={style}
      type={props.type || 'text'}
      maxLength={props.maxLength}
    />
  );
};
