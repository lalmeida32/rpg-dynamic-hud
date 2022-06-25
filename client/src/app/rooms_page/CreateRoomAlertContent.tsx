import React, { useCallback, useState } from 'react';
import { Button } from 'shared/components/Button';
import { Select } from 'shared/components/Select';
import { TextLikeInput } from 'shared/components/TextLikeInput';
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
        <TextLikeInput text="Health" name="inputId0" />
        {statBarIds.map(statBarId => (
          <React.Fragment key={statBarId}>
            <TextLikeInput name={`inputId${statBarId}`} />
            <Select
              className={classes.color_select}
              dataChosen="red"
              name={`selectId${statBarId}`}
            >
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="yellow">Yellow</option>
              <option value="purple">Purple</option>
            </Select>
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
          disabled={statBarIds.length === 8}
        />

        {/* ATTRIBUTES */}
        <h4>Attributes</h4>
        {attributeIds.map(attributeId => (
          <React.Fragment key={attributeId}>
            <TextLikeInput name={`inputId${attributeId}`} />
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
              name={`inputId${dieId}`}
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
          disabled={dieIds.length === 4}
        />
        <Button type="submit" text="Create" />
      </form>
    </React.Fragment>
  );
};
