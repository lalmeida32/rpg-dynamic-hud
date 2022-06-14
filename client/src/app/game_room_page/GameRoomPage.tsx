import { CharacterSheet } from './character_sheet/CharacterSheet';
import classes from './GameRoomPage.module.css';
import { GameHud } from './game_hud/GameHud';
import { DiceChooser } from './DiceChooser';

export const GameRoomPage = () => {
  return (
    <div className={classes.game_room_page}>
      <CharacterSheet />
      <div className={classes.game_hud_and_dice_chooser}>
        <GameHud />
        <DiceChooser />
      </div>
    </div>
  );
};
