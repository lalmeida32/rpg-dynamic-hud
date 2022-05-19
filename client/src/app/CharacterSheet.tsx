import { FlexBox } from '../shared/components/layout/FlexBox';
import { SizedBox } from '../shared/components/layout/SizedBox';
import { TextLikeInput } from '../shared/components/TextLikeInput';
import { getDefaultColors } from '../shared/constants/colors';

const colors = getDefaultColors();

export const CharacterSheet = () => {
  return (
    <FlexBox
      width="400px"
      height="100%"
      direction="column"
      mainAlign="center"
      crossAlign="center"
      backgroundColor={colors.dark}
      padding="20px"
    >
      <TextLikeInput />
      <SizedBox height="60px" />
      <FlexBox width="100%">
        <TextLikeInput />
        <SizedBox width="20px" />
        <TextLikeInput />
      </FlexBox>
    </FlexBox>
  );
};
