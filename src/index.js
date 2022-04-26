import Notiflix from 'notiflix';
import { fetchSearchFN } from './js/fetch';
import { initLightBox } from './js/simplelightbox';
import { markup } from './js/markup';

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

refs.input.addEventListener('submit', loadPictures);
refs.btnMore.addEventListener('click', nextPage);

function loadPictures(event) {
  event.preventDefault();

  refs.divRender.innerHTML = '';
  refs.searchInputValue = event.target.elements[0].value.trim();

  
  refs.pageNumber = 1;
  renderPhoto();
}

function nextPage() {
  refs.pageNumber += 1;
  renderPhoto();
}

refs.input[0].addEventListener('input', addInput);

function addInput() {
  if (refs.input[0].value !== '') {
    refs.input[1].removeAttribute('disabled');
  }
}

async function renderPhoto() {
  fetchSearchFN().then(data => {
    const nameserch = refs.searchInputValue;

    if (data.total === 0) {
      Notiflix.Notify.failure(`❌ Oops, Попробуйте корректно ввести запрос`);
      return;
    } else if (nameserch === refs.searchInputValue) {
      refs.input[1].setAttribute('disabled', 'disabled');
      refs.input[0].value = '';
      refs.btnMore.classList.remove('is-hidden');
    }

    console.log(data);
    Notiflix.Notify.success(
      `Показано ${data.hits.length}-изображений по запросу ${refs.searchInputValue}`,
    );

    markup(data);
    initLightBox();
  });
}
