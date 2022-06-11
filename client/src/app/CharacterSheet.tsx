import { useState } from 'react';
import { FlexBox } from '../shared/components/layout/FlexBox';
import { SizedBox } from '../shared/components/layout/SizedBox';
import { TextLikeInput } from '../shared/components/TextLikeInput';
import { getDefaultColors } from '../shared/constants/colors';
import unknownCharacter from '../shared/images/unknown_character.webm';

const defaultColors = getDefaultColors();
const defaultInputPadding = '5px 10px';

const StatBar = () => {
  const maxLength = 5;

  return (
    <FlexBox width="100%">
      <TextLikeInput padding={defaultInputPadding} maxLength={maxLength} />
      <SizedBox width="20px" />
      <TextLikeInput padding={defaultInputPadding} maxLength={maxLength} />
    </FlexBox>
  );
};

const Attribute = () => {
  return (
    <FlexBox width="100%">
      <TextLikeInput padding={defaultInputPadding} width="15%" maxLength={3} />
      <SizedBox width="20px" />
      <TextLikeInput
        padding={defaultInputPadding}
        width="85%"
        paragraph
        text="Testando"
      />
    </FlexBox>
  );
};

const CharacterImage = () => {
  const [hover, setHover] = useState(false);

  return (
    <video
      style={{
        borderRadius: '100vmax',
        border: hover ? '5px solid white' : 'none',
        transition: 'all 1s',
      }}
      width="240"
      height="240"
      autoPlay
      muted
      loop
      src={unknownCharacter}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export const CharacterSheet = () => {
  return (
    <form onChange={e => console.log(e.target)}>
      <FlexBox
        width="400px"
        height="100%"
        direction="column"
        mainAlign="center"
        crossAlign="center"
        backgroundColor={defaultColors.dark}
        padding="20px"
      >
        <TextLikeInput padding="10px 20px" textSize="1.1em" maxLength={40} />
        <SizedBox height="20px" />
        <CharacterImage />
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
    </form>
  );
};
