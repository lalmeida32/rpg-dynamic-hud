import { CharacterSheet } from './character_sheet/CharacterSheet';
import classes from './AppGameRoom.module.css';
import { GameHud } from './game_hud/GameHud';
import { DiceChooser } from './DiceChooser';

export const AppGameRoom = () => {
  return (
    <div className={classes.app_game_room}>
      <CharacterSheet />
      <div className={classes.game_hud_and_dice_chooser}>
        <GameHud />
        <DiceChooser />
      </div>
    </div>
  );
};
