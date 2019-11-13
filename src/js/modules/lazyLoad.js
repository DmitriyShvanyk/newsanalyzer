export default class LazyLoad {
  constructor() {
    this.interObserver();
  }
  interObserver() {

    const lazyImages = [...document.querySelectorAll('.lazy')];

    const interactSettings = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    function onIntersection(imageEntites) {
      imageEntites.forEach(image => {
        if (image.isIntersecting) {
          let imageTarget = image.target;
          imageObserver.unobserve(imageTarget);
          imageTarget.src = imageTarget.dataset.src;
          imageTarget.onload = () => imageTarget.classList.add('lazy--loaded');

          function errorImage() {
            imageTarget.src = 'https://via.placeholder.com/370x250/1A1B22/fff/?text=Image%20not%20found';
          }
          imageTarget.addEventListener('error', errorImage);           

        }
      })
    }

    const imageObserver = new IntersectionObserver(onIntersection, interactSettings);

    lazyImages.forEach(image => imageObserver.observe(image));

  }

}





