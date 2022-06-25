import { Select } from 'shared/components/Select';
import classes from './ColorSelect.module.css';

interface IColorSelectProps {
  name?: string;
}

export const ColorSelect: React.FC<IColorSelectProps> = props => {
  return (
    <Select className={classes.color_select} dataChosen="red" name={props.name}>
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="yellow">Yellow</option>
      <option value="purple">Purple</option>
    </Select>
  );
};
