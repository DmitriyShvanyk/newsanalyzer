export default class Stat {
  constructor(text = 'Слово', cards) {
    this.text = text;
    this.cards = cards;
    this.renderTextRequest();
    this.countTextRequestTotal();
    this.countTextRequestInTitle();
    this.renderDateWeek();
    this.renderProgressByDays();
  }

  // отображаем текс запроса
  renderTextRequest() {
    const outputRequest = document.querySelector('.output__request');
    outputRequest.textContent = this.text;
  }

  countTextRequestTotal() {
    const outputWeeklyNews = document.querySelector('.output__weekly-news');
    outputWeeklyNews.textContent = this.cards.totalResults;
  }

  countTextRequestInTitle() {
    let count = 0;
    for (let i = 0; i < this.cards.articles.length; i++) {
      if (this.cards.articles[i].title.toLowerCase().includes(this.text.toLowerCase())) {
        count++;
      }
    }
    const outputMentionsTitles = document.querySelector('.output__mentions-titles');
    outputMentionsTitles.textContent = count;
  }

  renderDateWeek() {
    const dayDOM = document.querySelectorAll('.graph__date');
    const arrDayWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    let date = new Date();

    for (let i = 0; i < dayDOM.length; i++) {
      let diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : (i + 1));
      let dateOfWeek = new Date(date.setDate(diff)).toISOString().slice(8, 10);
      dayDOM[i].textContent = `${dateOfWeek}, ${arrDayWeek[i]}`
    }

    const arrMonth = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    const monthDOM = document.querySelector('.graph__span');
    monthDOM.textContent = `${arrMonth[date.getMonth()]}`;
  }

  renderProgressByDays() {

    const results = {};

    for (let i = 0; i < this.cards.articles.length; i++) {

      let dayPublished = new Date(this.cards.articles[i].publishedAt).getDay();

      if (results[dayPublished] !== undefined) {
        results[dayPublished]++;
      }
      else {
        results[dayPublished] = 1;
      }

    }

    for (let key in results) {
      //console.log(`${key}: ${results[key]}`);
    }

    const progressCount = document.querySelectorAll('.progress__count');
    const progressBar = document.querySelectorAll('.progress__bar');

    for (let i = 0; i < progressCount.length; i++) {

      if (results[i + 1]) {
        progressCount[i].textContent = results[i + 1];
        progressBar[i].value = results[i + 1];
      }
      else {
        progressCount[i].classList.add('progress__count--null');
        progressCount[i].textContent = 0;
        progressBar[i].value = 0;
      }

    }

  }

}