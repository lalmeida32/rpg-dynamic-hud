import classes from './AppRoom.module.css';
import { CharacterSheet } from './CharacterSheet';

export const AppRoom = () => {
  return (
    <div className={classes.entry}>
      <CharacterSheet></CharacterSheet>
    </div>
  );
};
