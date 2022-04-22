import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

function initLightBox() {
  lightbox = new SimpleLightbox('.gallery div', {
    captionsData: 'alt',
    captionDelay: 300,
  });
}

// function resetLightBox() {
//   lightbox.destroy();
//   lightbox = new SimpleLightbox('.gallery div', {
//     captionsData: 'alt',
//     captionDelay: 300,
//   });
// }


const refs = {
    input: document.querySelector('#search-form'),
    btnMore: document.querySelector('.js-btn-more'),
    divRender: document.querySelector('.js-gallery'),
    gallery: document.querySelector('.gallery'),
    pageNumber: 1,
    
  };

  let searchInputValue = '';

  refs.input.addEventListener('submit', loadPictures)
  refs.btnMore.addEventListener('click', nextPage)
  refs.gallery.addEventListener('click', initLightBox)


axios.defaults.baseURL = `https://pixabay.com/api/`;







function fetchSearchFN() {
    return axios.get(`?key=26643040-32c641035684a1e3b6d895020&q=${searchInputValue}&page=${refs.pageNumber}&per_page=${8}&image_type=photo&orientation=horizontal&safesearch=true`)
    
  
  }

  function loadPictures(event){
    event.preventDefault();
    
    
    refs.divRender.innerHTML = ""
    searchInputValue = event.target.elements[0].value.trim()

    

    fetchSearchFN().then(renderPhoto)
  }

 
  function renderPhoto(){
    fetchSearchFN().then(({data}) => {
        if (data.total === 0){
        return
    }
    console.log(data)
  
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
  function nextPage(){
      refs.pageNumber += 1
    fetchSearchFN().then(renderPhoto)

  }



