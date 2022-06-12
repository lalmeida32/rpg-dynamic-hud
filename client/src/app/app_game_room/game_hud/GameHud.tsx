import { CharacterBlock } from './CharacterBlock';
import classes from './GameHud.module.css';

export const GameHud = () => {
  return (
    <div className={classes.game_hud_container}>
      <div className={classes.game_hud}>
        <CharacterBlock />
        <CharacterBlock />
        <CharacterBlock />
        <CharacterBlock />
        <CharacterBlock />
      </div>
    </div>
  );
};
