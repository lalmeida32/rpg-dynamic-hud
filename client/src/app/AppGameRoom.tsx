import { TextLikeInput } from '../shared/components/TextLikeInput';
import { getDefaultColors } from '../shared/constants/colors';

const colors = getDefaultColors();

export const AppGameRoom = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: colors.dark,
      }}
    >
      <TextLikeInput padding="10px 20px" />
    </div>
  );
};
