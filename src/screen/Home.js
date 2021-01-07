import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import {color} from '../theme';
import {Divider, Screen, Text} from '../ui-kit';
import {FlatList} from 'react-native-gesture-handler';
import useAutoRefresh from '../hooks/useAutoRefresh';
import {getTopHeadlines} from '../api';
import {NewsListView} from '../components';
import {HeadlineCard} from '../components/HeadlineCard';
import {useDeviceOrientation} from '@react-native-community/hooks';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ITEM_HEIGHT = 100;
const HEADLINE_CHANGE_TIME = 5 * 1000;
const LIST_REFRESH_TIME = 60 * 1000 * 5;

function Title({text}) {
  return (
    <Text variant={'bold'} style={styles.head}>
      {text}
    </Text>
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
      setActiveIndex((activeIndex + 1) % articles?.length);
    }, HEADLINE_CHANGE_TIME);

    return () => {
      clearTimeout(interval);
    };
  }, [articles, activeIndex]);

  return (
    <>
      <Title text={'Headlines'} />
      <HeadlineCard {...articles[activeIndex]} key={activeIndex.toString()} />
    </>
  );
}

export function Home() {
  const [articles, setArticles] = useState(null);
  const orientation = useDeviceOrientation();
  const isPortrait = orientation.portrait;

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
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={color.palette.azure} />
      </View>
    );
  }

  return (
    <Screen
      style={styles.container(isPortrait)}
      variant={'scroll'}
      withOutHeader>
      <Headlines {...{articles}} />
      <NewsList {...{articles}} />
    </Screen>
  );
}

export const styles = StyleSheet.create({
  container: (isPortrait) => ({
    paddingHorizontal: isPortrait ? 14 : 50,
    paddingBottom: 20,
  }),
  head: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginVertical: 20,
  },
  noData: {alignSelf: 'center'},
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
