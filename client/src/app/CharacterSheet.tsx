import { TextLikeInput } from '../shared/components/TextLikeInput';
import unknownCharacter from '../shared/images/unknown_character.webm';
import { Attribute } from './Attribute';
import classes from './CharacterSheet.module.css';
import { StatBar } from './StatBar';

export const CharacterSheet = () => {
  return (
    <form
      className={classes.character_sheet}
      onChange={e => console.log(e.target)}
    >
      <TextLikeInput
        className={classes.character_name}
        maxLength={32}
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
      <StatBar name="Health" color="red" />
      <StatBar name="Mana" color="blue" />
      <StatBar name="Stamina" color="yellow" />
      <div className={classes.stat_bars_and_attributes_gap} />
      <Attribute name="Strength" />
      <Attribute name="Intelligence" />
      <Attribute name="Agility" />
      <Attribute name="Vitality" />
    </form>
  );
};
