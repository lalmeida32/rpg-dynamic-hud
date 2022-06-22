import { useContext, useEffect, useState } from 'react';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { services } from 'shared/services/services';
import { RoomCard } from './RoomCard';
import classes from './RoomSelection.module.css';

interface IRoomSelectionProps {
  page: number;
}

export const RoomSelection: React.FC<IRoomSelectionProps> = props => {
  /* STATE */
  const [rooms, setRooms] = useState<IRoomCardModel[] | null>(null);
  const userLogin = useContext(UserLoginContext);

  /* LOGIC */

  // Get room pagination data
  useEffect(() => {
    if (userLogin.username !== null)
      services.roomPagination
        .roomCardPagination(
          userLogin.token || '',
          userLogin.username,
          props.page
        )
        .then(rooms => {
          setRooms(rooms);
        });
  }, [props.page, userLogin]);

  /* VIEW */
  return (
    <div className={classes.room_selection}>
      {rooms?.map((room, index) => (
        <RoomCard key={index} info={room} />
      ))}
    </div>
  );
};
