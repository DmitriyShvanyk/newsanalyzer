export default class ApiNews {
  constructor(url, key) {
    this.url = url;
    this.key = key;
  }
  getInitialCardNews() {

    //return fetch(`${this.url}q=${requestText}&apiKey=${this.key}&from=${dateFrom}&to=${dateTo}&language=ru&pageSize=100&sortBy=popularity`, {
    return fetch(`${this.url}q=bitcoin&apiKey=${this.key}&language=ru&pageSize=100&sortBy=popularity`, {
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

