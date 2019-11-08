import '../pages/index.css';
import ApiNews from './modules/news/apiNews.js';
import CardListNews from './modules/news/cardListNews.js';

export const newsContainer = document.querySelector('.news__columns');

const apiNews = new ApiNews({
  baseURL: 'https://newsapi.org/v2/everything?',
  key: 'ce6db864a3ee4bdbb80e8fe9388fa7e6'
});



// Results
const resultsContainer = document.querySelector('.results__container');
const resultsInner = document.querySelector('.results__inner');

import Results from './modules/results.js';
const results = new Results(resultsContainer);


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

    // при повторном запросе делаем очистку
    results.removeCards();
    results.removeNotFound();
    results.removePreloader();

    apiNews.getInitialNewsCards(text, dateFrom, dateTo)
      .then((cards) => {

        //console.log(cards.articles.length);

        resultsContainer.classList.add('results__container--active');       

        results.showPreloader();

        setTimeout(function(){

          if (cards.articles.length > 3) {
            document.querySelector('.news__more').style.display = 'block';
          }
          else {
            document.querySelector('.news__more').style.display = 'none';
          }
  
          if (cards.articles.length === 0) {
            resultsInner.classList.remove('results__inner--active');
            results.removePreloader();
            results.showNotFound('Ничего не найдено', 'К сожалению по вашему запросу ничего не найдено.');
            document.querySelector('.news__more').style.display = 'none';
          }  
          else {
            results.removePreloader();
            results.removeNotFound();
  
            resultsInner.classList.add('results__inner--active');
  
            new CardListNews(newsContainer, cards);
          }

        }, 5000);


      }).catch(function (err) {

        resultsInner.classList.remove('results__inner--active');

        results.showNotFound('Во время запроса произошла ошибка', 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');

        return Promise.reject(`Ошибка: ${err.status}`);
      });

    //console.log('OK');

    target.reset();

  }
  else {
    event.preventDefault();
    hasErrors.focus();
    //console.error('ERROR')
  }

});