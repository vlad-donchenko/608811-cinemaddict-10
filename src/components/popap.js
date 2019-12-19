const createFilmGenreMarkup = (ganre) => {
  return `<span class="film-details__genre">${ganre}</span>`;
};

const createFilmTemplate = (ganres) => {
  const genreMarkup = ganres.map((it) => {
    return createFilmGenreMarkup(it);
  });
  return genreMarkup.join(`\n`);
};

const createCommentTemplate = (comment) => {
  const {emoji, commentText, commentAuthor, commentDay} = comment;

  return (
    `
     <li class="film-details__comment">
        <span class="film-details__comment-emoji">
            <img src="${emoji}" width="55" height="55" alt="emoji">
        </span>
        <div>
            <p class="film-details__comment-text">${commentText}</p>
                <p class="film-details__comment-info">
                <span class="film-details__comment-author">${commentAuthor}</span>
                <span class="film-details__comment-day">${commentDay}</span>
                <button class="film-details__comment-delete">Delete</button>
            </p>
        </div>
     </li>
    `
  );
};

const createCommentListTemplate = (comments) => {
  const commentMarkup = comments.map((it) => {
    return createCommentTemplate(it);
  });

  return commentMarkup.join(`\n`);
};

const createCommentContentTemplate = (comments) => {

  if (comments.length > 0) {
    return (
      `
       <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
       <ul class="film-details__comments-list">
        ${createCommentListTemplate(comments)}
       </ul>
    `
    );
  } else {
    return ``;
  }
};

const createCommentWrapperTemplate = (comment) => {
  return (
    `
    <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">

            ${createCommentContentTemplate(comment)}

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
    `
  );
};

const createModalTemplate = (popap, comment) => {
  const {poster, name, originalName, rating, director, writers, actors, year, runtime, country, genres, age, description} = popap;

  return (
    `
    <section class="film-details" style="display: none;">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${name}">

              <p class="film-details__age">${age}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">${originalName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${year}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${createFilmTemplate(genres)}
                </tr>
              </table>

              <p class="film-details__film-description">
               ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

         ${createCommentWrapperTemplate(comment)}
      </form>
    </section>
    `
  );
};

export {createModalTemplate};
