import { TextLikeInput } from 'shared/components/TextLikeInput';
import { Attribute } from './Attribute';
import { CharacterImage } from './CharacterImage';
import classes from './CharacterSheet.module.css';
import { StatBar } from './StatBar';

export const CharacterSheet = () => {
  return (
    <div className={classes.character_sheet_container}>
      <form
        className={classes.character_sheet}
        onChange={e => console.log(e.target)}
      >
        <TextLikeInput
          className={classes.character_name}
          maxLength={32}
          placeholder="Character Name"
        />
        <CharacterImage />
        <StatBar name="Health" color="red" />
        <StatBar name="Mana" color="blue" />
        <StatBar name="Stamina" color="yellow" />
        <div className={classes.stat_bars_and_attributes_gap} />
        <Attribute name="Strength" />
        <Attribute name="Intelligence" />
        <Attribute name="Agility" />
        <Attribute name="Vitality" />
      </form>
    </div>
  );
};
