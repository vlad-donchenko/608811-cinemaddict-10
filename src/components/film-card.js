import AbstractSmartComponent from "./abstract-smart-component";

const createCardTemplate = (film) => {
  const {name, rating, year, runtime, genres, poster, description, isWatchlist, isHistory, isFavorites} = film;
  const commentsWithTitle = `${film.comments.length} ${(film.comments > 1) ? `comments` : `comment`}`;

  return (
    `<article class="film-card">
       <h3 class="film-card__title" tabindex="0">${name}</h3>
       <p class="film-card__rating">${rating}</p>
       <p class="film-card__info">
         <span class="film-card__year">${year}</span>
         <span class="film-card__duration">${runtime}</span>
         <span class="film-card__genre">${genres[0]}</span>
       </p>
       <img src="${poster}" alt="" class="film-card__poster" tabindex="0">
       <p class="film-card__description">${description}</p>
       <a class="film-card__comments" tabindex="0">${commentsWithTitle}</a>
       <form class="film-card__controls">
         <button type="button" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
         <button type="button" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isHistory ? `film-card__controls-item--active` : ``}">Mark as watched</button>
         <button type="button" class="film-card__controls-item button film-card__controls-item--favorite ${isFavorites ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
       </form>
     </article>`
  );
};

export default class FilmCard extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = null;
    this._keyPressHandler = null;
    this._watchlistClickHandler = null;
    this._historyClickHandler = null;
    this._favoriteClickHandler = null;
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setClickHandler(this._clickHandler);
    this.setKeyPressHandler(this._keyPressHandler);
    this.setWatchlistClickHandler(this._watchlistClickHandler);
    this.setHistoryClickHandler(this._historyClickHandler);
    this.setFavoriteClickHandler(this._favoriteClickHandler);
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
    this._clickHandler = handler;
  }

  setKeyPressHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`keydown`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`keydown`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`keydown`, handler);
    this._keyPressHandler = handler;
  }

  setWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
    this._watchlistClickHandler = handler;
  }

  setHistoryClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
    this._historyClickHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
    this._favoriteClickHandler = handler;
  }
}
