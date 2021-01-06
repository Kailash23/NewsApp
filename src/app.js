import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {typography} from './theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.regular}>Regular</Text>
      <Text style={styles.medium}>Medium</Text>
      <Text style={styles.semiBold}>SemiBold</Text>
      <Text style={styles.bold}>Bold</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  regular: {fontFamily: typography.regular},
  medium: {fontFamily: typography.medium},
  semiBold: {fontFamily: typography.semiBold},
  bold: {fontFamily: typography.bold},
});
