import AbstractComponent from "./abstract";

const creatFilmExtraTemplate = (sectionTitle) => {
  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">${sectionTitle}</h2>
        <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmExtra extends AbstractComponent {
  constructor(sectionTitle) {
    super();
    this._sectionTitle = sectionTitle;
  }

  getTemplate() {
    return creatFilmExtraTemplate(this._sectionTitle);
  }
}
