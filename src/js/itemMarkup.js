const createMarkup = data => {
  return data.hits
    .map(item => {
      const {
        tags,
        webformatURL,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      } = item;
      return `<div class='item-container'>
                    <a class='img-link' href=${largeImageURL}>
                      <img alt=${tags} src=${webformatURL} loading='lazy' />
                    </a>
                    <ul class='img-stats'>
                      <li class='img-li'>
                        <b class='img-li-title'>Likes</b>
                        <p class='img-li-txt'>${likes}</p>
                      </li>
                      <li class='img-li'>
                        <b class='img-li-title'>Views</b>
                        <p class='img-li-txt'>${views}</p>
                      </li>
                      <li class='img-li'>
                        <b class='img-li-title'>Comments</b>
                        <p class='img-li-txt'>${comments}</p>
                      </li>
                      <li class='img-li'>
                        <b class='img-li-title'>Downloads</b>
                        <p class='img-li-txt'>${downloads}</p>
                      </li>
                    </ul>
                  </div>`;
    })
    .join('');
};

export default createMarkup;
