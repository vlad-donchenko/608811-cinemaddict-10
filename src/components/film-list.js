import {createElement} from '../utils.js';

const createFilmsTemplate = (filmsAmount) => {
  const templateWithoutFilms = (
    `<section class="films">
        <section class="films-list">
           <h2 class="films-list__title">There are no movies in our database</h2>
        </section>
    </section>`
  );

  const templateWithFilms = (
    `<section class="films">
        <section class="films-list">
            <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
            <div class="films-list__container"></div>
    </section>`
  );

  return (filmsAmount) ? templateWithFilms : templateWithoutFilms;
};

export default class FilmList {
  constructor(filmAmount) {
    this._filmAmount = filmAmount;
    this._element = null;
  }

  getTemplate() {
    return createFilmsTemplate(this._filmAmount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
