import { useState } from 'react';
import unknownCharacter from 'shared/images/unknown_character.webm';
import classes from './CharacterImage.module.css';

export const CharacterImage = () => {
  const [selection, setSelection] = useState(false);

  return (
    <div className={classes.character_image_container}>
      {selection ? (
        <div onClick={() => setSelection(false)}></div>
      ) : (
        <video
          className={classes.character_image}
          autoPlay
          muted
          loop
          src={unknownCharacter}
          onClick={() => setSelection(true)}
        />
      )}
    </div>
  );
};
