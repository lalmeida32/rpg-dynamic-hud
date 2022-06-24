import React, { useCallback } from 'react';
import { Button } from 'shared/components/Button';
import { TextLikeInput } from 'shared/components/TextLikeInput';

export const CreateRoomAlertContent = () => {
  /* STATE */

  /* LOGIC */
  const handleCreateRoomForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    },
    []
  );

  /* VIEW */
  return (
    <React.Fragment>
      <h3>Room settings</h3>
      <form onSubmit={handleCreateRoomForm}>
        <h4>Stat bars</h4>
        <TextLikeInput text="Health" />
        <Button text="Add a new bar" />
        <h4>Attributes</h4>
        <Button text="Add a new attribute" />
        <h4>Dices</h4>
        <TextLikeInput text="6" />
        <Button text="Add a new die" />
        <Button type="submit" text="Create" />
      </form>
    </React.Fragment>
  );
};
