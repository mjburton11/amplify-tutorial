import { colors } from './colors';

export const primaryFont = {
  fontFamily: 'Ubuntu',
  font: 'sans-serif',
};

export namespace xButton {
  export const button = {
    ...primaryFont,
    color: colors.purple,
    borderColor: colors.purple,
  };
  export const large = { ...xButton.button, padding: '8px', fontSize: '24px' };
}
