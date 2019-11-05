export default class ApiGithub {
  constructor(url) {
    this.url = url;
  }
  getInitialCardCommit() {
    return fetch(`${this.url}`, {
      headers: this.headers
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });

  }

}