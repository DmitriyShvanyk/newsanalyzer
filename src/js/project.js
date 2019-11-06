import '../../node_modules/swiper/css/swiper.css';
import '../pages/project.css';

import ApiGithub from './modules/github/apiGithub.js';
import CardListGithub from './modules/github/cardListGithub.js';

const cardsContainer = document.querySelector('.swiper-wrapper');
const apiGithub = new ApiGithub(`https://api.github.com/repos/DmitriyShvanyk/newsanalyzer/commits`);

apiGithub.getInitialCardCommit()
  .then(cards => {
    new CardListGithub(cardsContainer, cards);
  }).catch(function (err) {
    return Promise.reject(`Ошибка: ${err.status}`);
  });