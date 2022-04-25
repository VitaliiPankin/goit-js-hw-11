import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function initLightBox() {
  let lightbox = new SimpleLightbox('.gallery div', {
    captionsData: 'alt',
    captionDelay: 300,
    alertError: false,
  });
}
