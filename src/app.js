import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from './ui-kit';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Regular</Text>
      <Text variant={'bold'}>Bold</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
