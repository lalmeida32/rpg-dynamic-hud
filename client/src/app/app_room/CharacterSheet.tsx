import classes from './CharacterSheet.module.css';
import inputClasses from '../../shared/components/input.module.css';
import unknownCharacter from './unknown_character.gif';

export const CharacterSheet = () => {
  return (
    <div className={classes.entry}>
      <input type="text" className={inputClasses.textLikeInput} />
      <img className={classes.characterMainImage} src={unknownCharacter} />
      <div className={`${classes.statBarContainer} ${classes.marginBottomDiv}`}>
        <input type="number" className={inputClasses.textLikeInput} />
        <input type="number" className={inputClasses.textLikeInput} />
      </div>
      <div className={`${classes.statBarContainer} ${classes.marginBottomDiv}`}>
        <input type="number" className={inputClasses.textLikeInput} />
        <input type="number" className={inputClasses.textLikeInput} />
      </div>
      <div className={`${classes.statBarContainer} ${classes.marginBottomDiv}`}>
        <input type="number" className={inputClasses.textLikeInput} />
        <input type="number" className={inputClasses.textLikeInput} />
      </div>
      <div
        className={`${classes.attributeContainer} ${classes.marginBottomDiv}`}
      >
        <input type="number" className={inputClasses.textLikeInput} />
        <p className={inputClasses.textLikeInput}>Strength</p>
      </div>
      <div
        className={`${classes.attributeContainer} ${classes.marginBottomDiv}`}
      >
        <input type="number" className={inputClasses.textLikeInput} />
        <p className={inputClasses.textLikeInput}>Agility</p>
      </div>
      <div
        className={`${classes.attributeContainer} ${classes.marginBottomDiv}`}
      >
        <input type="number" className={inputClasses.textLikeInput} />
        <p className={inputClasses.textLikeInput}>Intelligence</p>
      </div>
    </div>
  );
};
