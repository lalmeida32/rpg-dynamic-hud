import React, { useCallback, useState } from 'react';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';
import { ColorSelect } from './ColorSelect';
import classes from './CreateRoomAlertContent.module.css';

export const CreateRoomAlertContent = () => {
  /* STATE */
  const [statBarIds, setStatBarIds] = useState<number[]>([]);
  const [attributeIds, setAttributeIds] = useState<number[]>([]);
  const [dieIds, setDieIds] = useState<number[]>([]);

  const [nextId, setNextId] = useState<number>(1);

  /* LOGIC */
  const handleCreateRoomForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    },
    []
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
        {/* STAT BARS  */}
        <h4>Stat bars</h4>
        <TextLikeInput text="Health" name="statBarNameId0" />
        <ColorSelect name={`statBarColorId0`} />
        {statBarIds.map(statBarId => (
          <React.Fragment key={statBarId}>
            <TextLikeInput name={`statBarNameId${statBarId}`} />
            <ColorSelect name={`statBarColorId${statBarId}`} />
            <Button
              text="delete"
              onClick={e =>
                handleRemoveButton(statBarId, statBarIds, setStatBarIds, e)
              }
            />
          </React.Fragment>
        ))}
        <Button
          text="Add a new bar"
          onClick={e => handleAddButton(statBarIds, setStatBarIds, e)}
          disabled={statBarIds.length === 4}
        />

        {/* ATTRIBUTES */}
        <h4>Attributes</h4>
        {attributeIds.map(attributeId => (
          <React.Fragment key={attributeId}>
            <TextLikeInput name={`attributeId${attributeId}`} />
            <Button
              text="delete"
              onClick={e =>
                handleRemoveButton(
                  attributeId,
                  attributeIds,
                  setAttributeIds,
                  e
                )
              }
            />
          </React.Fragment>
        ))}
        <Button
          text="Add a new attribute"
          onClick={e => handleAddButton(attributeIds, setAttributeIds, e)}
          disabled={attributeIds.length === 8}
        />

        {/* DICE */}
        <h4>Dice</h4>
        {dieIds.map(dieId => (
          <React.Fragment key={dieId}>
            <TextLikeInput
              name={`dieId${dieId}`}
              className={classes.dice_input}
              maxLength={3}
            />
            <Button
              text="delete"
              onClick={e => handleRemoveButton(dieId, dieIds, setDieIds, e)}
            />
          </React.Fragment>
        ))}
        <Button
          text="Add a new die"
          onClick={e => handleAddButton(dieIds, setDieIds, e)}
          disabled={dieIds.length === 8}
        />
        <Button type="submit" text="Create" />
      </form>
    </React.Fragment>
  );
};
