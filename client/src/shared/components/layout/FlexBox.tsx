interface IFlexBoxProps {
  direction?: 'column' | 'row';
  width?: string;
  height?: string;
  mainAlign?: 'center' | 'space-around' | 'space-evenly' | 'space-between';
  crossAlign?: 'center';
  backgroundColor?: string;
  padding?: string;

  children?: React.ReactNode;
}

export const FlexBox: React.FC<IFlexBoxProps> = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: props.direction,
        width: props.width,
        height: props.height,
        background: props.backgroundColor,
        justifyContent: props.mainAlign,
        alignItems: props.crossAlign,
        padding: props.padding,
      }}
    >
      {props.children}
    </div>
  );
};
