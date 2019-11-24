import Api from './../api.js';

export default class ApiNews extends Api {
  constructor(...args) {
    super(...args);
  }
  async initCardsNews(keyText, dateFrom, dateTo) {
    const url = `${this.options.baseURL}q=${keyText}&apiKey=${this.options.key}&from=${dateFrom}&to=${dateTo}&language=ru&pageSize=100`;
    const response = await fetch(url, {
      headers: this.headers
    });
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);

  }

}