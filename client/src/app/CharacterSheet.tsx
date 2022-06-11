import { TextLikeInput } from '../shared/components/TextLikeInput';
import unknownCharacter from '../shared/images/unknown_character.webm';
import classes from './CharacterSheet.module.css';

const StatBar = () => {
  const maxLength = 5;

  return (
    <div className={classes.stat_bar}>
      <TextLikeInput maxLength={maxLength} />
      <div className={classes.space_between_input} />
      <TextLikeInput maxLength={maxLength} />
    </div>
  );
};

const Attribute = () => {
  return (
    <div className={classes.attribute}>
      <TextLikeInput maxLength={3} />
      <div className={classes.space_between_input} />
      <TextLikeInput paragraph text="Testando" />
    </div>
  );
};

export const CharacterSheet = () => {
  return (
    <form
      className={classes.character_sheet}
      onChange={e => console.log(e.target)}
    >
      <TextLikeInput
        className={classes.character_name}
        maxLength={35}
        placeholder="Character Name"
      />
      <video
        className={classes.character_image}
        width="240"
        height="240"
        autoPlay
        muted
        loop
        src={unknownCharacter}
      />
      <StatBar />
      <StatBar />
      <Attribute />
      <Attribute />
      <Attribute />
    </form>
  );
};
