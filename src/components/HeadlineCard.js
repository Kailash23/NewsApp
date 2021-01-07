import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Text} from '../ui-kit';
import {openLinkInAppBrowser} from '../utils';
import {TouchWrapper} from '.';
import {color} from '../theme';

export function HeadlineCard({urlToImage, description, source, url}) {
  return (
    <TouchWrapper
      style={styles.card}
      callback={() => {
        if (url) {
          openLinkInAppBrowser(url);
        }
      }}>
      <>
        <ImageBackground
          source={{
            uri: urlToImage,
          }}
          style={styles.image}>
          <View style={styles.backdrop} />
        </ImageBackground>
        <View style={styles.headingContainer}>
          <Text variant={'bold'} style={styles.heading} numberOfLines={3}>
            {description}
          </Text>
        </View>
        <View style={styles.sourceContainer}>
          <Text variant={'medium'} style={styles.source}>
            {source?.name}
          </Text>
        </View>
      </>
    </TouchWrapper>
  );
}

const cardStyle = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2,
};

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    ...cardStyle,
  },
  image: {width: '100%', height: 200},
  heading: {
    color: color.palette.white,
  },
  source: {
    color: color.palette.white,
  },
  headingContainer: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 10,
  },
  sourceContainer: {
    position: 'absolute',
    padding: 20,
    right: 10,
  },
  backdrop: {backgroundColor: color.palette.backdrop, flex: 1},
});
