import '../../node_modules/swiper/css/swiper.css';
import '../pages/project.css';

import ApiGithub from './modules/github/apiGithub.js';
import CardGithubList from './modules/github/cardGithubList.js';

const cardsGithubContainer = document.querySelector('.swiper-wrapper');
const apiGithub = new ApiGithub({
  baseURL: 'https://api.github.com/repos/DmitriyShvanyk/newsanalyzer/commits'
});

apiGithub.initCardsGithub()
  .then(cards => {

    new CardGithubList(cardsGithubContainer, cards);

  }).catch(function (err) {
    return Promise.reject(`Ошибка: ${err.status}`);
  });