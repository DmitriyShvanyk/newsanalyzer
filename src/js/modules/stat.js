import { dateFrom, day } from '../main.js'
import { analyticsContainer, uniqMonths, showMonths } from '../analytics.js'

export default class Stat {
  constructor(keyText = 'Что-то, где-то', cards) {
    this.keyText = keyText;
    this._cards = cards;
    this.countTextRequestInTitle();
  }

  viewStat(count) {
    const outputRequest = document.querySelector('.output__request');
    const outputWeeklyNews = document.querySelector('.output__weekly-news');
    const outputMentionsTitles = document.querySelector('.output__mentions-titles');

    outputRequest.textContent = this.keyText;
    outputWeeklyNews.textContent = this._cards.totalResults;
    outputMentionsTitles.textContent = count;
  }

  countTextRequestInTitle() {
    let count = 0;
    const articles = this._cards.articles;

    for (let i = 0; i < articles.length; i++) {
      if (articles[i].title.toLowerCase().includes(this.keyText.toLowerCase())) {
        count++;
      }
    }
    this.viewStat(count);
  }

  getArticlesPerDay() {
    const articlesDay = {};
    const articles = this._cards.articles;

    for (let i = 0; i < articles.length; i++) {

      const datePublished = new Date(articles[i].publishedAt.slice(0, 10)).getDate();

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
    const fragment = document.createDocumentFragment();
    const graph = document.createElement('div');
    const graphInner = document.createElement('div');
    const graphHead = document.createElement('div');
    const graphColumns = document.createElement('div');
    const graphScale = document.createElement('div');
    const graphBody = document.createElement('div');

    graph.classList.add('graph');
    graphInner.classList.add('graph__inner');
    graphHead.classList.add('graph__head');
    graphColumns.classList.add('graph__columns');
    graphScale.classList.add('graph__scale');
    graphBody.classList.add('graph__body');

    for (let i = 1; i <= 2; i++) {
      const graphColumn = document.createElement('div');
      graphColumn.classList.add(`graph__column`, `graph__column--${i}`);
      graphColumns.appendChild(graphColumn);

      if (i === 1) {
        const graphDateMonth = document.createElement('div');
        const graphMonth = document.createElement('span');

        graphDateMonth.classList.add('graph__date-month');
        graphMonth.classList.add('graph__span');

        graphDateMonth.textContent = 'Дата';
        graphMonth.textContent = `${uniqMonths(showMonths(this._cards.articles))}`;

        graphDateMonth.appendChild(graphMonth);
        graphColumn.appendChild(graphDateMonth);
      }
      else if (i === 2) {
        const graphCount = document.createElement('div');
        graphCount.classList.add('graph__count');
        graphCount.textContent = 'Кол-во упоминаний';
        graphColumn.appendChild(graphCount);
      }

    }

    for (let i = 0; i < 5; i++) {
      const graphScaleItem = document.createElement('div');
      graphScaleItem.classList.add('graph__scale-item');
      graphScaleItem.textContent = `${i * 25}`;
      graphScale.appendChild(graphScaleItem);
    }

    for (let i = 0; i < 7; i++) {
      const dayMilliseconds = day * i;
      const date = new Date(dateFrom.getTime() + dayMilliseconds);
      const dateOfWeek = date.getDate();
      const dayOfWeek = date.toLocaleString('ru', { weekday: 'short' });
      const graphColumns = document.createElement('div');

      graphColumns.classList.add('graph__columns', 'graph__columns--center');
      graphBody.appendChild(graphColumns);

      for (let j = 1; j <= 2; j++) {
        const graphColumn = document.createElement('div');
        graphColumn.classList.add('graph__column');
        graphColumns.appendChild(graphColumn);

        if (j === 1) {
          const graphDate = document.createElement('div');
          graphDate.classList.add(`graph__date`, `graph__date--${i + 1}`);
          graphDate.textContent = `${dateOfWeek}, ${dayOfWeek}`;
          graphColumn.appendChild(graphDate);
        }
        else if (j === 2) {
          const progress = document.createElement('div');
          const progressBar = document.createElement('progress');
          const progressBarNull = 'progress__count--null';
          const progressCount = document.createElement('span');

          progress.classList.add('progress');
          progressBar.classList.add('progress__bar');
          progressCount.classList.add('progress__count');

          progressBar.max = `${100}`;

          if (articlesDay !== undefined) {
            if (dateOfWeek in articlesDay) {
              progressCount.textContent = `${articlesDay[dateOfWeek]}`;
              progressBar.value = `${articlesDay[dateOfWeek]}`;

              if (progressBar.value < 2) {
                progressCount.classList.add(progressBarNull);
              }

            } else {
              progressCount.classList.add(progressBarNull);
              progressCount.textContent = '0';
              progressBar.value = '0';
            }

          }

          progress.appendChild(progressBar);
          progress.appendChild(progressCount);
          graphColumn.appendChild(progress);
        }

      }

    }

    const graphScale2 = graphScale.cloneNode(true);

    graphHead.appendChild(graphColumns);
    graphInner.appendChild(graphHead);
    graphInner.appendChild(graphScale);
    graphInner.appendChild(graphBody);
    graphInner.appendChild(graphScale2);
    graph.appendChild(graphInner);
    fragment.appendChild(graph);
    analyticsContainer.appendChild(fragment);

    return graph;
  }

}