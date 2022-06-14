import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import classes from './Rooms.module.css';

export const Rooms = () => {
  return (
    <div className={classes.rooms_container}>
      <div className={classes.rooms}>
        <p>Hello, Username</p>
        <div>
          <form>
            <TextLikeInput type="text" />
            <Button text="Search" type="submit" />
          </form>
          <Button text="Create room" />
        </div>
        <div>C</div>
      </div>
    </div>
  );
};
