import '../pages/index.css'

import ApiNews from './modules/news/apiNews.js';
import CardListNews from './modules/news/cardListNews.js';

const newsContainer = document.querySelector('.news__columns');
const apiNews = new ApiNews('https://newsapi.org/v2/everything?', {
  key: 'ce6db864a3ee4bdbb80e8fe9388fa7e6'
});





const resultsContainer = document.querySelector('.results__container');
//const resultsInner = document.querySelector('.results__inner');
//resultsInner.style.display = 'none';


class Results{
  constructor(container){
    this.container = container;
  }
  showNotFound(){
    let containerFragment = document.createDocumentFragment();

    let notFoundElement = document.createElement('div');
    notFoundElement.classList.add('not-found');
  
    let notFoundElementIcon = document.createElement('img');
    notFoundElementIcon.classList.add('not-found__icon');
    notFoundElementIcon.src = './images/i-not-found.svg';
    notFoundElementIcon.alt = 'Ничего не найдено';
  
    let notFoundElementTitle = document.createElement('h2');
    notFoundElementTitle.classList.add('not-found__title');
    notFoundElementTitle.textContent = 'Ничего не найдено';
  
    let notFoundElementText = document.createElement('p');
    notFoundElementText.classList.add('not-found__text');
    notFoundElementText.textContent = 'К сожалению по вашему запросу ничего не найдено.';
  
    notFoundElement.appendChild(notFoundElementIcon);
    notFoundElement.appendChild(notFoundElementTitle);
    notFoundElement.appendChild(notFoundElementText);

    containerFragment.appendChild(notFoundElement);

    this.container.appendChild(notFoundElement);
  
    return notFoundElement;
  }

  showPreloader(){
    let containerFragment = document.createDocumentFragment();

    let preloader = document.createElement('div');
    preloader.classList.add('preloader', 'preloader--news');

    let preloaderIcon = document.createElement('div');
    preloaderIcon.classList.add('preloader__icon');

    let preloaderText = document.createElement('div');
    preloaderText.classList.add('preloader__text');
    preloaderText.textContent = 'Идет поиск новостей...';

    preloader.appendChild(preloaderIcon);
    preloader.appendChild(preloaderText);

    containerFragment.appendChild(preloader);

    this.container.appendChild(preloader);

    return preloader;
  }

  removeNotFound(target){    
    this.container.removeChild(target); 
  }

  /*removePreloader(){
    if(this.showNotFound()){
      this.container.removeChild(this.container.firstChild);
    }  
  }*/

  clearCardsNews(){
    while(newsContainer.firstChild){
      newsContainer.removeChild(newsContainer.firstChild);
    }
  }
 
}

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

    // при повторном запросе делаем очистку карточек с новостями
    results.clearCardsNews()

    apiNews.getInitialNewsCards(text, dateFrom, dateTo)
      .then((cards) => {       
             

        if (!cards.ok) {
          //results.showPreloader();
        }     

        new CardListNews(newsContainer, cards);       


      }).catch(function (err) {    
        
        //results.showNotFound();

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