import classes from './RoomCard.module.css';
import locked from 'shared/images/locked.svg';
import closed_book from 'shared/images/closed_book.svg';
import { Button } from 'shared/components/Button';

export const RoomCard = () => {
  return (
    <div className={classes.room_card}>
      <div className={classes.card_buttons}>
        <img src={locked} />
        <img src={closed_book} />
      </div>
      <p>MyRoom</p>
      <p>#65471</p>
      <p>Owned by Username</p>
      <Button text="Enter" />
    </div>
  );
};
