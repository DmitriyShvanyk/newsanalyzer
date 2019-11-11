import { date, dateFrom, day, monthList, weekList } from '../main.js'

export default class Stat {

  constructor(text = 'Слово', cards) {
    this.text = text;
    this.cards = cards;
    this.countTextRequestInTitle();
    this.getArticlesPerDay();
    this.renderMonth();
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

  renderMonth() {    
    const monthDOM = document.querySelector('.graph__span');
    monthDOM.textContent = `${monthList[date.getMonth()]}`;
  }

  getArticlesPerDay() {
    const articlesDay = {};

    for (let i = 0; i < this.cards.articles.length; i++) {

      let datePublished = new Date(this.cards.articles[i].publishedAt.slice(0, 10)).getDate();
      //console.log(datePublished);

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

    for (let i = 0; i < 7; i++) {
      const dayMilliseconds = day * i;
      const date = new Date(dateFrom.getTime() + dayMilliseconds);
      const dateOfWeek = date.getDate();
      const dayOfWeek = weekList[`${date.getDay()}`];
      graphDate[i].classList.add(`graph__date--${i}`);
      graphDate[i].textContent = `${dateOfWeek}, ${dayOfWeek}`;

      if(articlesDay !== undefined){
        if (dateOfWeek in articlesDay) {
          progressCount[i].textContent = `${articlesDay[dateOfWeek]}`;
          progressBar[i].value = `${articlesDay[dateOfWeek]}`;
        } else {
          progressCount[i].textContent = '0';
          progressCount[i].classList.add('progress__count--null');
          progressBar[i].value = '0';
        }

      }      

    }

  }

}