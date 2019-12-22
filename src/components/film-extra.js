import {createElement} from '../utils.js';

const creatFilmExtraTemplate = (sectionTitle) => {
  return (
    `
    <section class="films-list--extra">
        <h2 class="films-list__title">${sectionTitle}</h2>
        <div class="films-list__container"></div>
    </section>
    `
  );
};

export default class FilmExtra {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return creatFilmExtraTemplate();
  }

  getElement() {
    if (this._element) {
      this._element = createElement(this.getTemplate());
    }
  }

  removeElement() {
    this._element = null;
  }
}
