import {render, remove, RenderPosition} from "../utils/render";
import ShowMoreButtonComponent from "../components/show-more-button";
import FilmExtraComponent from "../components/film-extra";
import MenuComponent from "../components/menu";
import {menuFilmCount} from "../mock/filter";
import SortComponent, {SortType} from "../components/sorting";
import FilmListComponent from "../components/film-list";
import MovieController from "../controllers/movie";

const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_EXTRA_FILM = 2;
const NAME_EXTRA_TOP_RATED = `Top rated`;
const NAME_EXTRA_MOST_COMMENTED = `Most commented`;


const renderFilms = (filmListElement, films, dataChangeHandler, viewChangeHandler) => {
  return films.map((film) => {
    const movieController = new MovieController(filmListElement, dataChangeHandler, viewChangeHandler);
    movieController.render(film);
    return movieController;
  });
};

const getExtraRatedFilms = (films, nameProperty) => {
  return films.slice().sort((a, b) => {
    return b[nameProperty] - a[nameProperty];
  });
};

const getExtraCommentedFilms = (films, nameProperty) => {
  return films.slice().sort((a, b) => {
    return b[nameProperty].length - a[nameProperty].length;
  });
};

const renderExtraFilms = (filmListElement, films, dataChangeHandler, viewChangeHandler) => {
  const topRated = getExtraRatedFilms(films.slice(), `rating`).slice(0, SHOWING_FILM_COUNT_EXTRA_FILM);
  const mostCommented = getExtraCommentedFilms(films.slice(), `comments`).slice(0, SHOWING_FILM_COUNT_EXTRA_FILM);

  if (topRated && mostCommented) {
    render(filmListElement, new FilmExtraComponent(NAME_EXTRA_TOP_RATED), RenderPosition.BEFOREEND);
    render(filmListElement, new FilmExtraComponent(NAME_EXTRA_MOST_COMMENTED), RenderPosition.BEFOREEND);
    const containers = document.querySelectorAll(`.films-list--extra > .films-list__container`);
    renderFilms(containers[0], topRated, dataChangeHandler, viewChangeHandler);
    renderFilms(containers[1], mostCommented, dataChangeHandler, viewChangeHandler);
  } else if (topRated) {
    render(filmListElement, new FilmExtraComponent(NAME_EXTRA_TOP_RATED), RenderPosition.BEFOREEND);
    const container = document.querySelector(`.films-list--extra > .films-list__container`);
    renderFilms(container, topRated, dataChangeHandler, viewChangeHandler);
  } else if (mostCommented) {
    render(filmListElement, new FilmExtraComponent(NAME_EXTRA_MOST_COMMENTED), RenderPosition.BEFOREEND);
    const container = document.querySelector(`.films-list--extra > .films-list__container`);
    renderFilms(container, mostCommented, dataChangeHandler, viewChangeHandler);
  }
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._films = [];
    this._showedFilmControllers = [];
    this._mainFilmList = null;
    this._showingFimsCount = SHOWING_FILM_COUNT_ON_START;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortComponent.setSortChangeHandler(this._sortTypeChangeHandler);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
  }

  render(films) {
    this._films = films;
    const menuComponent = new MenuComponent(menuFilmCount(films));
    render(this._container, menuComponent, RenderPosition.BEFOREEND);
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    const filmListComponent = new FilmListComponent(films.length);
    render(this._container, filmListComponent, RenderPosition.BEFOREEND);
    this._mainFilmList = this._container.querySelector(`.films-list__container`);
    renderExtraFilms(this._container.querySelector(`.films`), this._films, this._dataChangeHandler, this._viewChangeHandler);
    const newFilms = renderFilms(this._mainFilmList, this._films.slice(0, this._showingFimsCount), this._dataChangeHandler, this._viewChangeHandler);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._renderShowMoreButton(this._films);
  }

  _renderShowMoreButton(films) {
    if (this._showingFimsCount >= films.length) {
      return;
    }

    const container = this._container.querySelector(`.films-list`);
    render(container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFimsCount;
      this._showingFimsCount = prevFilmsCount + SHOWING_FILM_COUNT_ON_START;
      const newFilms = renderFilms(this._mainFilmList, this._films.slice(prevFilmsCount, this._showingFimsCount), this._dataChangeHandler, this._viewChangeHandler);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
      if (this._showingFimsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _sortTypeChangeHandler(sortType) {
    let sortedFilms = [];

    switch (sortType) {
      case SortType.SORT_RATING:
        sortedFilms = this._films.slice().sort((a, b) => b.rating - a.rating);
        break;
      case SortType.SORT_DATE:
        sortedFilms = this._films.slice().sort((a, b) => b.year - a.year);
        break;
      case SortType.SORT_DEFAULT:
        sortedFilms = this._films.slice();
        break;
    }

    const filmListElement = this._mainFilmList;
    filmListElement.innerHTML = ``;
    this._showingFimsCount = SHOWING_FILM_COUNT_ON_START;
    remove(this._showMoreButtonComponent);
    this._renderShowMoreButton(sortedFilms);
    const newFilms = renderFilms(filmListElement, sortedFilms.slice(0, this._showingFimsCount), this._dataChangeHandler, this._viewChangeHandler);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
  }

  _dataChangeHandler(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    movieController.render(this._films[index]);
  }

  _viewChangeHandler() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }
}
