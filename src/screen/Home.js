import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import {color} from '../theme';
import {Screen, Text} from '../ui-kit';
import TouchableScale from '@jonny/touchable-scale';
import {FlatList} from 'react-native-gesture-handler';
import useAutoRefresh from '../hooks/useAutoRefresh';
import {formatTime, openLinkInAppBrowser} from '../utils';
import {getTopHeadlines} from '../api';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ITEM_HEIGHT = 100;
const HEADLINE_CHANGE_TIME = 5 * 1000;
const LIST_REFRESH_TIME = 60 * 1000 * 5;

function Divider() {
  return <View style={styles.border} />;
}

function Title({text}) {
  return (
    <Text variant={'bold'} style={styles.head}>
      {text}
    </Text>
  );
}

function HeadlineCard({urlToImage, description, source, url}) {
  return (
    <TouchableScale
      style={styles.card}
      onLongPress={() => {
        if (url) {
          openLinkInAppBrowser(url);
        }
      }}>
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
    </TouchableScale>
  );
}

function NewsListView({urlToImage, publishedAt, description, source, url}) {
  return (
    <TouchableScale
      style={styles.list}
      onLongPress={() => {
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
    </TouchableScale>
  );
}

function NewsList({articles}) {
  const [extraData] = useAutoRefresh(LIST_REFRESH_TIME); //5 mins (for time left)

  function renderItem({item}) {
    return <NewsListView {...item} />;
  }

  function keyExtractor(_, ind) {
    return ind.toString();
  }

  function renderSeparator() {
    return <Divider />;
  }

  function getItemLayout(__, index) {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    };
  }

  function renderListEmpty() {
    return <Text style={styles.noData}>No data</Text>;
  }

  return (
    <>
      <Title text={'Todays News'} />
      <FlatList
        data={articles}
        {...{renderItem, keyExtractor, getItemLayout, extraData}}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderListEmpty}
      />
    </>
  );
}

function Headlines({articles}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setActiveIndex((s) => {
        return (s + 1) % articles?.length;
      });
    }, HEADLINE_CHANGE_TIME);

    return () => {
      clearTimeout(interval);
    };
  }, [articles]);

  return (
    <>
      <Title text={'Headlines'} />
      <HeadlineCard {...articles[activeIndex]} key={activeIndex.toString()} />
    </>
  );
}

export function Home() {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    getTopHeadlines()
      .then((data) => {
        setArticles(data?.articles);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (articles === null) {
    return null;
  }

  return (
    <Screen style={styles.container} variant={'scroll'} withOutHeader>
      <Headlines {...{articles}} />
      <NewsList {...{articles}} />
    </Screen>
  );
}

const cardStyle = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
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
  head: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginVertical: 20,
  },
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
    ...cardStyle,
  },
  sourceName: {fontSize: 12},
  timeLeft: {fontSize: 12, color: color.palette.warmGrey},
  newsDesc: {fontSize: 13},
  thumb: {width: '100%', height: '100%'},
  border: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.border,
    width: '100%',
  },
  noData: {alignSelf: 'center'},
});
