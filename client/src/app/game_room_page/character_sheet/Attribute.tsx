import { TextLikeInput } from 'shared/components/TextLikeInput';
import classes from './Attribute.module.css';

interface IAttributeProps {
  name: string;
  id?: string;
  inputName?: string;
  onChange: (data: string) => void;
}

export const Attribute: React.FC<IAttributeProps> = props => {
  return (
    <div className={classes.attribute}>
      <TextLikeInput
        maxLength={3}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.onChange(e.target.value)
        }
        name={props.inputName}
        id={props.id}
      />
      <TextLikeInput paragraph text={props.name} />
    </div>
  );
};
