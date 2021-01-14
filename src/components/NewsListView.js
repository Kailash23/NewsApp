import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from '../ui-kit';
import {formatTime, openLinkInAppBrowser} from '../utils';
import {TouchWrapper} from '.';
import {color} from '../theme';

const ITEM_HEIGHT = 100;

export const NewsListView = memo(
  ({urlToImage, publishedAt, description, source, url}) => {
    return (
      <TouchWrapper
        style={styles.list}
        callback={() => {
          if (url) {
            openLinkInAppBrowser(url);
          }
        }}>
        <View style={styles.newsInfo}>
          <View>
            <Text style={styles.sourceName}>{source?.name}</Text>
            <Text variant={'bold'} style={styles.newsDesc} numberOfLines={2}>
              {description}
            </Text>
          </View>
          <Text style={styles.timeLeft}>{formatTime(publishedAt)}</Text>
        </View>
        <View style={styles.newsThumbnail}>
          <Image source={{uri: urlToImage}} style={styles.thumb} />
        </View>
      </TouchWrapper>
    );
  },
);

export const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: ITEM_HEIGHT,
    padding: 10,
    flexDirection: 'row',
  },
  newsInfo: {
    flex: 0.75,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  newsThumbnail: {
    flex: 0.25,
    borderRadius: 10,
    overflow: 'hidden',
  },
  sourceName: {fontSize: 12},
  timeLeft: {fontSize: 12, color: color.palette.warmGrey},
  newsDesc: {fontSize: 13},
  thumb: {width: '100%', height: '100%'},
});
