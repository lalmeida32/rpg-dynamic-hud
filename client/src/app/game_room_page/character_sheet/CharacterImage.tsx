import { useState } from 'react';
import { Button } from 'shared/components/Button';
import uploadDead from 'shared/images/upload_dead_animation.gif';
import uploadLow from 'shared/images/upload_low_animation.gif';
import uploadMedium from 'shared/images/upload_medium_animation.gif';
import uploadHigh from 'shared/images/upload_high_animation.gif';
import unknownCharacter from 'shared/images/unknown_character.webm';
import classes from './CharacterImage.module.css';

export const CharacterImage = () => {
  const [selection, setSelection] = useState(false);

  return (
    <div className={classes.character_image_container}>
      {selection ? (
        <div className={classes.character_image_selector}>
          <div className={classes.character_image_input_buttons}>
            <label>
              <input className={classes.character_image_input} type="file" />
              <img src={uploadDead} />
            </label>
            <label>
              <input className={classes.character_image_input} type="file" />
              <img src={uploadLow} />
            </label>
            <label>
              <input className={classes.character_image_input} type="file" />
              <img src={uploadMedium} />
            </label>
            <label>
              <input className={classes.character_image_input} type="file" />
              <img src={uploadHigh} />
            </label>
          </div>
          <Button text="Go back" onClick={() => setSelection(false)} />
        </div>
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
