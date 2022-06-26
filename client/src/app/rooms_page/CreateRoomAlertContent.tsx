import React, { useCallback, useContext, useState } from 'react';
import { Button } from 'shared/components/Button';
import { DefaultAlertContent } from 'shared/components/DefaultAlertContent';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { CurrentAlertContext } from 'shared/contexts/CurrentAlert';
import { UserLoginContext } from 'shared/contexts/UserLogin';
import { IRoomCreateModel } from 'shared/models/IRoomCreateModel';
import { services } from 'shared/services/services';
import { TStatBarColor } from 'shared/types/TStatBarColor';
import { ColorSelect } from './ColorSelect';
import classes from './CreateRoomAlertContent.module.css';

export const CreateRoomAlertContent = () => {
  /* STATE */
  const [statBarIds, setStatBarIds] = useState<number[]>([]);
  const [attributeIds, setAttributeIds] = useState<number[]>([]);
  const [dieIds, setDieIds] = useState<number[]>([]);

  const [nextId, setNextId] = useState<number>(1);

  const userLogin = useContext(UserLoginContext);
  const currentAlert = useContext(CurrentAlertContext);

  /* LOGIC */
  const handleCreateRoomForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;

      const model: IRoomCreateModel = {
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
        await services.room.createRoom(
          userLogin.token,
          userLogin.username,
          model
        );
        currentAlert.setAlert(
          <DefaultAlertContent success text="Room created successfully." />
        );
      } catch (e) {
        if (e instanceof Error)
          currentAlert.setAlert(<DefaultAlertContent text={e.message} error />);
      }
    },
    [statBarIds, attributeIds, dieIds, currentAlert, userLogin]
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
      <h3 className={classes.title}>Room settings</h3>
      <form className={classes.form} onSubmit={handleCreateRoomForm}>
        <h4 className={classes.section}>Room name</h4>
        <TextLikeInput className={classes.room_name_input} name="roomName" />
        {/* STAT BARS  */}
        <h4 className={classes.section}>Stat bars</h4>
        <div className={classes.stat_bar}>
          <ColorSelect name={`statBarColorId0`} />
          <TextLikeInput text="Health" name="statBarNameId0" />
        </div>
        {statBarIds.map(statBarId => (
          <div className={classes.stat_bar} key={statBarId}>
            <ColorSelect name={`statBarColorId${statBarId}`} />
            <TextLikeInput name={`statBarNameId${statBarId}`} />
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
            <TextLikeInput name={`attributeId${attributeId}`} />
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
              />
              <Button
                text="X"
                onClick={e => handleRemoveButton(dieId, dieIds, setDieIds, e)}
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
        <Button className={classes.create_button} type="submit" text="Create" />
      </form>
    </React.Fragment>
  );
};
