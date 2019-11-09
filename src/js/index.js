import '../pages/index.css';
import ApiNews from './modules/news/apiNews.js';
import CardListNews from './modules/news/cardListNews.js';

export const newsContainer = document.querySelector('.news__columns');
export const newsBtnMore = document.querySelector('.news__btn-more');

const apiNews = new ApiNews({
  baseURL: 'https://newsapi.org/v2/everything?',
  key: 'ce6db864a3ee4bdbb80e8fe9388fa7e6',
  credentials: 'include'
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

    displayResults();

  }
  else {
    event.preventDefault();
    hasErrors.focus();
  }

});


function displayResults() {

  // при повторном запросе делаем очистку
  results.removeCards();
  results.removeNotFound();
  results.removePreloader();
  newsBtnMore.classList.remove('news__btn-more--active');

  const date = new Date();
  const dateTime = date.getTime();
  const date6Days = 60 * 60 * 1000 * 24 * 6;
  const dateFrom = new Date(dateTime - date6Days).toISOString();
  const dateTo = date.toISOString();

  const text = document.querySelector('.form-search__control').value;

  apiNews.getInitialNewsCards(text, dateFrom, dateTo)
    .then((cards) => {

      resultsContainer.classList.add('results__container--active');
      results.showPreloader();

      // set storage
      localStorage.setItem('cards', JSON.stringify(cards));
      localStorage.setItem('text', JSON.stringify(text));


      // get storage
      const cardsStorage = JSON.parse(localStorage.getItem('cards'));
      //console.log(cardsStorage);

      const textStorage = JSON.parse(localStorage.getItem('text'));
      //console.log(textStorage);


      setTimeout(function () {

        if (cardsStorage.articles.length === 0) {
          resultsInner.classList.remove('results__inner--active');
          newsBtnMore.classList.remove('news__btn-more--active');
          results.removePreloader();
          results.showNotFound('Ничего не найдено', 'К сожалению по вашему запросу ничего не найдено.');
        }

        else if (cardsStorage.articles.length > 3) {
          results.removePreloader();
          results.removeNotFound();
          resultsInner.classList.add('results__inner--active');
          newsBtnMore.classList.add('news__btn-more--active');

          new CardListNews(newsContainer, cardsStorage);
        }

        else {
          results.removePreloader();
          results.removeNotFound();
          resultsInner.classList.add('results__inner--active');

          new CardListNews(newsContainer, cardsStorage);
        }

      }, 5000);


    }).catch(function (err) {
      resultsContainer.classList.add('results__container--active');
      resultsInner.classList.remove('results__inner--active');

      results.showNotFound('Во время запроса произошла ошибка', 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');

      return Promise.reject(`Ошибка: ${err.status}`);
    });

}



function displayResultsAfterReload() {

  const cardsStorage = JSON.parse(localStorage.getItem('cards'));

  if(!cardsStorage){
    return
  }
  
  resultsContainer.classList.add('results__container--active');
  resultsInner.classList.add('results__inner--active');

  new CardListNews(newsContainer, cardsStorage);

  if (cardsStorage.articles.length === 0) {
    newsBtnMore.classList.remove('news__btn-more--active');
    resultsContainer.classList.remove('results__container--active');
    resultsInner.classList.remove('results__inner--active');
  }
  else if (cardsStorage.articles.length > 3) {
    newsBtnMore.classList.add('news__btn-more--active');
  }
  else {
    newsBtnMore.classList.remove('news__btn-more--active');
  }

}

window.addEventListener('load', displayResultsAfterReload);


