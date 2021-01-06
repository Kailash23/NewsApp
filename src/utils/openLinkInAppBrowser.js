import {Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export async function openLinkInAppBrowser(url) {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {});
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    __DEV__ && console.log(error);
  }
}
