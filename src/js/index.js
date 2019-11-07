import '../pages/index.css'

import ApiNews from './modules/news/apiNews.js';
import CardListNews from './modules/news/cardListNews.js';

const newsContainer = document.querySelector('.news__columns');
const apiNews = new ApiNews('https://newsapi.org/v2/everything?', {
  key: 'ce6db864a3ee4bdbb80e8fe9388fa7e6'
});


// Validation
import Validate from "./modules/validate.js"

const formSearch = document.querySelector('.form-search');
const formSearchValidate = new Validate(formSearch);

formSearchValidate.addEventListener('input', (event) => {
  formSearchValidate.checkField(event);
});

formSearchValidate.addEventListener('submit', (event) => {

  event.preventDefault();

  const target = event.target;

  if (!target) {
    return;
  }

  let fields = target.elements;
  let hasErrors;

  for (let i = 0; i < fields.length; i++) {
    let errors = Validate.hasError(fields[i]);
    if (errors) {
      Validate.showError(fields[i], errors);
      if (!hasErrors) {
        hasErrors = fields[i];
      }
    }

  }

  if (!hasErrors) {

    const text = document.querySelector('.form-search__control').value;

    const date = new Date();
    const dateTime = date.getTime();
    const date6Days = 60 * 60 * 1000 * 24 * 6;
    const dateFrom = new Date(dateTime - date6Days).toISOString();
    const dateTo = date.toISOString();

    apiNews.getInitialNewsCards(text, dateFrom, dateTo)
      .then((cards) => {        

        new CardListNews(newsContainer, cards);

      }).catch(function (err) {

        return Promise.reject(`Ошибка: ${err.status}`);

      });

    console.log('OK');

    target.reset();

  }
  else {
    event.preventDefault();
    hasErrors.focus();
    console.error('ERROR')
  }

});