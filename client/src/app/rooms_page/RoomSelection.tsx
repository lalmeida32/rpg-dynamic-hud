import { useEffect, useState } from 'react';
import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { serverService } from 'shared/services/serverService';
import { RoomCard } from './RoomCard';
import classes from './RoomSelection.module.css';

interface IRoomSelectionProps {
  page: number;
}

export const RoomSelection: React.FC<IRoomSelectionProps> = props => {
  const [rooms, setRooms] = useState<IRoomCardModel[] | null>(null);

  useEffect(() => {
    serverService.roomCardPagination('', props.page).then(rooms => {
      setRooms(rooms);
    });
  }, [props.page]);

  return (
    <div className={classes.room_selection}>
      {rooms?.map((room, index) => (
        <RoomCard key={index} info={room} />
      ))}
    </div>
  );
};
