import Api from './api.js'

export default class ApiGithub extends Api {
  constructor(...args) {
    super(...args);
  }
  async initCardsGithub() {
    const response = await fetch(`${this.options.baseURL}`, {
      headers: this.headers
    });
    if (response.ok) {
      return response.json();
    }    
    return Promise.reject(new Error(`${response.status} ${response.statusText}`));
  }

}