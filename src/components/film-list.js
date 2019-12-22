import {createElement} from '../utils.js';

const createFilmsTemplate = () => {
  return (
    `
    <section class="films">
        <section class="films-list">
            <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
            <div class="films-list__container"></div>
        </section>
    </section>
    `
  );
};

export default class FilmList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
  }

  removeElement() {
    this._element = null;
  }
}