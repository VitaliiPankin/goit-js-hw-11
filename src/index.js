import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

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







const fetchSearchFN = async () => {
    const {data} = await axios.get(`?key=26643040-32c641035684a1e3b6d895020&q=${searchInputValue}&page=${refs.pageNumber}&per_page=${8}&image_type=photo&orientation=horizontal&safesearch=true`)
    
  return data
  }


  function loadPictures(event){
    event.preventDefault();
    
    
    refs.divRender.innerHTML = ""
    searchInputValue = event.target.elements[0].value.trim()

    

    fetchSearchFN().then(renderPhoto)
  }

  
  function nextPage(){
      refs.pageNumber += 1
    fetchSearchFN().then(renderPhoto)

  }
// console.log(refs.input[1])


refs.input[0].addEventListener('input', addInput)
  

function addInput(){
    if(refs.input[0].value !== ''){
    refs.input[1].removeAttribute("disabled")
  }
}

  function renderPhoto(){
    fetchSearchFN().then((data) => {
      const nameserch = searchInputValue
      
      if (data.total === 0){
          Notiflix.Notify.failure(`❌ Oops, Попробуйте корректно ввести запрос`);
        return
    } else if(nameserch === searchInputValue){
    refs.input[1].setAttribute("disabled", "disabled")
    refs.input[0].value = ''
  }


    console.log(data)
    Notiflix.Notify.success(`Показано ${data.hits.length}-изображений по запросу ${searchInputValue}`);
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