import { FlexBox } from '../shared/components/layout/FlexBox';
import { SizedBox } from '../shared/components/layout/SizedBox';
import { TextLikeInput } from '../shared/components/TextLikeInput';
import { getDefaultColors } from '../shared/constants/colors';
import unknownCharacter from '../shared/images/unknown_character.webm';

const colors = getDefaultColors();

interface CustomTextLikeInputProps {
  width?: string;
  paragraph?: boolean;
  text?: string;
  type?: React.HTMLInputTypeAttribute;
}

const CustomTextLikeInput: React.FC<CustomTextLikeInputProps> = props => {
  return (
    <TextLikeInput
      padding="5px 10px"
      width={props.width}
      paragraph={props.paragraph}
      text={props.text}
      type={props.type}
    />
  );
};

const StatBar = () => {
  return (
    <FlexBox width="100%">
      <CustomTextLikeInput />
      <SizedBox width="20px" />
      <CustomTextLikeInput />
    </FlexBox>
  );
};

const Attribute = () => {
  return (
    <FlexBox width="100%">
      <CustomTextLikeInput width="15%" type="number" />
      <SizedBox width="20px" />
      <CustomTextLikeInput width="85%" paragraph text="Testando" />
    </FlexBox>
  );
};

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
      <CustomTextLikeInput />
      <SizedBox height="20px" />
      <video
        width="320"
        height="240"
        autoPlay
        muted
        loop
        src={unknownCharacter}
      />
      <SizedBox height="20px" />
      <StatBar />
      <SizedBox height="5px" />
      <StatBar />
      <SizedBox height="10px" />
      <Attribute />
      <SizedBox height="5px" />
      <Attribute />
      <SizedBox height="5px" />
      <Attribute />
    </FlexBox>
  );
};
