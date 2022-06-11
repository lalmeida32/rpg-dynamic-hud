import { CharacterSheet } from './CharacterSheet';
import classes from './AppGameRoom.module.css';

export const AppGameRoom = () => {
  return (
    <div className={classes.app_game_room}>
      <CharacterSheet />
    </div>
  );
};
