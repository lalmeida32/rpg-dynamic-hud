import { useContext } from 'react';
import { Button } from 'shared/components/Button';
import { GameSocketContext } from 'shared/contexts/GameSocket';
import classes from './DiceChooser.module.css';

export const DiceChooser = () => {
  const gameSocket = useContext(GameSocketContext);

  return (
    <div className={classes.dice_chooser}>
      <Button
        text="d6"
        onClick={() => gameSocket.socket?.emit('rollDice', 6)}
      />
      <Button text="d8" />
      <Button text="d12" />
      <Button text="d20" />
    </div>
  );
};
