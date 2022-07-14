import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from 'shared/components/Button';
import { DefaultAlertContent } from 'shared/components/DefaultAlertContent';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { IRoomUpdateModel } from 'shared/models/IRoomUpdateModel';
import { services } from 'shared/services/services';
import { TStatBarColor } from 'shared/types/TStatBarColor';
import { ColorSelect } from './ColorSelect';
import classes from './RoomConfigAlertContent.module.css';

interface IRoomConfigAlertContentProps {
  uniqueCode: string;
}

interface IGetRoomModelIds {
  [key: number]: [string, TStatBarColor] | string;
}

export const RoomConfigAlertContent: React.FC<
  IRoomConfigAlertContentProps
> = props => {
  /* STATE */
  const [statBarIds, setStatBarIds] = useState<number[]>([]);
  const [attributeIds, setAttributeIds] = useState<number[]>([]);
  const [dieIds, setDieIds] = useState<number[]>([]);

  const [nextId, setNextId] = useState<number>(1);

  const userLogin = useContext(UserLoginContext);
  const currentAlert = useContext(CurrentAlertContext);

  const [getRoomModel, setGetRoomModel] = useState<IGetRoomModelIds | null>(
    null
  );
  const [getRoomName, setGetRoomName] = useState<string | null>(null);

  /* LOGIC */
  useEffect(() => {
    if (userLogin.token !== null && userLogin.username !== null)
      services.room
        .getRoom(userLogin.token, userLogin.username, props.uniqueCode)
        .then(room => {
          const obj: IGetRoomModelIds = {};
          let id = 0;
          const statBars: number[] = [];
          const attributes: number[] = [];
          const dice: number[] = [];

          for (const [index, statBar] of room.statBars.entries()) {
            if (index !== 0) statBars.push(id);
            obj[id] = [statBar[0], statBar[1]];
            id++;
          }

          for (const attribute of room.attributes) {
            attributes.push(id);
            obj[id] = attribute;
            id++;
          }

          for (const die of room.dices) {
            dice.push(id);
            obj[id] = `${die}`;
            id++;
          }

          setStatBarIds(statBars);
          setAttributeIds(attributes);
          setDieIds(dice);
          setNextId(id);
          setGetRoomModel(obj);
          setGetRoomName(room.name);
        })
        .catch(e => {
          if (e instanceof Error)
            currentAlert.setAlert(
              <DefaultAlertContent text={e.message} error />
            );
        });
  }, [userLogin.token, userLogin.username, currentAlert, props.uniqueCode]);

  const handleUpdateRoomForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;

      const model: IRoomUpdateModel = {
        name: target['roomName'].value,
        statBars: [
          [target['statBarNameId0'].value, target['statBarColorId0'].value],
          ...statBarIds.map<[string, TStatBarColor]>(id => {
            const statBarName = target[`statBarNameId${id}`].value;
            const statBarColor = target[`statBarColorId${id}`].value;
            return [statBarName, statBarColor];
          }),
        ],
        attributes: attributeIds.map(id => target[`attributeId${id}`].value),
        dices: dieIds.map(id => Number(target[`dieId${id}`].value)),
      };

      if (userLogin.token === null || userLogin.username === null) return;

      try {
        await services.room.updateRoom(
          userLogin.token,
          userLogin.username,
          props.uniqueCode,
          model
        );
        currentAlert.setAlert(
          <DefaultAlertContent success text="Room updated successfully." />
        );
      } catch (e) {
        if (e instanceof Error)
          currentAlert.setAlert(<DefaultAlertContent text={e.message} error />);
      }
    },
    [
      statBarIds,
      attributeIds,
      dieIds,
      currentAlert,
      userLogin,
      props.uniqueCode,
    ]
  );

  const handleRemoveButton = useCallback(
    (
      id: number,
      getState: number[],
      setFunc: React.Dispatch<React.SetStateAction<number[]>>,
      _: React.MouseEvent<HTMLButtonElement>
    ) => {
      setFunc(getState.filter(v => v !== id));
    },
    []
  );

  const handleAddButton = useCallback(
    (
      getState: number[],
      setFunc: React.Dispatch<React.SetStateAction<number[]>>,
      _: React.MouseEvent<HTMLButtonElement>
    ) => {
      const id = nextId;
      setNextId(nextId + 1);
      setFunc([...getState, id]);
    },
    [nextId]
  );

  /* VIEW */
  return (
    <React.Fragment>
      {getRoomModel === null ? (
        <p className={classes.loading}>Loading...</p>
      ) : (
        <React.Fragment>
          <h3 className={classes.title}>Room settings</h3>
          <form className={classes.form} onSubmit={handleUpdateRoomForm}>
            <h4 className={classes.section}>Room name</h4>
            <TextLikeInput
              className={classes.room_name_input}
              name="roomName"
              text={getRoomName !== null ? getRoomName : undefined}
            />
            {/* STAT BARS  */}
            <h4 className={classes.section}>Stat bars</h4>
            <div className={classes.stat_bar}>
              <ColorSelect
                name={`statBarColorId0`}
                dataChosen={
                  0 in getRoomModel
                    ? (getRoomModel[0][1] as TStatBarColor)
                    : undefined
                }
              />
              <TextLikeInput
                text={0 in getRoomModel ? getRoomModel[0][0] : 'Health'}
                name="statBarNameId0"
              />
            </div>
            {statBarIds.map(statBarId => (
              <div className={classes.stat_bar} key={statBarId}>
                <ColorSelect
                  name={`statBarColorId${statBarId}`}
                  dataChosen={
                    statBarId in getRoomModel
                      ? (getRoomModel[statBarId][1] as TStatBarColor)
                      : undefined
                  }
                />
                <TextLikeInput
                  name={`statBarNameId${statBarId}`}
                  text={
                    statBarId in getRoomModel
                      ? getRoomModel[statBarId][0]
                      : undefined
                  }
                />
                <Button
                  text="X"
                  onClick={e =>
                    handleRemoveButton(statBarId, statBarIds, setStatBarIds, e)
                  }
                  tabIndex={-1}
                />
              </div>
            ))}
            <Button
              type="button"
              text="Add a new bar"
              className={classes.add_button}
              onClick={e => handleAddButton(statBarIds, setStatBarIds, e)}
              disabled={statBarIds.length === 3}
              tabIndex={-1}
            />

            {/* ATTRIBUTES */}
            <h4 className={classes.section}>Attributes</h4>
            {attributeIds.map(attributeId => (
              <div className={classes.attribute} key={attributeId}>
                <TextLikeInput
                  name={`attributeId${attributeId}`}
                  text={
                    attributeId in getRoomModel
                      ? (getRoomModel[attributeId] as string)
                      : undefined
                  }
                />
                <Button
                  text="X"
                  onClick={e =>
                    handleRemoveButton(
                      attributeId,
                      attributeIds,
                      setAttributeIds,
                      e
                    )
                  }
                  tabIndex={-1}
                />
              </div>
            ))}
            <Button
              type="button"
              text="Add a new attribute"
              className={classes.add_button}
              onClick={e => handleAddButton(attributeIds, setAttributeIds, e)}
              disabled={attributeIds.length === 8}
              tabIndex={-1}
            />

            {/* DICE */}
            <h4 className={classes.section}>Dice</h4>
            <div className={classes.dice}>
              {dieIds.map(dieId => (
                <div className={classes.die} key={dieId}>
                  <TextLikeInput
                    name={`dieId${dieId}`}
                    className={classes.dice_input}
                    maxLength={3}
                    text={
                      dieId in getRoomModel
                        ? (getRoomModel[dieId] as string)
                        : undefined
                    }
                  />
                  <Button
                    text="X"
                    onClick={e =>
                      handleRemoveButton(dieId, dieIds, setDieIds, e)
                    }
                    tabIndex={-1}
                  />
                </div>
              ))}
            </div>
            <Button
              type="button"
              text="Add a new die"
              className={classes.add_button}
              onClick={e => handleAddButton(dieIds, setDieIds, e)}
              disabled={dieIds.length === 8}
              tabIndex={-1}
            />
            <Button
              className={classes.update_button}
              type="submit"
              text="Update"
            />
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
