import React, { useContext, useEffect, useState } from 'react';
import { DefaultAlertContent } from 'shared/components/DefaultAlertContent';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { IRoomGetModel } from 'shared/models/IRoomGetModel';
import { services } from 'shared/services/services';
import classes from './RoomConfigAlertContent.module.css';

interface IRoomConfigAlertContentProps {
  uniqueCode: string;
}

export const RoomConfigAlertContent: React.FC<
  IRoomConfigAlertContentProps
> = props => {
  const [getRoomModel, setGetRoomModel] = useState<IRoomGetModel | null>(null);

  const userLogin = useContext(UserLoginContext);
  const currentAlert = useContext(CurrentAlertContext);

  useEffect(() => {
    if (userLogin.token !== null && userLogin.username !== null)
      services.room
        .getRoom(userLogin.token, userLogin.username, props.uniqueCode)
        .then(room => {
          setGetRoomModel(room);
        })
        .catch(e => {
          if (e instanceof Error)
            currentAlert.setAlert(
              <DefaultAlertContent text={e.message} error />
            );
        });
  }, [userLogin.token, userLogin.username, currentAlert, props.uniqueCode]);

  return (
    <React.Fragment>
      {getRoomModel === null ? (
        <p className={classes.loading}>Loading...</p>
      ) : (
        <p>Fetched</p>
      )}
    </React.Fragment>
  );
};
