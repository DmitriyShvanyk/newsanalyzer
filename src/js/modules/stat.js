import { dateFrom, day } from '../main.js'
import { timePeriod } from '../analytics.js'

export default class Stat {
  constructor(keyText = 'Что-то, где-то', cards) {
    this.keyText = keyText;
    this.cards = cards;    
    this.getArticlesPerDay();
    this.renderGraph();
  }  

  viewStat(count) {
    const outputRequest = document.querySelector('.output__request');
    const outputWeeklyNews = document.querySelector('.output__weekly-news');
    const outputMentionsTitles = document.querySelector('.output__mentions-titles');

    outputRequest.textContent = this.keyText;
    outputWeeklyNews.textContent = this.cards.totalResults;
    outputMentionsTitles.textContent = count;
  }

  getArticlesPerDay() {    
    const articlesDay = {};
    const articles = this.cards.articles;
    let count = 0;

    for (let i = 0; i < articles.length; i++) {

      const datePublished = new Date(articles[i].publishedAt.slice(0, 10)).getDate();

      if (articles[i].title.toLowerCase().includes(this.keyText.toLowerCase())) {
        count++;
      }           

      if (datePublished in articlesDay) {
        articlesDay[datePublished]++;
      }
      else {
        articlesDay[datePublished] = 1;
      }     

    }

    this.viewStat(count);
    this.renderGraph(articlesDay);
  }

  renderGraph(articlesDay) {
    const graphDate = document.querySelectorAll('.graph__date');
    const progressCount = document.querySelectorAll('.progress__count');
    const progressBar = document.querySelectorAll('.progress__bar');
    const progressBarNull = 'progress__count--null';

    for (let i = 0; i < timePeriod; i++) {
      const dayMilliseconds = day * i;
      const date = new Date(dateFrom.getTime() + dayMilliseconds);
      const dateOfWeek = date.getDate();
      const dayOfWeek = date.toLocaleString('ru', { weekday: 'short' });

      graphDate[i].classList.add(`graph__date--${i}`);
      graphDate[i].textContent = `${dateOfWeek}, ${dayOfWeek}`;
      progressCount[i].classList.add(`progress__count--${i}`);
      progressBar[i].classList.add(`progress__bar--${i}`);

      if (articlesDay !== undefined) {
        if (dateOfWeek in articlesDay) {
          progressCount[i].textContent = `${articlesDay[dateOfWeek]}`;
          progressBar[i].value = `${articlesDay[dateOfWeek]}`;

          if(progressBar[i].value < 2){
            progressCount[i].classList.add(progressBarNull);
          }

        } else {
          progressCount[i].classList.add(progressBarNull);
          progressCount[i].textContent = '0';          
          progressBar[i].value = '0';
        }

      }

    }

  }

}