import { TextLikeInput } from 'shared/components/TextLikeInput';
import classes from './StatBar.module.css';

interface IStatBarProps {
  name: string;
  color: 'red' | 'yellow' | 'blue' | 'purple';
}

const maxLength = 5;

export const StatBar: React.FC<IStatBarProps> = props => {
  return (
    <div className={classes.stat_bar_container}>
      <p>{props.name}</p>
      <div className={`${classes.stat_bar} ${classes[props.color]}`}>
        <TextLikeInput maxLength={maxLength} placeholder="Actual" />
        <p className={classes.stat_bar_label}> / </p>
        <TextLikeInput maxLength={maxLength} placeholder="Max" />
      </div>
    </div>
  );
};
