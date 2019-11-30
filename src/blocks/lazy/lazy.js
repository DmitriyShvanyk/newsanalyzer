export default class Lazy {
  constructor(classElement) {
    this.classElement = classElement;
    this.imgElement = document.querySelectorAll(classElement);

    this.interObserver();
  }

  interObserver() {
    function onIntersection(imageEntites) {
      imageEntites.forEach(image => {
        if (image.isIntersecting) {
          let imageTarget = image.target;
          imageObserver.unobserve(imageTarget);
          imageTarget.src = imageTarget.dataset.src;

          imageTarget.parentElement.classList.add('lazy__preloader');

          imageTarget.addEventListener('load', () => {
            imageTarget.parentElement.classList.remove('lazy__preloader');
            imageTarget.classList.add('lazy--loaded');
          });

          imageTarget.addEventListener('error', () => {
            imageTarget.src = 'https://via.placeholder.com/370x250/1A1B22/fff/?text=Image%20not%20found';
          });

        }
      })
    }

    const interactSettings = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }
    const imageObserver = new IntersectionObserver(onIntersection, interactSettings);

    this.imgElement.forEach(image => imageObserver.observe(image));

  }

}