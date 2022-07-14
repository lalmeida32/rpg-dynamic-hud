import { Select } from 'shared/components/Select';
import { TStatBarColor } from 'shared/types/TStatBarColor';
import classes from './ColorSelect.module.css';

interface IColorSelectProps {
  name?: string;
  dataChosen?: TStatBarColor;
}

export const ColorSelect: React.FC<IColorSelectProps> = props => {
  return (
    <Select
      className={classes.color_select}
      dataChosen={props.dataChosen || 'red'}
      name={props.name}
    >
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="yellow">Yellow</option>
      <option value="purple">Purple</option>
    </Select>
  );
};
