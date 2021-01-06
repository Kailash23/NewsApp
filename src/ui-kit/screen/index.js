import * as React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isNil} from 'ramda';
import {color} from '../../theme';

const isIos = Platform.OS === 'ios';

/**
 * All screen keyboard offsets.
 */
const offsets = {
  none: 0,
};

/**
 * All the variations of screens.
 */
const variants = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: '100%',
    },
    inner: {
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      height: '100%',
      width: '100%',
    },
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    outer: {
      backgroundColor: color.background,
      flexGrow: 1,
      height: '100%',
    },
    inner: {justifyContent: 'flex-start', alignItems: 'stretch', flexGrow: 1},
  },
};

function isNonScrolling(variant) {
  return (
    isNil(variant) ||
    !variant.length ||
    isNil(variants[variant]) ||
    variant === 'fixed'
  );
}

function getInsetStyle(unsafe, insets, withOutHeader, withBottomTabs) {
  return {
    paddingTop: unsafe ? 0 : withOutHeader ? insets.top : 0,
    paddingLeft: unsafe ? 0 : insets.left,
    paddingRight: unsafe ? 0 : insets.right,
    paddingBottom: unsafe ? 0 : withBottomTabs ? 0 : insets.bottom,
  };
}

function ScreenWithoutScrolling(props) {
  const insets = useSafeAreaInsets();
  const variant = variants.fixed;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const insetStyle = getInsetStyle(
    props.unsafe,
    insets,
    props.withOutHeader,
    props.withBottomTabs,
  );

  return (
    <KeyboardAvoidingView
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
      }}
      style={[variant.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar barStyle={props.statusBar || 'light-content'} />
      <View style={[variant.inner, style, insetStyle]}>{props.children}</View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props) {
  const insets = useSafeAreaInsets();
  const variant = variants.scroll;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const insetStyle = getInsetStyle(
    props.unsafe,
    insets,
    props.withOutHeader,
    props.withBottomTabs,
  );
  return (
    <KeyboardAvoidingView
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
      }}
      style={[variant.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar barStyle={props.statusBar || 'light-content'} />
      <View style={[variant.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          bounces={false}
          style={[variant.outer, backgroundStyle]}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={[variant.inner, style]}>
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * variant - fixed | scroll (One of the different types of variants)
 *
 * children - Children components.
 *
 * style - An optional style override useful for padding & margin.
 *
 * backgroundColor - An optional background color
 *
 * statusBar "light-content" | "dark-content" - An optional status bar setting. Defaults to light-content.
 *
 * keyboardOffset - By how much should we offset the keyboard, Defaults to none
 *
 * unsafe - Should we not wrap in SafeAreaView, Defaults to false.
 */
export function Screen(props) {
  if (isNonScrolling(props.variant)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}
