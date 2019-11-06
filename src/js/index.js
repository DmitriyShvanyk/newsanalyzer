import '../pages/index.css'

import ApiNews from './modules/news/apiNews.js';
import CardListNews from './modules/news/cardListNews';

const newsContainer = document.querySelector('.news__columns');
const apiNews = new ApiNews('https://newsapi.org/v2/everything?', 'ce6db864a3ee4bdbb80e8fe9388fa7e6');

apiNews.getInitialCardNews()
  .then((cards) => {
    //console.log(cards);
    new CardListNews(newsContainer, cards);
  }).catch(function (err) {
    return Promise.reject(`Ошибка: ${err.status}`);
  })