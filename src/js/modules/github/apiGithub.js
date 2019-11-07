import Api from './../api.js';

export default class ApiGithub extends Api {
  constructor(...args) {
    super(...args);
  }
  getInitialCommitCards() {
    return fetch(`${this.url}`, {
      headers: this.headers
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });

  }
}