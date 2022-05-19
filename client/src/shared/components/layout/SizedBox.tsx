interface ISizedBoxProps {
  width?: string;
  height?: string;

  children?: React.ReactNode;
}

export const SizedBox: React.FC<ISizedBoxProps> = props => {
  return (
    <div style={{ width: props.width || 0, height: props.height || 0 }}>
      {props.children}
    </div>
  );
};
