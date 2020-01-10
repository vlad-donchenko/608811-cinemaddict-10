import {render, remove, RenderPosition} from "../utils/render";
import FilmCardComponent from "../components/film-card";
import PopupComponent from "../components/popup";
import ShowMoreButtonComponent from "../components/show-more-button";
import FilmExtraComponent from "../components/film-extra";
import MenuComponent from "../components/menu";
import {menuFilmCount} from "../mock/filter";
import SortComponent, {SortType} from "../components/sorting";
import FilmListComponent from "../components/film-list";

const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_COUNT_EXTRA_ON_START = 2;


export default class PageController {
  constructor(container) {
    this._container = container;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
  }

  render(films) {
    const menuComponent = new MenuComponent(menuFilmCount(films));
    render(this._container, menuComponent, RenderPosition.BEFOREEND);
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    const filmListComponent = new FilmListComponent(films.length);
    render(this._container, filmListComponent, RenderPosition.BEFOREEND);

    if (films.length > 0) {
      const filmsSection = this._container.querySelector(`.films`);
      const mainFilmsList = filmsSection.querySelector(`.films-list`);
      const mainFilmsContainer = mainFilmsList.querySelector(`.films-list > .films-list__container`);

      const renderFilm = (currentFilm, container) => {
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

      const renderFilms = (filmsList, container) => {
        filmsList.forEach((filmItem) => {
          renderFilm(filmItem, container);
        });
      };

      let showingFilmCount = SHOWING_FILM_COUNT_ON_START;

      const renderShowMoreButton = (currentFilmsList) => {
        if (SHOWING_FILM_COUNT_ON_START >= currentFilmsList.length) {
          return;
        }

        render(mainFilmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

        this._showMoreButtonComponent.setClickHandler(() => {
          const prevTasksCount = showingFilmCount;
          showingFilmCount = showingFilmCount + SHOWING_TASKS_COUNT_BY_BUTTON;

          renderFilms(currentFilmsList.slice(prevTasksCount, showingFilmCount), mainFilmsContainer);

          if (showingFilmCount >= currentFilmsList.length) {
            remove(this._showMoreButtonComponent);
          }
        });
      };

      this._sortComponent.setSortChangeHandler((sortType) => {
        let sortedFilms = [];

        if (sortType === SortType.SORT_DATE) {
          sortedFilms = films.slice().sort((a, b) => {
            return Number(b.year) - Number(a.year);
          });
        } else if (sortType === SortType.SORT_RATING) {
          sortedFilms = films.slice().sort((a, b) => {
            return Number(b.rating).toFixed(1) - Number(a.rating).toFixed(1);
          });
        } else {
          sortedFilms = films.slice();
        }

        mainFilmsContainer.innerHTML = ``;
        remove(this._showMoreButtonComponent);
        showingFilmCount = SHOWING_FILM_COUNT_ON_START;
        renderFilms(sortedFilms.slice(0, SHOWING_FILM_COUNT_ON_START), mainFilmsContainer);
        renderShowMoreButton(sortedFilms);
      });

      renderFilms(films.slice(0, SHOWING_FILM_COUNT_ON_START), mainFilmsContainer);
      renderShowMoreButton(films.slice());

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
          renderFilm(currentElement, container);
        });
      };

      const checkExtraFilms = (ratingFilms, mostCommentFilms) => {
        if (Number(ratingFilms[0].rating) !== 0 && mostCommentFilms[0].comments.length) {
          ratingFilms = ratingFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);
          mostCommentFilms = mostCommentFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

          render(filmsSection, new FilmExtraComponent(`Top rated`), RenderPosition.BEFOREEND);
          render(filmsSection, new FilmExtraComponent(`Most commented`), RenderPosition.BEFOREEND);

          const extraFilmsWrappers = this._container.querySelectorAll(`.films-list--extra`);
          const topRatedFilmsList = extraFilmsWrappers[0].querySelector(`.films-list__container`);
          const mostCommentedFilmsList = extraFilmsWrappers[1].querySelector(`.films-list__container`);
          renderExtraFilms(ratingFilms, topRatedFilmsList);
          renderExtraFilms(mostCommentFilms, mostCommentedFilmsList);

        } else if (Number(ratingFilms[0].rating) !== 0) {
          ratingFilms = ratingFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

          render(filmsSection, new FilmExtraComponent(`Top rated`), RenderPosition.BEFOREEND);
          const extraFilmsWrappers = this._container.querySelector(`.films-list--extra`);
          const topRatedFilmsList = extraFilmsWrappers.querySelector(`.films-list__container`);
          renderExtraFilms(ratingFilms, topRatedFilmsList);
        } else if (mostCommentFilms[0].comments.length) {
          mostCommentFilms = mostCommentFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

          render(filmsSection, new FilmExtraComponent(`Most commented`), RenderPosition.BEFOREEND);
          const extraFilmsWrappers = this._container.querySelector(`.films-list--extra`);
          const mostCommentedFilmsList = extraFilmsWrappers.querySelector(`.films-list__container`);

          renderExtraFilms(mostCommentFilms, mostCommentedFilmsList);
        }
      };

      checkExtraFilms(getTopRatedFilms(films, `rating`), getMostCommentedFilms(films, `comments`));
    }
  }
}
