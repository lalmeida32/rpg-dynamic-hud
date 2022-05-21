interface ISizedBoxProps {
  width?: string;
  height?: string;

  children?: React.ReactNode;
}

export const SizedBox: React.FC<ISizedBoxProps> = props => {
  return (
    <div style={{ width: props.width, height: props.height }}>
      {props.children}
    </div>
  );
};
