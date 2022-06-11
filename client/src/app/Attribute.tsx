import { TextLikeInput } from '../shared/components/TextLikeInput';
import classes from './Attribute.module.css';

interface IAttributeProps {
  name: string;
}

export const Attribute: React.FC<IAttributeProps> = props => {
  return (
    <div className={classes.attribute}>
      <TextLikeInput maxLength={3} />
      <TextLikeInput paragraph text={props.name} />
    </div>
  );
};
