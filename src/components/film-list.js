import AbstractComponent from "./abstract";

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

export default class FilmList extends AbstractComponent {
  constructor(filmAmount) {
    super();
    this._filmAmount = filmAmount;
  }

  getTemplate() {
    return createFilmsTemplate(this._filmAmount);
  }
}
