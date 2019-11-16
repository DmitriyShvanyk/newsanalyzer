import '../pages/index.css'
import ApiNews from './modules/news/apiNews.js'
import CardNewsList from './modules/news/cardNewsList.js'
import Results from './modules/results.js'
import Validate from "./modules/validate.js"
import ScrollTo from "./modules/scrollTo.js"
import { dateFrom, dateTo } from './main.js'

export const newsContainer = document.querySelector('.news__columns');
export const newsBtnMore = document.querySelector('.news__btn-more');
export const newsBtnMoreActive = 'news__btn-more--active';


// API News
const apiNews = new ApiNews({
  baseURL: 'https://newsapi.org/v2/everything?',
  key: 'ce6db864a3ee4bdbb80e8fe9388fa7e6'
});


// Results
const resultsContainer = document.querySelector('.results__container');
const resultsContainerActive = 'results__container--active';
const resultsInner = document.querySelector('.results__inner');
const resultsInnerActive = 'results__inner--active';
const results = new Results(resultsContainer);


// Validation
const formSearch = document.querySelector('.form-search');
const formSearchControl = document.querySelector('.form-search__control');
const formSearchSubmit = document.querySelector('.form-search__submit');
const validateformSearch = new Validate(formSearch);


// View news cards
function cardsNewsView() {

  localStorage.clear();

  while (newsContainer.firstChild) {
    newsContainer.removeChild(newsContainer.firstChild);
  }

  results.removeRequestError();
  results.removePreloader();
  newsBtnMore.classList.remove(newsBtnMoreActive);

  const keyText = formSearchControl.value.trim();

  apiNews.initCardsNews(keyText, dateFrom.toISOString(), dateTo.toISOString())
    .then((cards) => {

      formSearchSubmit.setAttribute('disabled', true);

      resultsContainer.classList.add(resultsContainerActive);
      results.showPreloader();

      // set storage
      localStorage.setItem('cards', JSON.stringify(cards));
      localStorage.setItem('keyText', JSON.stringify(keyText));

      // get storage
      const cardsStorage = JSON.parse(localStorage.getItem('cards'));

      if (!cardsStorage) {
        return;
      }

      setTimeout(() => {
        if (cardsStorage.articles.length === 0) {
          formSearchSubmit.removeAttribute('disabled');
          resultsInner.classList.remove(resultsInnerActive);
          results.removePreloader();
          results.showRequestError(
            'Ничего не найдено',
            'К сожалению по вашему запросу ничего не найдено.'
          );
        }
        else if (cardsStorage.articles.length > 3) {
          formSearchSubmit.removeAttribute('disabled');
          results.removePreloader();
          results.removeRequestError();
          resultsInner.classList.add(resultsInnerActive);
          newsBtnMore.classList.add(newsBtnMoreActive);          
          new CardNewsList(newsContainer, cardsStorage);
        }
        else {
          formSearchSubmit.removeAttribute('disabled');
          results.removePreloader();
          results.removeRequestError();
          resultsInner.classList.add(resultsInnerActive);
          newsBtnMore.classList.remove(newsBtnMoreActive);          
          new CardNewsList(newsContainer, cardsStorage);
        }
      }, 0);

    }).catch(err => {
      formSearchSubmit.removeAttribute('disabled');
      resultsContainer.classList.add(resultsContainerActive);
      resultsInner.classList.remove(resultsInnerActive);      
      results.showRequestError(
        'Во время запроса произошла ошибка',
        'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
      );
      return Promise.reject(`Ошибка: ${err.status}`);
    });

}

// Save view news cards
function cardsNewsViewSave() {

  formSearchControl.value = JSON.parse(localStorage.getItem('keyText'));

  const cardsStorage = JSON.parse(localStorage.getItem('cards'));

  if (!cardsStorage) {
    return;
  }

  resultsContainer.classList.add(resultsContainerActive);
  resultsInner.classList.add(resultsInnerActive);

  new CardNewsList(newsContainer, cardsStorage);

  if (cardsStorage.articles.length === 0) {
    resultsContainer.classList.remove(resultsContainerActive);
    resultsInner.classList.remove(resultsInnerActive);
    newsBtnMore.classList.remove(newsBtnMoreActive);
  }
  if (cardsStorage.articles.length > 3) {
    newsBtnMore.classList.add(newsBtnMoreActive);
  }
  else {
    newsBtnMore.classList.remove(newsBtnMoreActive);
  }

}

// if reload page, work before closing the browser
sessionStorage.setItem("isReloaded", true);

if (sessionStorage.getItem("isReloaded")) {
  cardsNewsViewSave();
}


// Validation
const validateForm = event => {

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

    // scroll to block 
    new ScrollTo(formSearchSubmit, resultsContainer);

    // render news cards
    cardsNewsView();

  }
  else {
    event.preventDefault();
    hasErrors.focus();
  }

}
validateformSearch.addEventListener('submit', validateForm);