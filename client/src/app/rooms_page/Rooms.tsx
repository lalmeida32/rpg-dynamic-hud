import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import gear from 'shared/images/gear.svg';
import classes from './Rooms.module.css';
import { RoomSelection } from './RoomSelection';

export const Rooms = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.rooms_container}>
      <div className={classes.rooms}>
        <img src={gear} />
        <p>Hello, Username</p>
        <div className={classes.header_buttons}>
          <form className={classes.search_form}>
            <TextLikeInput type="text" />
            <Button text="Search" type="submit" />
          </form>
          <Button className={classes.create_room_button} text="Create room" />
        </div>
        <div className={classes.room_pagination}>
          <RoomSelection page={1} />
          <div className={classes.page_selection}>
            <Button text="<<" onClick={() => navigate('/auth/login')} />
            <Button text="<" />
            <p>Page 1</p>
            <Button text=">" />
            <Button text=">>" />
          </div>
        </div>
      </div>
    </div>
  );
};
