import classes from './Select.module.css';

interface ISelectProps {
  children: React.ReactNode;
  className?: string;
  name?: string;
  dataChosen?: string;
}

export const Select: React.FC<ISelectProps> = props => {
  const className =
    classes.select + (props.className ? ' ' + props.className : '');

  return (
    <select
      className={className}
      name={props.name}
      data-chosen={props.dataChosen}
      onChange={e => (e.target.dataset.chosen = e.target.value)}
    >
      {props.children}
    </select>
  );
};
