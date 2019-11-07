import '../pages/index.css'

import ApiNews from './modules/news/apiNews.js';
import CardListNews from './modules/news/cardListNews.js';

const newsContainer = document.querySelector('.news__columns');
const apiNews = new ApiNews('https://newsapi.org/v2/everything?', {
  key: 'ce6db864a3ee4bdbb80e8fe9388fa7e6'
});

apiNews.getInitialNewsCards()
  .then((cards) => {

    new CardListNews(newsContainer, cards);

  }).catch(function (err) {

    return Promise.reject(`Ошибка: ${err.status}`);

  });



// Validation
import Validate from "./modules/validate.js"

const formSearch = document.querySelector('.form-search');
const formSearchValidate = new Validate(formSearch);

formSearchValidate.addEventListener('input', (event) => {
  formSearchValidate.checkField(event);
});