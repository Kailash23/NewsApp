import {palette} from './palette';

export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The screen background.
   */
  background: palette.white,
  /**
   * The main tinting color.
   */
  primary: palette.azure,
  /**
   * A subtle color used for borders and lines.
   */
  line: palette.warmGrey,
  /**
   * The default color of text in many components.
   */
  text: palette.black,
  /**
   * Secondary information.
   */
  dim: palette.warmGrey,
  /**
   * Error messages
   */
  error: palette.red,
  /**
   * Layout testing
   */
  debug: palette.debug,
};
