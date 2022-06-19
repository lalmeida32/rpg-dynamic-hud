import { CharacterSheet } from './character_sheet/CharacterSheet';
import classes from './GameRoom.module.css';
import { GameHud } from './game_hud/GameHud';
import { DiceChooser } from './DiceChooser';
import { React } from 'react'
import { Room, getRoomById } from 'model/Room'

export 
class GameRoom extends React.Components {

    constructor(props) {
        super(props);
        const room = getRoomById(props.id);
        this.state = {
            players: room.getPlayers(),
            name: room.getName(),
            priv: room.isPrivate(),
            maxPlayers: room.maxPlayers,
            owner: room.getOwner()
        };
    }

    render() {
        return (
            <div className={classes.game_room}>
              <CharacterSheet />
              <div className={classes.game_hud_and_dice_chooser}>
                <GameHud />
                <DiceChooser />
              </div>
            </div>
      );
      
    }
};
