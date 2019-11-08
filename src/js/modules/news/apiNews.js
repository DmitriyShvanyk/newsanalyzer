import Api from './../api.js';

export default class ApiNews extends Api {
  constructor(...args) {
    super(...args);
  }
  getInitialNewsCards(requestText, dateFrom, dateTo) {    
    return fetch(`${this.options.baseURL}q=${requestText}&apiKey=${this.options.key}&from=${dateFrom}&to=${dateTo}&language=ru&pageSize=100&sortBy=popularity`, {
      headers: this.headers
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      });

  }

}

