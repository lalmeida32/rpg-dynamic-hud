export interface IColors {
  black: string;
  white: string;
  darker: string;
  dark: string;
}

const colors: IColors = {
  black: 'black',
  white: 'white',
  darker: 'hsl(230deg, 15%, 15%)',
  dark: 'hsl(230deg, 15%, 30%)',
};

export const getDefaultColors = () => {
  return { ...colors };
};
