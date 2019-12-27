import {createElement} from '../utils.js';

const creatFilmExtraTemplate = (sectionTitle) => {
  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">${sectionTitle}</h2>
        <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmExtra {
  constructor(sectionTitle) {
    this._sectionTitle = sectionTitle;
    this._element = null;
  }

  getTemplate() {
    return creatFilmExtraTemplate(this._sectionTitle);
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
