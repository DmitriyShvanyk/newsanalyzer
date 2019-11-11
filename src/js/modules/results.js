import { newsContainer } from '../index.js';

export default class Results {
  constructor(container) {
    this.container = container;
  }

  showNotFound(title = 'Ничего не найдено', text = 'К сожалению по вашему запросу ничего не найдено.') {
    let containerFragment = document.createDocumentFragment();
    let notFoundElement = document.createElement('div');
    let notFoundElementIcon = document.createElement('img');
    let notFoundElementTitle = document.createElement('h2');
    let notFoundElementText = document.createElement('p');

    notFoundElement.classList.add('not-found');
    notFoundElementTitle.classList.add('not-found__title');
    notFoundElementText.classList.add('not-found__text');

    notFoundElementIcon.classList.add('not-found__icon');
    notFoundElementIcon.src = './images/i-not-found.svg';
    notFoundElementIcon.alt = title;
    notFoundElementTitle.textContent = title;
    notFoundElementText.textContent = text;

    notFoundElement.appendChild(notFoundElementIcon);
    notFoundElement.appendChild(notFoundElementTitle);
    notFoundElement.appendChild(notFoundElementText);
    containerFragment.appendChild(notFoundElement);
    this.container.appendChild(containerFragment);

    return notFoundElement;
  }

  showPreloader() {
    let containerFragment = document.createDocumentFragment();
    let preloader = document.createElement('div');
    let preloaderIcon = document.createElement('div');
    let preloaderText = document.createElement('div');

    preloader.classList.add('preloader', 'preloader--news');
    preloaderIcon.classList.add('preloader__icon');
    preloaderText.classList.add('preloader__text');
    preloaderText.textContent = 'Идет поиск новостей...';

    preloader.appendChild(preloaderIcon);
    preloader.appendChild(preloaderText);
    containerFragment.appendChild(preloader);
    this.container.appendChild(containerFragment);

    return preloader;
  }  

  removeNotFound() {
    const notFound = this.container.querySelector('.not-found');
    if (notFound) {
      this.container.removeChild(notFound);
    }
  }

  removePreloader() {
    const preloaderNews = this.container.querySelector('.preloader--news');
    if (preloaderNews) {
      this.container.removeChild(preloaderNews);
    }
  }

  removeCards() {
    while (newsContainer.firstChild) {
      newsContainer.removeChild(newsContainer.firstChild);
    }
  }

}