import { getDefaultColors } from '../constants/colors';

const colors = getDefaultColors();

interface ITextLikeInputProps {
  padding: string;
}

export const TextLikeInput: React.FC<ITextLikeInputProps> = props => {
  return (
    <input
      style={{
        border: 'none',
        borderRadius: '100vmax',
        background: colors.darker,
        color: colors.white,
        padding: props.padding,
      }}
    />
  );
};
