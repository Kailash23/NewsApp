import React from 'react';
import {StyleSheet} from 'react-native';
import {color} from '../theme';
import {Screen, Text} from '../ui-kit';

export function Home() {
  return (
    <Screen style={styles.container} variant={'scroll'} withOutHeader>
      <Text>Regular</Text>
      <Text variant={'bold'}>Bold</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.debug,
  },
});
