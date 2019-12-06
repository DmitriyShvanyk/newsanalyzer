export default class Lazy {
  constructor(classElement) {
    this._classElement = classElement;
    this._imgElement = document.querySelectorAll(classElement);

    this.interObserver();
  }

  interObserver() {
    let imageObserver = new IntersectionObserver((images, observer) => {
      images.forEach(image => {
        if (image.isIntersecting) {
          let imageTarget = image.target;          
          imageTarget.src = imageTarget.dataset.src;   
          imageObserver.unobserve(imageTarget);      

          imageTarget.parentElement.classList.add('lazy__preloader');

          imageTarget.addEventListener('load', () => {
            imageTarget.parentElement.classList.remove('lazy__preloader');
            imageTarget.classList.add('lazy--loaded');
          });

          imageTarget.addEventListener('error', () => {
            imageTarget.src = 'https://via.placeholder.com/370x250/1A1B22/fff/?text=Image%20not%20found';
          });

          imageObserver.disconnect();
        }
      });
    });    

    this._imgElement.forEach(image => imageObserver.observe(image));    
    
  }

}