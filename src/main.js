import FilmCardComponent from './components/film-card';
import MenuComponent from './components/menu';
import SortComponent from './components/sorting';
import PopupComponent from './components/popup';
import ShowMoreButtonComponent from './components/show-more-button';
import UserRankComponent from './components/user-rank';
import FilmListComponent from './components/film-list';
import FilmExtraComponent from './components/film-extra';
import {films, getRandomIntegerNumber} from './mock/film';
import {menuFilmCount} from './mock/filter';
import {render, RenderPosition} from './utils';

const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_COUNT_EXTRA_ON_START = 2;

const footerFilmsCount = document.querySelector(`.footer__statistics`);
footerFilmsCount.textContent = (Number(films.length) > 0) ? `${films.length} movies inside` : `${0} movies inside`;

const siteHeader = document.querySelector(`.header`);
const userRankComponent = new UserRankComponent(getRandomIntegerNumber(1, 30));
render(siteHeader, userRankComponent.getElement(), RenderPosition.BEFOREEND);

const siteMain = document.querySelector(`.main`);
const menuComponent = new MenuComponent(menuFilmCount(films));
const sortComponent = new SortComponent();
render(siteMain, menuComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMain, sortComponent.getElement(), RenderPosition.BEFOREEND);

const filmListComponent = new FilmListComponent(films.length);
render(siteMain, filmListComponent.getElement(), RenderPosition.BEFOREEND);
const body = document.querySelector(`body`);

const filmsWrapper = siteMain.querySelector(`.films`);
const filmsList = filmsWrapper.querySelector(`.films .films-list`);

if (films.length > 0) {
  const mainFilmListContainer = filmsList.querySelector(`.films-list__container`);
  const renderFilms = (currentFilm, container) => {
    const filmCardComponent = new FilmCardComponent(currentFilm);
    const popupComponent = new PopupComponent(currentFilm);
    const popupButtonClose = popupComponent.getElement().querySelector(`.film-details__close-btn`);

    const filmPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
    const filmTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
    const filmComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);

    const closePopup = () => {
      const currentPopup = document.querySelector(`.film-details`);
      body.removeChild(currentPopup);
      popupButtonClose.removeEventListener(`click`, closePopupClickHandler);
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
      render(body, popupComponent.getElement(), RenderPosition.BEFOREEND);

      popupButtonClose.addEventListener(`click`, closePopupClickHandler);
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

    filmPoster.addEventListener(`click`, showPopupClickHandler);
    filmPoster.addEventListener(`keydown`, showPopupKeyPressHandler);
    filmTitle.addEventListener(`click`, showPopupClickHandler);
    filmTitle.addEventListener(`keydown`, showPopupKeyPressHandler);
    filmComments.addEventListener(`click`, showPopupClickHandler);
    filmComments.addEventListener(`keydown`, showPopupKeyPressHandler);

    render(container, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
  };
  let showingFilmCount = SHOWING_FILM_COUNT_ON_START;

  films.slice(0, showingFilmCount).forEach((film) => {
    renderFilms(film, mainFilmListContainer);
  });


  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

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

      render(filmsWrapper, new FilmExtraComponent(`Top rated`).getElement(), RenderPosition.BEFOREEND);
      render(filmsWrapper, new FilmExtraComponent(`Most commented`).getElement(), RenderPosition.BEFOREEND);

      const extraFilmsWrappers = filmsWrapper.querySelectorAll(`.films-list--extra`);
      const topRatedFilmsList = extraFilmsWrappers[0].querySelector(`.films-list__container`);
      const mostCommentedFilmsList = extraFilmsWrappers[1].querySelector(`.films-list__container`);
      renderExtraFilms(ratingFilms, topRatedFilmsList);
      renderExtraFilms(mostCommentFilms, mostCommentedFilmsList);

    } else if (Number(ratingFilms[0].rating) !== 0) {
      ratingFilms = ratingFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

      render(filmsWrapper, new FilmExtraComponent(`Top rated`).getElement(), RenderPosition.BEFOREEND);
      const extraFilmsWrappers = filmsWrapper.querySelector(`.films-list--extra`);
      const topRatedFilmsList = extraFilmsWrappers.querySelector(`.films-list__container`);
      renderExtraFilms(ratingFilms, topRatedFilmsList);
    } else if (mostCommentFilms[0].comments.length) {
      mostCommentFilms = mostCommentFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

      render(filmsWrapper, new FilmExtraComponent(`Most commented`).getElement(), RenderPosition.BEFOREEND);
      const extraFilmsWrappers = filmsWrapper.querySelector(`.films-list--extra`);
      const mostCommentedFilmsList = extraFilmsWrappers.querySelector(`.films-list__container`);

      renderExtraFilms(mostCommentFilms, mostCommentedFilmsList);
    }
  };

  checkExtraFilms(getTopRatedFilms(films, `rating`), getMostCommentedFilms(films, `comments`));

  const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, function () {
    const prevTasksCount = showingFilmCount;
    showingFilmCount = showingFilmCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    films.slice(prevTasksCount, showingFilmCount).forEach((film) => {
      renderFilms(film, mainFilmListContainer);
    });

    if (showingFilmCount >= films.length) {
      loadMoreButton.remove();
    }

  });
}
