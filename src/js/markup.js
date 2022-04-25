import { refs } from '../index';

export function markup(data) {
  const markup = data.hits
    .map(
      ({ likes, webformatURL, largeImageURL, tags, views, comments, downloads }) =>
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
  </div>`,
    )
    .join('');

  return refs.divRender.insertAdjacentHTML('beforeend', markup);
}
