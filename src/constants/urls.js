import {API_TOKEN} from '@env';

export const apiUrls = {
  baseUrl: 'http://newsapi.org/v2/',
  topHeadlines:
    'top-headlines?country=us&category=business&apiKey=' + API_TOKEN,
};
