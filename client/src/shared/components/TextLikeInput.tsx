import { getDefaultColors } from '../constants/colors';

const colors = getDefaultColors();

interface ITextLikeInputProps {
  padding?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const TextLikeInput: React.FC<ITextLikeInputProps> = props => {
  return (
    <input
      style={{
        border: 'none',
        borderRadius: '100vmax',
        background: props.backgroundColor || colors.darker,
        color: props.textColor || colors.white,
        width: '100%',
        padding: props.padding || '10px 20px',
      }}
    />
  );
};
