import { CharacterSheet } from './character_sheet/CharacterSheet';
import classes from './GameRoom.module.css';
import { GameHud } from './game_hud/GameHud';
import { DiceChooser } from './DiceChooser';
import door from 'shared/images/door.svg';
import gear from 'shared/images/gear.svg';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { RoomConfigAlertContent } from 'app/rooms_page/RoomConfigAlertContent';
import { GameSocketContext } from 'shared/contexts/GameSocket';

export const GameRoom = () => {
  const navigate = useNavigate();
  const currentAlert = useContext(CurrentAlertContext);
  const params = useParams();
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const gameSocket = useContext(GameSocketContext);

  useEffect(() => {
    gameSocket.connect();
  }, [gameSocket]);

  useEffect(() => {
    setRoomCode(params.code ? params.code : null);
  }, [params]);

  return (
    <div className={classes.game_room}>
      {roomCode !== null ? (
        <React.Fragment>
          <img
            src={door}
            className={classes.leave_button}
            onClick={() => {
              gameSocket.disconnect();
              navigate('/rooms/');
            }}
          />
          <img
            src={gear}
            className={classes.config_button}
            onClick={() =>
              currentAlert.setAlert(
                <RoomConfigAlertContent uniqueCode={roomCode} />
              )
            }
          />
          <CharacterSheet />
          <div className={classes.game_hud_and_dice_chooser}>
            <GameHud />
            <DiceChooser />
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};
