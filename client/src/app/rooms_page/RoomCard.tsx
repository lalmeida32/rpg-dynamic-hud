import classes from './RoomCard.module.css';
import locked from 'shared/images/locked.svg';
import unlocked from 'shared/images/unlocked.svg';
import closed_book from 'shared/images/closed_book.svg';
import { Button } from 'shared/components/Button';
import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { useContext } from 'react';

interface IRoomCardProps {
  info: IRoomCardModel;
}

export const RoomCard: React.FC<IRoomCardProps> = props => {
  const userLogin = useContext(UserLoginContext);

  return (
    <div className={classes.room_card}>
      <div className={classes.card_buttons}>
        {props.info.owner === userLogin.username ? (
          props.info.opened ? (
            <img src={unlocked} />
          ) : (
            <img src={locked} />
          )
        ) : null}
        <img src={closed_book} />
      </div>
      <p>{props.info.name}</p>
      <p>#{props.info.uniqueCode}</p>
      <p>Owned by @{props.info.owner}</p>
      <Button text="Enter" disabled={!props.info.opened} />
    </div>
  );
};
