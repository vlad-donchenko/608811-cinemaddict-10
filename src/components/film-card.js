import {createElement} from '../utils.js';

const createCardTemplate = (film) => {
  const {name, rating, year, runtime, genres, poster, description, comments} = film;
  const commentsWithTitle = `${comments} ${(comments > 1) ? `comments` : `comment`}`;

  return (
    `
     <article class="film-card">
       <h3 class="film-card__title">${name}</h3>
       <p class="film-card__rating">${rating}</p>
       <p class="film-card__info">
         <span class="film-card__year">${year}</span>
         <span class="film-card__duration">${runtime}</span>
         <span class="film-card__genre">${genres[0]}</span>
       </p>
       <img src="${poster}" alt="" class="film-card__poster">
       <p class="film-card__description">${description}</p>
       <a class="film-card__comments">${commentsWithTitle}</a>
       <form class="film-card__controls">
         <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
         <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
         <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
       </form>
     </article>
    `
  );
};

class FilmCard {
  constructor(film) {
    this._film = film;
    this.element = null;
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

export {createCardTemplate};
