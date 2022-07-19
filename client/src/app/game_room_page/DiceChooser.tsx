import { useContext, useEffect, useState } from 'react';
import { Button } from 'shared/components/Button';
import { DefaultAlertContent } from 'shared/components/DefaultAlertContent';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { GameSocketContext } from 'shared/contexts/GameSocket';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { IRoomGetModel } from 'shared/models/IRoomGetModel';
import { services } from 'shared/services/services';
import classes from './DiceChooser.module.css';

interface IDiceChooserProps {
  uniqueCode: string;
}

export const DiceChooser : React.FC<IDiceChooserProps> = (props) => {
  const gameSocket = useContext(GameSocketContext);
  const userLogin = useContext(UserLoginContext);
  const [roomData, setRoomData] = useState<IRoomGetModel | null>(null);
  const currentAlert = useContext(CurrentAlertContext);

  useEffect(() => {
    if (userLogin.token === null || userLogin.username === null) return;
    services.room
      .getRoom(userLogin.token, userLogin.username, props.uniqueCode)
      .then(room => {
        if (userLogin.username === null) return;
        setRoomData(room);
      })
      .catch(e => {
        if (e instanceof Error)
          currentAlert.setAlert(<DefaultAlertContent text={e.message} error />);
      });
      
  }, [userLogin.token, userLogin.username, props.uniqueCode, currentAlert]);

  return (
    <div className={classes.dice_chooser}>
      {
        roomData?.dices.map((v, index) => <Button
          text={'d' + v.toString()}
          onClick={() => gameSocket.socket?.emit('rollDice', [userLogin.token, props.uniqueCode, v])}
          key={index}
        />)
      }
    </div>
  );
};
