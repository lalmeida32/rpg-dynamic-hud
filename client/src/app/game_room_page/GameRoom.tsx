import { CharacterSheet } from './character_sheet/CharacterSheet';
import classes from './GameRoom.module.css';
import { GameHud } from './game_hud/GameHud';
import { DiceChooser } from './DiceChooser';

export const GameRoom = () => {
  return (
    <div className={classes.game_room}>
      <CharacterSheet />
      <div className={classes.game_hud_and_dice_chooser}>
        <GameHud />
        <DiceChooser />
      </div>
    </div>
  );
};
