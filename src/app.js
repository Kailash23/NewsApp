import React from 'react';
import {Home} from './screen';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

if (__DEV__) {
  import('./utils/ignoreWarnings');
}

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Home />
    </SafeAreaProvider>
  );
}
