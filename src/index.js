
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import API from './js/fetch'
let lightbox;

function initLightBox() {
  lightbox = new SimpleLightbox('.gallery div', {
    captionsData: 'alt',
    captionDelay: 300,
  });
}

Notiflix.Notify.init({
  useIcon: false,
});



export const refs = {
    input: document.querySelector('#search-form'),
    btnMore: document.querySelector('.js-btn-more'),
    divRender: document.querySelector('.js-gallery'),
    gallery: document.querySelector('.gallery'),
    pageNumber: 1,
    searchInputValue: '',
  };

  

  refs.input.addEventListener('submit', loadPictures)
  refs.btnMore.addEventListener('click', nextPage)
  refs.gallery.addEventListener('click', initLightBox)





  function loadPictures(event){
    event.preventDefault();
    
    
    refs.divRender.innerHTML = ""
    refs.searchInputValue = event.target.elements[0].value.trim()

    

    API.fetchSearchFN().then(renderPhoto)
  }

  
  function nextPage(){
      refs.pageNumber += 1
    API.fetchSearchFN().then(renderPhoto)

  }
// console.log(refs.input[1])


refs.input[0].addEventListener('input', addInput)
  

function addInput(){
    if(refs.input[0].value !== ''){
    refs.input[1].removeAttribute("disabled")
  }
}

  function renderPhoto(){
    API.fetchSearchFN().then((data) => {
      const nameserch = refs.searchInputValue
      
      if (data.total === 0){
          Notiflix.Notify.failure(`❌ Oops, Попробуйте корректно ввести запрос`);
        return
    } else if(nameserch === refs.searchInputValue){
    refs.input[1].setAttribute("disabled", "disabled")
    refs.input[0].value = ''
    refs.btnMore.classList.remove('is-hidden')
  }


    console.log(data)
    Notiflix.Notify.success(`Показано ${data.hits.length}-изображений по запросу ${refs.searchInputValue}`);
    const markup = data.hits.map(
      ({
        likes,
        webformatURL,
        largeImageURL,
        tags,
        views,
        comments,
        downloads,
      }) => 
      `<div class="photo-card" href="${largeImageURL}">
      <div class="border-img_conteiner">
        <img class="border-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span class="info-item-number">${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span class="info-item-number">${views}</span> 
        </p>
        <p class="info-item">
          <b>Comments </b>
          <span class="info-item-number">${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span class="info-item-number">${downloads}</span>
        </p>
      </div>
    </div>`).join('');
refs.divRender.insertAdjacentHTML('beforeend', markup)


    })
  }