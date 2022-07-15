import { RoomConfigAlertContent } from 'app/rooms_page/RoomConfigAlertContent';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultAlertContent } from 'shared/components/DefaultAlertContent';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { GameSocketContext } from 'shared/contexts/GameSocket';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { IRoomGetModel } from 'shared/models/IRoomGetModel';
import { services } from 'shared/services/services';
import { Attribute } from './Attribute';
import { CharacterImage } from './CharacterImage';
import classes from './CharacterSheet.module.css';
import { StatBar } from './StatBar';
import door from 'shared/images/door.svg';
import gear from 'shared/images/gear.svg';

interface ICharacterSheetProps {
  roomCode: string;
}

interface ICharacterSheetFormData {
  name?: string;
  statusBars?: { min: number; max: number }[];
  attributes?: number[];
}

export const CharacterSheet: React.FC<ICharacterSheetProps> = props => {
  const gameSocket = useContext(GameSocketContext);
  const userLogin = useContext(UserLoginContext);
  const currentAlert = useContext(CurrentAlertContext);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<IRoomGetModel | null>(null);
  const [formData, setFormData] = useState<ICharacterSheetFormData>({
    name: '',
    statusBars: [],
    attributes: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin.token === null || userLogin.username === null) return;
    services.room
      .getRoom(userLogin.token, userLogin.username, props.roomCode)
      .then(room => {
        if (userLogin.username === null) return;
        setRoomData(room);
        setIsOwner(room.owner === userLogin.username);
        setFormData({
          name: gameSocket.state?.[userLogin.username].name,
          statusBars: gameSocket.state?.[userLogin.username].statusBars.map(
            v => ({
              min: v.min,
              max: v.max,
            })
          ),
          attributes: gameSocket.state?.[userLogin.username].attributes,
        });
      })
      .catch(e => {
        if (e instanceof Error)
          currentAlert.setAlert(<DefaultAlertContent text={e.message} error />);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogin.token, userLogin.username, props.roomCode]);

  return (
    <React.Fragment>
      <img
        src={door}
        className={classes.leave_button}
        onClick={() => {
          gameSocket.disconnect();
          navigate('/rooms/');
        }}
      />
      {isOwner ? (
        <img
          src={gear}
          className={classes.config_button}
          onClick={() =>
            currentAlert.setAlert(
              <RoomConfigAlertContent uniqueCode={props.roomCode} />
            )
          }
        />
      ) : null}
      {isOwner ? null : (
        <div className={classes.character_sheet_container}>
          <form
            className={classes.character_sheet}
            onChange={e => console.log(e.target)}
          >
            <TextLikeInput
              className={classes.character_name}
              maxLength={32}
              placeholder="Character Name"
              text={formData.name}
            />
            <CharacterImage />
            {roomData?.statBars.map((v, index) => (
              <StatBar name={v[0]} color={v[1]} key={index} />
            ))}
            <div className={classes.stat_bars_and_attributes_gap} />
            {roomData?.attributes.map((v, index) => (
              <Attribute name={v} key={index} />
            ))}
          </form>
        </div>
      )}
    </React.Fragment>
  );
};
