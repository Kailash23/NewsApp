import TouchableScale from '@jonny/touchable-scale';
import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';

const isIos = Platform.OS === 'ios';

export function TouchWrapper({children, callback, style}) {
  if (isIos) {
    return (
      <TouchableScale style={style} onLongPress={callback}>
        {children}
      </TouchableScale>
    );
  } else {
    return (
      <TouchableOpacity
        style={style}
        onLongPress={callback}
        activeOpacity={0.6}>
        {children}
      </TouchableOpacity>
    );
  }
}
