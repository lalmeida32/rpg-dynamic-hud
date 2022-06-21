import { useContext, useEffect, useState } from 'react';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { serverService } from 'shared/services/serverService';
import { RoomCard } from './RoomCard';
import classes from './RoomSelection.module.css';

interface IRoomSelectionProps {
  page: number;
}

export const RoomSelection: React.FC<IRoomSelectionProps> = props => {
  const [rooms, setRooms] = useState<IRoomCardModel[] | null>(null);
  const userLogin = useContext(UserLoginContext);

  useEffect(() => {
    if (userLogin.username !== null)
      serverService
        .roomCardPagination(userLogin.username, props.page)
        .then(rooms => {
          setRooms(rooms);
        });
  }, [props.page, userLogin]);

  return (
    <div className={classes.room_selection}>
      {rooms?.map((room, index) => (
        <RoomCard key={index} info={room} />
      ))}
    </div>
  );
};
