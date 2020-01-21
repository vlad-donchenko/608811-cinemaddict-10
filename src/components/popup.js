import AbstractSmartComponent from "./abstract-smart-component";

const USER_RATING_ITEMS = 9;

export const smileImageMap = {
  'emoji-smile': `smile.png`,
  'emoji-sleeping': `sleeping.png`,
  'emoji-gpuke': `puke.png`,
  'emoji-angry': `angry.png`,
};

const createFilmGenreMarkup = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createFilmGenreTemplate = (genres) => {
  const genreMarkup = genres.map((it) => {
    return createFilmGenreMarkup(it);
  });
  return genreMarkup.join(`\n`);
};

const createCommentTemplate = (comment) => {
  const {emoji, commentText, commentAuthor, commentDay} = comment;

  return (
    `<li class="film-details__comment">
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
     </li>`
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
       <ul class="film-details__comments-list">
        ${createCommentListTemplate(comments)}
       </ul>
    `
    );
  } else {
    return ``;
  }
};

const createUserScoreTemplate = (score) => {
  return new Array(USER_RATING_ITEMS).fill(``)
    .map((element, index) => {
      return (
        `
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${index + 1}" id="rating-${index + 1}" ${score === index + 1 ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-${index + 1}">${index + 1}</label>
        `
      );
    })
    .join(`\n`);
};

const createModalTemplate = (film, commentOption, ratingUserOption) => {
  const {name, rating, releaseDate, runtime, genres, poster, description, director, writers, actors, country, age, isWatchlist, isHistory, isFavorites, comments} = film;
  const emojiImage = commentOption;
  const userRatingScore = Number(ratingUserOption);

  const detailsRatingTemplate = (
    `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${poster}" alt="${name}" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${name}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
                ${createUserScoreTemplate(userRatingScore)}
            </div>
          </section>
        </div>
      </section>
    </div>`
  );

  const userTotalRatingTemplate = `<p class="film-details__user-rating">Your rate ${userRatingScore ? userRatingScore : ``}</p>`;

  const showRating = (isHistory) ? detailsRatingTemplate : ``;
  const showTotalRating = (isHistory) ? userTotalRatingTemplate : ``;

  return (
    `<section class="film-details">
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
                  <p class="film-details__title-original">${name}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                  ${showTotalRating}
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
                  <td class="film-details__cell">${releaseDate}</td>
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
                    ${createFilmGenreTemplate(genres)}
                </tr>
              </table>

              <p class="film-details__film-description">
               ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isHistory ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorites ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        ${showRating}

          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
                 <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length > 0 ? comments.length : `0`}</span></h3>
                ${createCommentContentTemplate(comments)}
              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label">
                  ${emojiImage ? `<img src="./images/emoji/${emojiImage}" alt="emoji" width="55" height="55">` : ``}
                 </div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="emoji-smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="emoji-sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="emoji-gpuke">
                  <label class="film-details__emoji-label" for="emoji-gpuke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="emoji-angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
            </div>
            </section>
          </div>
      </form>
    </section>`
  );
};

export default class Popup extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._commentEmoji = null;
    this._userRatingScore = null;
    this._closeButtonClickHandler = null;
    this._watchlistClickHandler = null;
    this._historyClickHandler = null;
    this._favoriteClickHandler = null;
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setWatchlistClickHandler(this._watchlistClickHandler);
    this.setHistoryClickHandler(this._historyClickHandler);
    this.setFavoriteClickHandler(this._favoriteClickHandler);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createModalTemplate(this._film, this._commentEmoji, this._userRatingScore);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._closeButtonClickHandler = handler;
  }

  setWatchlistClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, handler);
    this._watchlistClickHandler = handler;
  }

  setHistoryClickHandler(handler) {
    this.getElement().querySelector(`#watched`).addEventListener(`change`, handler);
    this._historyClickHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, handler);
    this._favoriteClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const userRating = element.querySelector(`.film-details__user-rating-score`);
    const resetUserRating = element.querySelector(`.film-details__watched-reset`);

    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      this._commentEmoji = smileImageMap[evt.target.value];
      this.rerender();
    });

    if (userRating) {
      userRating.addEventListener(`change`, (evt) => {
        this._userRatingScore = evt.target.value;
        this.rerender();
      });

      resetUserRating.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._userRatingScore = null;
        this.rerender();
      });
    }
  }
}
