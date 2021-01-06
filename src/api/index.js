import {apiUrls} from '../constants';
import {createAxiosInstance} from '../utils';

export function getTopHeadlines() {
  return createAxiosInstance({
    url: apiUrls.topHeadlines,
  });
}
