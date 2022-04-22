
const refs = {
    input: document.querySelector('#search-form'),
    btnMore: document.querySelector('.js-btn-more'),
    divRender: document.querySelector('.js-gallery'),
    pageNumber: 1,
  };

  refs.input.addEventListener('submit', loadPictures)
  refs.btnMore.addEventListener('click', nextPage)

  function loadPictures(event){
    event.preventDefault();
 
    
    const searchInputValue = event.target.elements[0].value.trim()
    console.log(searchInputValue)
    

    fetchSearchFN(searchInputValue).then(renderPhoto)
  }
  function nextPage(data){
    
    loadPictures(data).then(renderPhoto)
  }

  function fetchSearchFN(searchValue) {
    return fetch(
      `https://pixabay.com/api/?key=26643040-32c641035684a1e3b6d895020&q=${searchValue}&page=${refs.pageNumber}&per_page=${8}&image_type=photo&orientation=horizontal&safesearch=true`,
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }


//   function renderPhoto (data) {
//     if (data.total === 0){
//         return
//     }
//   refs.pageNumber +=1
 
//       const markup = data.hits.map((r) => 
//       `<div class="photo-card">
//       <img src="${r.largeImageURL}" alt="${r.tags}" loading="${r.webformatURL}"/>
//       <div class="info">
//         <p class="info-item">
//           <b>Likes: ${r.likes}</b>
//         </p>
//         <p class="info-item">
//           <b>Views: ${r.views}</b>
//         </p>
//         <p class="info-item">
//           <b>Comments: ${r.comments}</b>
//         </p>
//         <p class="info-item">
//           <b>Downloads: ${r.downloads}</b>
//         </p>
//       </div>
//     </div>`).join('');
// refs.divRender.insertAdjacentHTML('beforeend', markup)
// }


