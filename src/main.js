import fetchData from './js/pixabay-api';
import renderPhoto, {
  clearGallery,
  showLoader,
  hideLoader,
  simplelightbox,
  refreshSlb,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const input = form.elements[0];
input.classList.add('input');
const btn = form.elements[1];
btn.classList.add('button');

simplelightbox;

form.addEventListener('submit', makeGallery);
function makeGallery(event) {
  event.preventDefault();
  clearGallery(gallery);
  showLoader();
  if (input.value === '') {
    hideLoader();
    iziToast.error({
      message: 'Write your something you want to see',
      position: 'topRight',
    });
    return;
  }
  fetchData(input.value)
    .then(data => {
      // тест зображення на порожній рядок
      if (data.data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      renderPhoto(gallery, data.data.hits);
    })
    .catch(() => {
      iziToast.error({
        message: 'Bad request',
        position: 'topRight',
      });
      return;
    })
    .finally(() => {
      hideLoader();
      input.value = '';
    });
}
