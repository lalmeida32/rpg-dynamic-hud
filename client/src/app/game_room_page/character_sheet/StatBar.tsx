import { TextLikeInput } from 'shared/components/TextLikeInput';
import { TStatBarColor } from 'shared/types/TStatBarColor';
import classes from './StatBar.module.css';

interface IStatBarProps {
  name: string;
  idMin?: string;
  idMax?: string;
  inputNameMin?: string;
  inputNameMax?: string;
  color: TStatBarColor;
  onChange: (data: string, limit: 'min' | 'max') => void;
}

const maxLength = 5;

export const StatBar: React.FC<IStatBarProps> = props => {
  return (
    <div className={classes.stat_bar_container}>
      <p>{props.name}</p>
      <div className={`${classes.stat_bar} ${classes[props.color]}`}>
        <TextLikeInput
          maxLength={maxLength}
          placeholder="Actual"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.onChange(e.target.value, 'min')
          }
          id={props.idMin}
          name={props.inputNameMin}
        />
        <p className={classes.stat_bar_label}> / </p>
        <TextLikeInput
          maxLength={maxLength}
          placeholder="Max"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.onChange(e.target.value, 'max')
          }
          id={props.idMax}
          name={props.inputNameMax}
        />
      </div>
    </div>
  );
};
