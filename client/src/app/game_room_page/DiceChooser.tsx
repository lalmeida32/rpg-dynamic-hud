import { Button } from 'shared/components/Button';
import classes from './DiceChooser.module.css';

export const DiceChooser = () => {
  return (
    <div className={classes.dice_chooser}>
      <Button text="d6" />
      <Button text="d8" />
      <Button text="d12" />
      <Button text="d20" />
    </div>
  );
};
