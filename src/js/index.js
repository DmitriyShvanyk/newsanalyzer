import '../pages/index.css'
import ApiNews from './modules/news/apiNews.js'
import CardListNews from './modules/news/cardListNews.js'
import LazyLoad from './modules/lazyLoad.js'
import Results from './modules/results.js'
import Validate from "./modules/validate.js"
import { dateFrom, dateTo } from './main.js'

export const newsContainer = document.querySelector('.news__columns');
export const newsBtnMore = document.querySelector('.news__btn-more');
export const newsBtnMoreActive = 'news__btn-more--active';


// API News
const apiNews = new ApiNews({
  baseURL: 'https://newsapi.org/v2/everything?',
  key: 'ce6db864a3ee4bdbb80e8fe9388fa7e6',
  credentials: 'include'
});


// Results
const resultsContainer = document.querySelector('.results__container');
const resultsInner = document.querySelector('.results__inner');
const results = new Results(resultsContainer);


// Validation
const formSearch = document.querySelector('.form-search');
const formSearchControl = document.querySelector('.form-search__control');
const validateformSearch = new Validate(formSearch);


// Request result cards
class Request {
  constructor() {
    window.addEventListener('DOMContentLoaded', () => {
      this.renderAfterReload();
      new LazyLoad();
    });
    window.addEventListener('click', () => new LazyLoad());
    window.addEventListener('scroll', () => new LazyLoad());
  }

  render() {

    localStorage.clear();
    results.removeCards();
    results.removeRequestError();
    results.removePreloader();
    newsBtnMore.classList.remove(newsBtnMoreActive);

    const keyText = formSearchControl.value.trim();

    apiNews.getInitialNewsCards(keyText, dateFrom.toISOString(), dateTo.toISOString())
      .then((cards) => {

        resultsContainer.classList.add('results__container--active');
        results.showPreloader();

        // set storage
        localStorage.setItem('cards', JSON.stringify(cards));
        localStorage.setItem('keyText', JSON.stringify(keyText));

        // get storage
        const cardsStorage = JSON.parse(localStorage.getItem('cards'));

        setTimeout(() => {

          if (cardsStorage.articles.length === 0) {
            resultsInner.classList.remove('results__inner--active');
            newsBtnMore.classList.remove(newsBtnMoreActive);
            results.removePreloader();
            results.showRequestError(
              'Ничего не найдено',
              'К сожалению по вашему запросу ничего не найдено.'
            );
          }

          else if (cardsStorage.articles.length > 3) {
            results.removePreloader();
            results.removeRequestError();
            resultsInner.classList.add('results__inner--active');
            newsBtnMore.classList.add(newsBtnMoreActive);

            new CardListNews(newsContainer, cardsStorage);
          }

          else {
            results.removePreloader();
            results.removeRequestError();
            resultsInner.classList.add('results__inner--active');

            new CardListNews(newsContainer, cardsStorage);
          }

        }, 5000);


      }).catch(err => {
        resultsContainer.classList.add('results__container--active');
        resultsInner.classList.remove('results__inner--active');

        results.showRequestError(
          'Во время запроса произошла ошибка',
          'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
        );

        return Promise.reject(`Ошибка: ${err.status}`);
      });

  }

  renderAfterReload() {

    const cardsStorage = JSON.parse(localStorage.getItem('cards'));

    if (!cardsStorage) {
      return;
    }

    resultsContainer.classList.add('results__container--active');
    resultsInner.classList.add('results__inner--active');

    new CardListNews(newsContainer, cardsStorage);

    if (cardsStorage.articles.length === 0) {
      newsBtnMore.classList.remove(newsBtnMoreActive);
      resultsContainer.classList.remove('results__container--active');
      resultsInner.classList.remove('results__inner--active');
    }
    else if (cardsStorage.articles.length > 3) {
      newsBtnMore.classList.add(newsBtnMoreActive);
    }
    else {
      newsBtnMore.classList.remove(newsBtnMoreActive);
    }

  }

}

const request = new Request();



// Validation
validateformSearch.addEventListener('submit', (event) => {

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

    // Render new cards
    request.render();

  }
  else {
    event.preventDefault();
    hasErrors.focus();
  }

});