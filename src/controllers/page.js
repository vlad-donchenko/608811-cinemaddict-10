import {render, RenderPosition} from "../utils/render";
import FilmCardComponent from "../components/film-card";
import PopupComponent from "../components/popup";
import ShowMoreButtonComponent from "../components/show-more-button";
import FilmExtraComponent from "../components/film-extra";

const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_COUNT_EXTRA_ON_START = 2;


export default class PageController {
  constructor(container) {
    this._container = container;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    if (films.length > 0) {
      const mainFilmsContainer = this._container.querySelector(`.films-list > .films-list__container`);

      const renderFilms = (currentFilm, container) => {
        const body = document.querySelector(`body`);
        const filmCardComponent = new FilmCardComponent(currentFilm);
        const popupComponent = new PopupComponent(currentFilm);

        const closePopup = () => {
          const currentPopup = document.querySelector(`.film-details`);
          body.removeChild(currentPopup);
          document.removeEventListener(`keydown`, closePopupKeyPressHandler);
        };

        const closePopupKeyPressHandler = (evt) => {
          const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
          if (isEscKey) {
            closePopup();
          }
        };

        const closePopupClickHandler = (evt) => {
          evt.preventDefault();
          closePopup();
        };

        const showPopup = () => {
          render(body, popupComponent, RenderPosition.BEFOREEND);
          popupComponent.setCloseButtonClickHandler(closePopupClickHandler);
          document.addEventListener(`keydown`, closePopupKeyPressHandler);
        };

        const showPopupClickHandler = (evt) => {
          evt.preventDefault();
          showPopup();
        };

        const showPopupKeyPressHandler = (evt) => {
          const isEscKey = evt.key === `Enter`;
          const currentPopup = document.querySelector(`.film-details`);

          if (isEscKey && currentPopup === null) {
            showPopup();
          }
        };

        filmCardComponent.setClickHandler(showPopupClickHandler);
        filmCardComponent.setKeyPressHandler(showPopupKeyPressHandler);

        render(container, filmCardComponent, RenderPosition.BEFOREEND);
      };

      let showingFilmCount = SHOWING_FILM_COUNT_ON_START;

      films.slice(0, showingFilmCount).forEach((film) => {
        renderFilms(film, mainFilmsContainer);
      });

      render(this._container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      const getTopRatedFilms = (filmsArray, nameProperty) => {
        return filmsArray.slice().sort((a, b) => {
          return Number(b[nameProperty]) - Number(a[nameProperty]);
        });
      };

      const getMostCommentedFilms = (filmsArray, nameProperty) => {
        return filmsArray.slice().sort((a, b) => {
          return b[nameProperty].length - a[nameProperty].length;
        });
      };

      const renderExtraFilms = (filmsArray, container) => {
        filmsArray.forEach((currentElement) => {
          renderFilms(currentElement, container);
        });
      };

      const checkExtraFilms = (ratingFilms, mostCommentFilms) => {
        if (Number(ratingFilms[0].rating) !== 0 && mostCommentFilms[0].comments.length) {
          ratingFilms = ratingFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);
          mostCommentFilms = mostCommentFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

          render(this._container, new FilmExtraComponent(`Top rated`), RenderPosition.BEFOREEND);
          render(this._container, new FilmExtraComponent(`Most commented`), RenderPosition.BEFOREEND);

          const extraFilmsWrappers = this._container.querySelectorAll(`.films-list--extra`);
          const topRatedFilmsList = extraFilmsWrappers[0].querySelector(`.films-list__container`);
          const mostCommentedFilmsList = extraFilmsWrappers[1].querySelector(`.films-list__container`);
          renderExtraFilms(ratingFilms, topRatedFilmsList);
          renderExtraFilms(mostCommentFilms, mostCommentedFilmsList);

        } else if (Number(ratingFilms[0].rating) !== 0) {
          ratingFilms = ratingFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

          render(this._container, new FilmExtraComponent(`Top rated`), RenderPosition.BEFOREEND);
          const extraFilmsWrappers = this._container.querySelector(`.films-list--extra`);
          const topRatedFilmsList = extraFilmsWrappers.querySelector(`.films-list__container`);
          renderExtraFilms(ratingFilms, topRatedFilmsList);
        } else if (mostCommentFilms[0].comments.length) {
          mostCommentFilms = mostCommentFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

          render(this._container, new FilmExtraComponent(`Most commented`), RenderPosition.BEFOREEND);
          const extraFilmsWrappers = this._container.querySelector(`.films-list--extra`);
          const mostCommentedFilmsList = extraFilmsWrappers.querySelector(`.films-list__container`);

          renderExtraFilms(mostCommentFilms, mostCommentedFilmsList);
        }
      };

      checkExtraFilms(getTopRatedFilms(films, `rating`), getMostCommentedFilms(films, `comments`));

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingFilmCount;
        showingFilmCount = showingFilmCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        films.slice(prevTasksCount, showingFilmCount).forEach((film) => {
          renderFilms(film, mainFilmsContainer);
        });

        if (showingFilmCount >= films.length) {
          document.querySelector(`.films-list__show-more`).remove();
        }
      });
    }
  }
}
