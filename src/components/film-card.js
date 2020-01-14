import AbstractComponent from "./abstract";

const createCardTemplate = (film) => {
  const {name, rating, year, runtime, genres, poster, description} = film;
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
         <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
         <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
         <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
       </form>
     </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setKeyPressHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`keydown`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`keydown`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`keydown`, handler);
  }

  setWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setHistoryClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
