import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { RoomCard } from './RoomCard';
import classes from './RoomSelection.module.css';

interface IRoomSelectionProps {
  cards: IRoomCardModel[];
}

export const RoomSelection: React.FC<IRoomSelectionProps> = props => {
  /* VIEW */
  return (
    <div className={classes.room_selection}>
      {props.cards.map((room, index) => (
        <RoomCard key={index} info={room} />
      ))}
    </div>
  );
};
