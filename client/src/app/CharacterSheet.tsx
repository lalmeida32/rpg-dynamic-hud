import { FlexBox } from '../shared/components/layout/FlexBox';
import { SizedBox } from '../shared/components/layout/SizedBox';
import { TextLikeInput } from '../shared/components/TextLikeInput';
import { getDefaultColors } from '../shared/constants/colors';
import unknownCharacter from '../shared/images/unknown_character.webm';

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
      <video width="320" height="240" autoPlay loop src={unknownCharacter} />
      <FlexBox width="100%">
        <TextLikeInput />
        <SizedBox width="20px" />
        <TextLikeInput />
      </FlexBox>
    </FlexBox>
  );
};
