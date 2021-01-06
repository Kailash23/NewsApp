import React, {useEffect, useState} from 'react';
import {
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

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const articles = [
  {
    source: {id: 'cbs-news', name: 'CBS News'},
    author: 'CBS News',
    title: 'Dr Dre hospitalized, reportedly suffered brain aneurysm - CBS News',
    description:
      'Music mogul, rapper and producer posted Instagram message saying he\'s getting excellent care and will be "back home soon."',
    url: 'https://www.cbsnews.com/news/dr-dre-hospitalized-brain-aneurysm/',
    urlToImage:
      'https://cbsnews3.cbsistatic.com/hub/i/r/2021/01/06/cc67ed5f-4702-4ec8-abad-2e807fef7586/thumbnail/1200x630/cb437e5435ea519a91b966502ec1ad97/gettyimages-1204811175.jpg',
    publishedAt: '2021-01-06T12:18:00Z',
    content:
      'Dr. Dre says he\'ll be "back home soon" after the music mogul received medical treatment at a Los Angeles hospital for a reported brain aneurysm. \r\n The rapper and producer said in an Instagram post T… [+1855 chars]',
  },
  {
    source: {id: null, name: 'New York Times'},
    author: 'Matina Stevis-Gridneff',
    title: 'Covid-19 News: Live Updates - The New York Times',
    description:
      'The European agency moved up the decision after criticism for being too slow. In the past week, Arizona has averaged more than 8,000 cases a day, more than double the peak in mid-2020.',
    url: 'https://www.nytimes.com/live/2021/01/06/world/covid-19-coronavirus',
    urlToImage:
      'https://static01.nyt.com/images/2021/01/06/us/06virus-brief-arizona/06virus-brief-arizona-facebookJumbo-v2.jpg',
    publishedAt: '2021-01-06T12:17:00Z',
    content:
      'LiveUpdated Jan. 6, 2021, 7:50 a.m. ET\r\nJan. 6, 2021, 7:50 a.m. ET\r\nThe European agency moved up the decision after criticism for being too slow. In the past week, Arizona has averaged more than 8,00… [+19990 chars]',
  },
  {
    source: {id: null, name: 'CNBC'},
    author: 'Sam Shead',
    title:
      'WikiLeaks founder Julian Assange denied bail by London court - CNBC',
    description:
      'WikiLeaks founder Julian Assange has had his bail denied by a London court.',
    url:
      'https://www.cnbc.com/2021/01/06/wikileaks-founder-julian-assange-denied-bail-by-london-court.html',
    urlToImage:
      'https://image.cnbcfm.com/api/v1/image/105846058-1554987238781gettyimages-1136256458.jpeg?v=1554987304',
    publishedAt: '2021-01-06T11:30:00Z',
    content:
      'LONDON WikiLeaks founder Julian Assange has been denied bail by a London court.\r\nThe decision comes after a ruling on Monday said that the 49-year-old Australian cannot be extradited to the U.S.\r\nHe … [+1257 chars]',
  },
  {
    source: {id: 'engadget', name: 'Engadget'},
    author: '',
    title: 'Trump administration bans Alipay and WeChat Pay - Engadget',
    description:
      'The order will take effect after 45 days, long after Trump leaves office.',
    url:
      'https://www.engadget.com/trump-administration-bans-alipay-wechat-pay-103530923.html',
    urlToImage:
      'https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2021-01%2F90711dd0-4ffb-11eb-b9f7-eb43c72ba985&client=amp-blogside-v2&signature=1a2edc59305c8c66dc4001fdc590903760c258a7',
    publishedAt: '2021-01-06T11:28:02Z',
    content:
      'The order also affects Tencent’s QQ Wallet, Tencent’s QQ messenger, CamScanner, SHAREit, VMate (published by Alibaba Group subsidiary UCWeb) and Beijing Kingsoft Office Software’s WPS Office. It foll… [+1058 chars]',
  },
  {
    source: {id: null, name: 'CNBC'},
    author: 'Holly Ellyatt',
    title:
      "Covid variant found in South Africa is worrying experts: Here's what we know so far - CNBC",
    description:
      'A new strain of the coronavirus that has emerged in South Africa is causing concern around the globe.',
    url:
      'https://www.cnbc.com/2021/01/06/south-africa-covid-strain-a-guide-to-what-you-need-to-know.html',
    urlToImage:
      'https://image.cnbcfm.com/api/v1/image/106819656-1609928400136-gettyimages-1285458686-dsc_5580.jpeg?v=1609928462',
    publishedAt: '2021-01-06T10:34:00Z',
    content:
      "Scientist in a protective suit holds and compares two different Coronavirus of different color in his hands.\r\nViruses mutate all the time and it's come as no surprise to experts the coronavirus that … [+6751 chars]",
  },
  {
    source: {id: null, name: 'TheStreet'},
    author: 'Joseph Woelfel',
    title:
      'Georgia Elections, Alibaba, China, Trump, Apple - 5 Things You Must Know Wednesday - TheStreet',
    description:
      'Nasdaq futures slide as investors bet Democrats could win the Senate; U.S.-China tensions escalate; Alibaba reportedly plans a $5 billion bond sale.',
    url:
      'https://www.thestreet.com/markets/5-things-you-must-know-before-the-market-opens-wednesday-010621',
    urlToImage:
      'https://www.thestreet.com/.image/t_share/MTc2NTY2NDY3OTI2NDM1NTk0/2020-election_3.jpg',
    publishedAt: '2021-01-06T10:27:00Z',
    content:
      'Here are five things you must know for Wednesday, Jan. 6:\r\n1. -- Nasdaq Futures Slump as Wall Street Bets Democrats Win Senate\r\nStock futures were mixed Wednesday as investors bet Democrats could win… [+5750 chars]',
  },
  {
    source: {id: 'cnn', name: 'CNN'},
    author: 'Peter Nickeas, CNN',
    title:
      'Authorities on high alert as pro-Trump supporters flood DC to protest election - CNN',
    description:
      "Hundreds of law enforcement officers have mobilized across Washington, DC, as thousands of pro-Donald Trump supporters who refuse to accept the President's election loss have flocked to the nation's capital to protest as Congress gathers Wednesday afternoon t…",
    url:
      'https://www.cnn.com/2021/01/06/politics/pro-trump-supporters-dc-protest/index.html',
    urlToImage:
      'https://cdn.cnn.com/cnnnext/dam/assets/210105222805-dc-police-sign-0105-super-tease.jpg',
    publishedAt: '2021-01-06T10:01:00Z',
    content:
      "(CNN)Hundreds of law enforcement officers have mobilized across Washington as thousands of supporters who refuse to accept President Donald Trump's election loss have flocked to the nation's capital … [+8529 chars]",
  },
  {
    source: {id: 'business-insider', name: 'Business Insider'},
    author: 'Julie Gerstein',
    title:
      'PA GOP remove Lt. Gov. John Fetterman over senator dispute - Business Insider - Business Insider',
    description:
      'GOP senators objected to Fetterman swearing-in Sen. Jim Brewster because his Republican challenger Nicole Ziccarelli is still disputing the election results.',
    url:
      'https://www.businessinsider.com/pa-gop-remove-lt-gov-john-fetterman-over-senator-dispute-2021-1',
    urlToImage:
      'https://i.insider.com/5ff577f56d61c10019ccddc8?width=1200&format=jpeg',
    publishedAt: '2021-01-06T09:03:40Z',
    content:
      'The Pennsylvania state senate devolved into a shouting match during its swearing-in ceremony Tuesday.\r\nThe breakdown came when Lt. Governor John Fetterman left his position as presiding officer of th… [+2774 chars]',
  },
  {
    source: {id: 'usa-today', name: 'USA Today'},
    author: 'Joey Garrison',
    title:
      "Georgia's Senate runoffs: Ossoff surges ahead as Warnock makes history with runoff victory - USA TODAY",
    description:
      'Raphael Warnock is the first Black man elected as U.S. senator from Georgia and the first Democrat elevated to the Senate from Georgia in 20 years.',
    url:
      'https://www.usatoday.com/story/news/politics/elections/2021/01/06/georgia-election-results-raphael-warnock-kelly-loeffler-ossoff-perdue/4131906001/',
    urlToImage:
      'https://www.gannett-cdn.com/presto/2020/12/23/USAT/446e18b4-f2a0-4179-9237-ae372c644510-AP_Election_2020_Georgia_Warnock.jpg?crop=4483,2522,x0,y227&width=3200&height=1680&fit=bounds',
    publishedAt: '2021-01-06T09:01:46Z',
    content:
      'Democrat Raphael Warnock is the projected winner over Republican Senator Kelly Loeffler.\r\nUSA TODAY\r\nDemocrats appear on the brink of taking control of the U.S. Senate with Raphael Warnock the projec… [+4927 chars]',
  },
  {
    source: {id: 'cnn', name: 'CNN'},
    author: 'Rhea Mogul, CNN',
    title:
      'Australian fishermen rescue naked fugitive from crocodile-infested mangroves - CNN',
    description:
      'Two fishermen brought home a bigger catch than they were expecting when they rescued a naked fugitive from a crocodile-infested mangrove in northern Australia.',
    url:
      'https://www.cnn.com/2021/01/06/asia/australia-fugitive-found-intl-hnk-scli/index.html',
    urlToImage:
      'https://cdn.cnn.com/cnnnext/dam/assets/210106154938-east-point-australia-map-tease-super-tease.jpg',
    publishedAt: '2021-01-06T08:21:00Z',
    content: null,
  },
  {
    source: {id: null, name: 'CNBC'},
    author: 'Abigail Ng',
    title:
      "End of Qatar blockade is 'a win for the region,' Saudi foreign minister says - CNBC",
    description:
      "The Al-Ula declaration resolves all of the outstanding issues that Qatar and other Arab nations had, said Faisal bin Farhan al-Saud, Saudi's foreign minister.",
    url:
      'https://www.cnbc.com/2021/01/06/end-of-qatar-blockade-is-a-win-for-the-region-saudi-foreign-minister.html',
    urlToImage:
      'https://image.cnbcfm.com/api/v1/image/106819633-1609918195681-gettyimages-1230433807-AA_05012021_241268.jpeg?v=1609917509',
    publishedAt: '2021-01-06T08:16:00Z',
    content:
      "The end of the Gulf dispute is a win for the region, Saudi Arabia's foreign minister told CNBC after announcing that relations between Qatar and four Arab countries have been fully restored.\r\nLeaders… [+3904 chars]",
  },
  {
    source: {id: null, name: 'The Guardian'},
    author: 'Guardian staff reporter',
    title:
      'USA stun Canada to capture gold at world junior hockey championship - The Guardian',
    description:
      'Spencer Knight made 34 saves in yet another shutout and the United States upset Canada on Tuesday to win the world junior hockey championship',
    url:
      'https://amp.theguardian.com/sport/2021/jan/06/usa-canada-world-junior-hockey-championship',
    urlToImage: null,
    publishedAt: '2021-01-06T07:48:00Z',
    content:
      'Ice hockey<ul><li>US upset heavily favored Canada 2-0 to win surprise title</li><li>Spencer Knight (34 saves) records third shutout of event</li></ul>\r\nSpencer Knight made 34 saves in yet another shu… [+4828 chars]',
  },
  {
    source: {id: 'reuters', name: 'Reuters'},
    author: 'Sagarika Jaisinghani',
    title:
      'Nasdaq futures tumble as investors brace for possible Blue Wave - Reuters',
    description:
      'Futures tracking the technology-heavy Nasdaq 100 index sank 2% on Wednesday as investors priced in the prospect of a Democrat-controlled Senate that could lead to tighter regulations on technology mega-caps.',
    url: 'https://www.reuters.com/article/us-usa-stocks-idINKBN29B0SR',
    urlToImage:
      'https://static.reuters.com/resources/r/?m=02&d=20210106&t=2&i=1546764880&r=LYNXMPEH050E9&w=800',
    publishedAt: '2021-01-06T07:35:00Z',
    content:
      '(Reuters) -Futures tracking the technology-heavy Nasdaq 100 index sank 2% on Wednesday as investors priced in the prospect of a Democrat-controlled Senate that could lead to tighter regulations on te… [+2485 chars]',
  },
  {
    source: {id: null, name: 'Slate Magazine'},
    author: 'Heather Schwedel',
    title:
      'How to Read That Page Six Report on Kim Kardashian and Kanye West’s Divorce - Slate',
    description:
      'At least according to the tea leaves in a glorious Page Six report.',
    url:
      'https://slate.com/human-interest/2021/01/kim-kardashian-kanye-west-divorce-details-explained.html',
    urlToImage:
      'https://compote.slate.com/images/1c263ce6-2197-49a6-90b2-447dc34434a9.jpeg?width=780&height=520&rect=3988x2659&offset=0x522',
    publishedAt: '2021-01-06T05:43:00Z',
    content:
      'Kanye West, not feeling it, and Kim Kardashian West at the 2019 Met Gala.Jamie McCarthy/Getty Images\r\nWere a few days into 2021, and it looks like Kim Kardashian, bless her, plans to follow her compa… [+3857 chars]',
  },
  {
    source: {id: null, name: 'Daily Beast'},
    author: 'Justin Baragona',
    title:
      "Eric Trump Threatens to Primary Republicans Who Won't Help His Dad Overthrow Election - The Daily Beast",
    description:
      '“They will get primaried next time around. And they will lose if they don’t stand up and show some backbone, and show some conviction,” he said.',
    url:
      'https://www.thedailybeast.com/eric-trump-threatens-to-primary-republicans-who-wont-help-his-dad-overthrow-election',
    urlToImage:
      'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_720,w_1280,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1609908929/hannity_-_2021-01-05T225508.469_z0dheq',
    publishedAt: '2021-01-06T05:02:00Z',
    content:
      'Presidential son Eric Trump issued a threat on Tuesday night to House and Senate Republicans who refuse to join his fathers last-ditch effort to overthrow President-elect Joe Bidens decisive victory:… [+2321 chars]',
  },
  {
    source: {id: null, name: 'NME'},
    author: null,
    title: "'Cyberpunk 2077' loses 79 per cent of player base in a month - NME",
    description:
      "CD Projekt RED’s embattled RPG 'Cyberpunk 2077' has lost 79 per cent of its player base since it launched a month ago.",
    url:
      'https://www.nme.com/news/gaming-news/cyberpunk-2077-loses-79-per-cent-of-player-base-in-a-month-2850015',
    urlToImage:
      'https://www.nme.com/wp-content/uploads/2020/08/Cyberpunk-2077-2.jpg',
    publishedAt: '2021-01-06T04:44:00Z',
    content:
      'CD Projekt REDs embattled RPG Cyberpunk 2077 has lost 79 per cent of its player base since it launched just a month ago.\r\nThis is according to a new analysis from video game statistics website GitHyp… [+1462 chars]',
  },
  {
    source: {id: null, name: 'Yahoo Entertainment'},
    author: 'Terez Paylor',
    title:
      'What would it take for NFL to postpone a Browns-Steelers playoff game? We may soon find out - Yahoo Sports',
    description:
      'Calls for a postseason bubble could grow louder. One Brown still doesn’t think players and staff would have been better off with a playoff bubble.',
    url:
      'https://sports.yahoo.com/what-would-it-take-for-nfl-to-postpone-a-browns-steelers-playoff-game-we-may-soon-find-out-044316787.html',
    urlToImage:
      'https://s.yimg.com/ny/api/res/1.2/LPUbFx2wlO37wv8xZsK38g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTIwMDA7aD0xMzMz/https://s.yimg.com/os/creatr-uploaded-images/2021-01/e81332a0-4fd6-11eb-b5cf-d6e46e35169b',
    publishedAt: '2021-01-06T04:43:00Z',
    content:
      'For months, the NFL and its players consistently downplayed the necessity of a postseason bubble, instead harping on the importance of players and teams following COVID-19 safety protocols to finish … [+7262 chars]',
  },
  {
    source: {id: 'google-news', name: 'Google News'},
    author: null,
    title:
      'PS5 Restock Expected Later This Week In US, UK & Ireland - Screen Rant',
    description: null,
    url:
      'https://news.google.com/__i/rss/rd/articles/CBMiO2h0dHBzOi8vc2NyZWVucmFudC5jb20vcHM1LXJlc3RvY2stdGhpcy13ZWVrLXVzLXVrLWlyZWxhbmQv0gE_aHR0cHM6Ly9zY3JlZW5yYW50LmNvbS9wczUtcmVzdG9jay10aGlzLXdlZWstdXMtdWstaXJlbGFuZC9hbXAv?oc=5',
    urlToImage: null,
    publishedAt: '2021-01-06T04:08:00Z',
    content: null,
  },
  {
    source: {id: null, name: 'KATU'},
    author: 'ZEN SOO | Associated Press',
    title: 'Reports: Dozens of Hong Kong pro-democracy figures arrested - KATU',
    description:
      'HONG KONG (AP) &mdash; Hong Kong police arrested about 50 pro-democracy figures Wednesday for allegedly violating the new national security law by participating in an unofficial primary election last year held to increase their chances of controlling the legi…',
    url:
      'https://katu.com/news/nation-world/reports-dozens-of-hong-kong-pro-democracy-figures-arrested',
    urlToImage:
      'https://static-39.sinclairstoryline.com/resources/media/415611cc-5c0b-4502-9206-c4f1f6c9c88e-large16x9_AP21006050151987.jpg?1609904358701',
    publishedAt: '2021-01-06T03:49:09Z',
    content: null,
  },
  {
    source: {id: 'fox-news', name: 'Fox News'},
    author: 'Nate Day',
    title:
      "The Weeknd debuts facial alterations for 'Save Your Tears' music video - Fox News",
    description:
      'The Weeknd has debuted a music video for "Save Your Tears" featuring major facial alterations',
    url:
      'https://www.foxnews.com/entertainment/the-weeknd-facial-alterations-save-your-tears-music-video',
    urlToImage:
      'https://static.foxnews.com/foxnews.com/content/uploads/2021/01/The-Weeknd-1.jpg',
    publishedAt: '2021-01-06T03:44:19Z',
    content:
      'The Weeknd is sporting a drastically different look.\r\nOn Tuesday, the 30-year-old musician dropped a music video to accompany the song "Save Your Tears," from his acclaimed album "After Hours."\r\nIn t… [+2406 chars]',
  },
];

function Title({text}) {
  return (
    <Text variant={'bold'} style={styles.head}>
      {text}
    </Text>
  );
}

function HeadlineCard({
  info: {
    urlToImage,
    description,
    source: {name},
  },
}) {
  return (
    <TouchableScale
      style={styles.card}
      onPress={() => {
        console.log('press');
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
          {name}
        </Text>
      </View>
    </TouchableScale>
  );
}
const slideLength = articles.length;

export function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setActiveIndex((s) => {
        return (activeIndex + 1) % slideLength;
      });
    }, 5000);

    return () => {
      clearTimeout(interval);
    };
  }, [activeIndex]);

  return (
    <Screen style={styles.container} variant={'scroll'} withOutHeader>
      <Title text={'Headlines'} />
      <HeadlineCard info={articles[activeIndex]} key={activeIndex.toString()} />
      <Title text={'Todays News'} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
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
});
