import classes from './RoomCard.module.css';
import locked from 'shared/images/locked.svg';
import unlocked from 'shared/images/unlocked.svg';
import closed_book from 'shared/images/closed_book.svg';
import { Button } from 'shared/components/Button';
import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { services } from 'shared/services/services';
import { DefaultAlertContent } from 'shared/components/DefaultAlertContent';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';

interface IRoomCardProps {
  info: IRoomCardModel;
}

export const RoomCard: React.FC<IRoomCardProps> = props => {
  /* STATE */
  const userLogin = useContext(UserLoginContext);
  const currentAlert = useContext(CurrentAlertContext);
  const navigate = useNavigate();

  /* LOGIC */
  const handleLockRoom = useCallback(
    async (action: 'close' | 'open') => {
      if (userLogin.token === null || userLogin.username === null) return;
      const serviceFunction =
        action === 'close' ? services.room.closeRoom : services.room.openRoom;

      try {
        await serviceFunction(
          userLogin.token,
          userLogin.username,
          props.info.uniqueCode
        );
      } catch (e) {
        if (e instanceof Error)
          currentAlert.setAlert(<DefaultAlertContent text={e.message} error />);
      }
    },
    [userLogin, props.info.uniqueCode, currentAlert]
  );

  /* VIEW */
  return (
    <div className={classes.room_card}>
      <div className={classes.card_buttons}>
        {props.info.owner === userLogin.username ? (
          props.info.opened ? (
            <img src={unlocked} onClick={() => handleLockRoom('close')} />
          ) : (
            <img src={locked} onClick={() => handleLockRoom('open')} />
          )
        ) : null}
        <img src={closed_book} />
      </div>
      <p>{props.info.name}</p>
      <p>#{props.info.uniqueCode}</p>
      <p>Owned by @{props.info.owner}</p>
      <Button
        text="Enter"
        disabled={!props.info.opened}
        onClick={() => navigate('/room/')}
      />
    </div>
  );
};
