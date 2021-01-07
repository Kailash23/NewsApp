import React from 'react';
import {StyleSheet, View} from 'react-native';
import {color} from '../../theme';

const BORDER = {
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: color.palette.border,
  width: '100%',
};

export function Divider() {
  return <View style={BORDER} />;
}
