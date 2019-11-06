export default class Loader{
  load(ms){
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }
}