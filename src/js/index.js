import '../pages/index.css'
import ApiNews from './modules/news/apiNews.js'
import CardNewsList from './modules/news/cardNewsList.js'
import ResultsRequest from './modules/resultsRequest.js'
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
const resultsLinkMore = document.querySelector('.results__link-more');
const resultsLinkMoreActive = 'results__link-more--active';
const resultsRequest = new ResultsRequest(resultsContainer);


// Validation
const formSearch = document.querySelector('.form-search');
const formSearchControl = document.querySelector('.form-search__control');
const formSearchSubmit = document.querySelector('.form-search__submit');
const validateformSearch = new Validate(formSearch);


// View news cards
function cardsNewsView() {

  resultsRequest.removeRequestError();
  const keyText = formSearchControl.value.trim();

  if (!keyText) {
    return;
  }

  localStorage.clear();
  removeCards();
  resultsContainer.classList.add(resultsContainerActive);
  resultsRequest.showPreloader();
  resultsLinkMore.classList.add(resultsLinkMoreActive);
  newsBtnMore.classList.remove(newsBtnMoreActive);  

  // set disabled for form submit
  formSearchSubmit.setAttribute('disabled', true);

  apiNews.initCardsNews(keyText, dateFrom.toISOString(), dateTo.toISOString())
    .then(cards => {

      resultsRequest.removePreloader();
      resultsLinkMore.classList.remove(resultsLinkMoreActive);
      formSearchSubmit.removeAttribute('disabled');

      // scroll to block 
      new ScrollTo(formSearchSubmit, resultsContainer);   

      // set storage
      localStorage.setItem('cards', JSON.stringify(cards));
      localStorage.setItem('keyText', JSON.stringify(keyText));

      // get storage
      const cardsStorage = JSON.parse(localStorage.getItem('cards'));

      if (!cardsStorage) {
        return;
      }

      if (cardsStorage.articles.length === 0) {
        localStorage.clear();
        resultsInner.classList.remove(resultsInnerActive);
        resultsRequest.showRequestError(
          'Ничего не найдено',
          'К сожалению по вашему запросу ничего не найдено.'
        );
      }
      else {
        resultsRequest.removeRequestError();
        resultsInner.classList.add(resultsInnerActive);
        new CardNewsList(newsContainer, cardsStorage);

        if (cardsStorage.articles.length > 3) {
          newsBtnMore.classList.add(newsBtnMoreActive);
        }
        else {
          newsBtnMore.classList.remove(newsBtnMoreActive);
        }

      }

    }).catch(err => {

      // remove disabled for form submit
      formSearchSubmit.removeAttribute('disabled');
      resultsContainer.classList.add(resultsContainerActive);
      resultsInner.classList.remove(resultsInnerActive);
      resultsRequest.removePreloader();
      resultsRequest.showRequestError(
        'Во время запроса произошла ошибка',
        'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
      );
      return Promise.reject(`Ошибка: ${err.status}`);
    });

}


// Remove cards
function removeCards() {
  while (newsContainer.firstChild) {
    newsContainer.removeChild(newsContainer.firstChild);
  }
}


// if reload page, work before closing the browser
sessionStorage.setItem("isReloaded", true);

if (sessionStorage.getItem("isReloaded")) {
  formSearchControl.value = JSON.parse(localStorage.getItem('keyText'));  

  // render news cards
  cardsNewsView();
}


// Validation
function validateForm(event) {

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

    // render news cards
    cardsNewsView();

  }
  else {
    event.preventDefault();
    hasErrors.focus();
  }

}

validateformSearch.addEventListener('submit', validateForm);