import * as React from 'react';
import {Text as ReactNativeText} from 'react-native';
import {mergeAll, flatten} from 'ramda';
import {color, typography} from '../../theme';

const BASE = {
  fontFamily: typography.regular,
  color: color.text,
  fontSize: 14,
};

const variants = {
  /**
   * The default text styles. (Default)
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: {...BASE, fontFamily: typography.bold},

  /**
   * Large headers.
   */
  header: {...BASE, fontSize: 16, fontFamily: typography.bold},

  /**
   * A smaller piece of secondary information.
   */
  secondary: {...BASE, fontSize: 14, fontFamily: typography.medium},
};

/**
 * variant - default | bold | header | secondary
 *
 * This component is a HOC over the built-in React Native one.
 *
 * Props
 * children - Children components.
 * text - The text to display
 * style - An optional style override useful for padding & margin.
 * variant - One of the different types of text variants.
 */

export function Text(props) {
  const {
    variant = 'default',
    text,
    children,
    style: styleOverride,
    ...rest
  } = props;

  // figure out which content to use
  const content = text || children;

  const style = mergeAll(
    flatten([variants[variant] || variants.default, styleOverride]),
  );

  return (
    <ReactNativeText {...rest} style={style}>
      {content}
    </ReactNativeText>
  );
}
