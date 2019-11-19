export default class Results {
  constructor(container) {
    this._container = container;
  }

  showPreloader() {
    const containerFragment = document.createDocumentFragment();
    const preloader = document.createElement('div');
    const preloaderIcon = document.createElement('div');
    const preloaderText = document.createElement('div');

    preloader.classList.add('preloader', 'preloader--news');
    preloaderIcon.classList.add('preloader__icon');
    preloaderText.classList.add('preloader__text');
    preloaderText.textContent = 'Идет поиск новостей...';

    preloader.appendChild(preloaderIcon);
    preloader.appendChild(preloaderText);
    containerFragment.appendChild(preloader);
    this._container.appendChild(containerFragment);

    return preloader;
  }

  /*showPreloader() {
    const containerFragment = document.createDocumentFragment();
    const preloader = document.querySelector('.preloader');
    const preloaderNews = document.importNode(preloader, true);
    preloaderNews.classList.add('preloader--news');
    preloaderNews.textContent = 'Идет поиск новостей...';
   
    containerFragment.appendChild(preloaderNews);
    this._container.appendChild(containerFragment);

    return preloaderNews;
  }*/

  showRequestError(title = 'Ничего не найдено', text = 'К сожалению по вашему запросу ничего не найдено.') {
    const containerFragment = document.createDocumentFragment();
    const notFoundElement = document.createElement('div');
    const notFoundElementIcon = document.createElement('span');
    const notFoundElementIconArc = document.createElement('span');
    const notFoundElementIconLine = document.createElement('span');
    const notFoundElementTitle = document.createElement('h2');
    const notFoundElementText = document.createElement('p');

    notFoundElement.classList.add('not-found');
    notFoundElementTitle.classList.add('not-found__title');
    notFoundElementText.classList.add('not-found__text');
    notFoundElementIcon.classList.add('not-found__icon');
    notFoundElementIconArc.classList.add('not-found__icon-arc');
    notFoundElementIconLine.classList.add('not-found__icon-line');

    notFoundElementTitle.textContent = title;
    notFoundElementText.textContent = text;

    notFoundElementIcon.appendChild(notFoundElementIconArc);
    notFoundElementIcon.appendChild(notFoundElementIconLine);
    notFoundElement.appendChild(notFoundElementIcon);
    notFoundElement.appendChild(notFoundElementTitle);
    notFoundElement.appendChild(notFoundElementText);
    containerFragment.appendChild(notFoundElement);
    this._container.appendChild(containerFragment);

    return notFoundElement;
  }

  removePreloader() {
    const preloaderNews = this._container.querySelector('.preloader--news');
    if (preloaderNews) {
      this._container.removeChild(preloaderNews);
    }
  }

  removeRequestError() {
    const notFound = this._container.querySelector('.not-found');
    if (notFound) {
      this._container.removeChild(notFound);
    }
  }  

}



