import { CharacterSheet } from './character_sheet/CharacterSheet';
import classes from './GameRoom.module.css';
import { GameHud } from './game_hud/GameHud';
import { DiceChooser } from './DiceChooser';

import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import {
  GameSocketContext,
  IGameSocketState,
} from 'shared/contexts/GameSocket';
import { DefaultAlertContent } from 'shared/components/DefaultAlertContent';
import { UserLoginContext } from 'shared/contexts/UserLogin';

export const GameRoom = () => {
  const currentAlert = useContext(CurrentAlertContext);
  const params = useParams();
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const gameSocket = useContext(GameSocketContext);
  const userLogin = useContext(UserLoginContext);

  useEffect(() => {
    gameSocket.connect();
    gameSocket.socket?.emit('joinRoom', [userLogin.token, roomCode]);
    gameSocket.socket?.on('joinRoomResult', (result: IGameSocketState) => {
      gameSocket.setState(result);
    });
    gameSocket.socket?.on('disconnectResult', _ => gameSocket.setState(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameSocket.socket, userLogin, roomCode]);

  useEffect(() => {
    gameSocket.socket?.on('rollDiceResult', result =>
      currentAlert.setAlert(<DefaultAlertContent text={result} />)
    );
  }, [gameSocket, currentAlert]);

  useEffect(() => {
    setRoomCode(params.code ? params.code : null);
  }, [params]);

  return (
    <div className={classes.game_room}>
      {roomCode !== null ? (
        <React.Fragment>
          <CharacterSheet roomCode={roomCode} />
          <div className={classes.game_hud_and_dice_chooser}>
            <GameHud />
            <DiceChooser />
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};
