import classes from './CharacterBlock.module.css';
import unknownCharacter from 'shared/images/unknown_character.webm';

export const CharacterBlock = () => {
  return (
    <div className={classes.character_block}>
      <video
        src={unknownCharacter}
        className={classes.character_image}
        autoPlay
        muted
        loop
      />
      <p className={classes.character_name}>Character Name</p>
      <div className={classes.stat_bars}>
        <div />
        <div />
      </div>
    </div>
  );
};
