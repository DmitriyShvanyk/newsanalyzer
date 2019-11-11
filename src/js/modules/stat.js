import { dateFrom, day } from '../main.js'
import { timePeriod } from '../analytics.js'

export default class Stat {
  constructor(text = 'Что-то, где-то', cards) {
    this.text = text;
    this.cards = cards;
    this.countTextRequestInTitle();
    this.getArticlesPerDay();
    this.renderGraph();
  }

  countTextRequestInTitle() {
    let count = 0;
    for (let i = 0; i < this.cards.articles.length; i++) {
      if (this.cards.articles[i].title.toLowerCase().includes(this.text.toLowerCase())) {
        count++;
      }
    }
    this.view(count);
  }

  view(count) {
    const outputRequest = document.querySelector('.output__request');
    const outputWeeklyNews = document.querySelector('.output__weekly-news');
    const outputMentionsTitles = document.querySelector('.output__mentions-titles');

    outputRequest.textContent = this.text;
    outputWeeklyNews.textContent = this.cards.totalResults;
    outputMentionsTitles.textContent = count;
  }

  getArticlesPerDay() {
    
    const articlesDay = {};

    for (let i = 0; i < this.cards.articles.length; i++) {

      const datePublished = new Date(this.cards.articles[i].publishedAt.slice(0, 10)).getDate();      

      if (datePublished in articlesDay) {
        articlesDay[datePublished]++;
      }
      else {
        articlesDay[datePublished] = 1;
      }

    }

    this.renderGraph(articlesDay);
  }

  renderGraph(articlesDay) {
    const graphDate = document.querySelectorAll('.graph__date');
    const progressCount = document.querySelectorAll('.progress__count');
    const progressBar = document.querySelectorAll('.progress__bar');

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
        } else {
          progressCount[i].classList.add('progress__count--null');
          progressCount[i].textContent = '0';          
          progressBar[i].value = '0';
        }

      }

    }

  }

}