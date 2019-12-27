import FilmCardComponent from './components/film-card';
import MenuComponent from './components/menu';
import PopupComponent from './components/popup';
import ShowMoreButtonComponent from './components/show-more-button';
import UserRankComponent from './components/user-rank';
import FilmListComponent from './components/film-list';
import FilmExtraComponent from './components/film-extra';
import {films, getRandomIntegerNumber} from './mock/film-card';
import {menuFilmCount} from './mock/filter';
import {generatePopups} from './mock/popup';
import {comments} from './mock/comment';
import {render, RenderPosition} from './utils';

const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_COUNT_EXTRA_ON_START = 2;
const popups = generatePopups(films);

const footerFilmsCount = document.querySelector(`.footer__statistics`);
footerFilmsCount.textContent = `${films.length} movies inside`;

const siteHeader = document.querySelector(`.header`);
const userRankComponent = new UserRankComponent(getRandomIntegerNumber(1, 30));
render(siteHeader, userRankComponent.getElement(), RenderPosition.BEFOREEND);

const siteMain = document.querySelector(`.main`);
const menuComponent = new MenuComponent(menuFilmCount(films));
render(siteMain, menuComponent.getElement(), RenderPosition.BEFOREEND);

const filmListComponent = new FilmListComponent();
render(siteMain, filmListComponent.getElement(), RenderPosition.BEFOREEND);

const body = document.querySelector(`body`);

const renderFilms = (film, popupData, commentData, container) => {
  const filmCardComponent = new FilmCardComponent(film);

  const poster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const commentLink = filmCardComponent.getElement().querySelector(`.film-card__comments`);

  const closePopup = () => {
    const popup = document.querySelector(`.film-details`);
    popup.remove();
    document.removeEventListener(`keydown`, closePopupKeyPressHandler);
  };

  const showPopup = () => {
    const popupComponent = new PopupComponent(popupData, commentData);
    render(body, popupComponent.getElement(), RenderPosition.BEFOREEND);
    const closePopupButton = popupComponent.getElement().querySelector(`.film-details__close-btn`);

    closePopupButton.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      closePopup();
    });

    document.addEventListener(`keydown`, closePopupKeyPressHandler);
  };

  const openPopupKeyPressHandler = (evt) => {
    const isPopup = document.querySelector(`.film-details`);
    if (evt.key === `Enter` && isPopup === null) {
      showPopup();
    }
  };

  const closePopupKeyPressHandler = (evt) => {
    if (evt.key === `Escape`) {
      closePopup();
    }
  };

  const showPopupClickHandler = (evt) => {
    evt.preventDefault();
    showPopup();
  };

  poster.addEventListener(`click`, showPopupClickHandler);
  filmTitle.addEventListener(`click`, showPopupClickHandler);
  commentLink.addEventListener(`click`, showPopupClickHandler);
  poster.addEventListener(`keydown`, openPopupKeyPressHandler);
  filmTitle.addEventListener(`keydown`, openPopupKeyPressHandler);
  commentLink.addEventListener(`keydown`, openPopupKeyPressHandler);

  render(container, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const filmsWrapper = siteMain.querySelector(`.films`);
const filmsList = filmsWrapper.querySelector(`.films .films-list`);
const mainFilmListContainer = filmsList.querySelector(`.films-list__container`);
let showingFilmCount = SHOWING_FILM_COUNT_ON_START;
console.log(showingFilmCount);

console.log(films);
films.slice(0, showingFilmCount).forEach((film, index) => {
  renderFilms(film, popups[index], comments[index], mainFilmListContainer);
});

const showMoreButtonComponent = new ShowMoreButtonComponent();
render(filmsList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

const getTopExtraComponents = (array, nameProperty = `rating`) => {
  return array.slice().sort((a, b) => {
    return b[nameProperty] - a[nameProperty];
  });
};

const renderTopRatedFilms = (ratingFilms, container) => {
  ratingFilms.forEach((currentElement) => {
    render(container, new FilmCardComponent(currentElement).getElement(), RenderPosition.BEFOREEND);
  });
};

const renderMostCommentedFilms = (mostCommentFilms, container) => {
  mostCommentFilms.forEach((currentElement) => {
    render(container, new FilmCardComponent(currentElement).getElement(), RenderPosition.BEFOREEND);
  });
};

const renderExtraFilms = (ratingFilms, mostCommentFilms) => {
  if (ratingFilms && mostCommentFilms) {
    ratingFilms = ratingFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);
    mostCommentFilms = mostCommentFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

    render(filmsWrapper, new FilmExtraComponent(`Top rated`).getElement(), RenderPosition.BEFOREEND);
    render(filmsWrapper, new FilmExtraComponent(`Most commented`).getElement(), RenderPosition.BEFOREEND);

    const extraFilmsWrappers = filmsWrapper.querySelectorAll(`.films-list--extra`);
    const topRatedFilmsList = extraFilmsWrappers[0].querySelector(`.films-list__container`);
    const mostCommentedFilmsList = extraFilmsWrappers[1].querySelector(`.films-list__container`);
    renderTopRatedFilms(ratingFilms, topRatedFilmsList);
    renderMostCommentedFilms(mostCommentFilms, mostCommentedFilmsList);

  } else if (ratingFilms) {
    ratingFilms = ratingFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

    render(filmsWrapper, new FilmExtraComponent(`Top rated`).getElement(), RenderPosition.BEFOREEND);
    const extraFilmsWrappers = filmsWrapper.querySelector(`.films-list--extra`);
    const topRatedFilmsList = extraFilmsWrappers.querySelector(`.films-list__container`);
    renderTopRatedFilms(ratingFilms, topRatedFilmsList);
  } else if (mostCommentFilms) {
    mostCommentFilms = mostCommentFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

    render(filmsWrapper, new FilmExtraComponent(`Most commented`).getElement(), RenderPosition.BEFOREEND);
    const extraFilmsWrappers = filmsWrapper.querySelector(`.films-list--extra`);
    const mostCommentedFilmsList = extraFilmsWrappers.querySelector(`.films-list__container`);

    renderMostCommentedFilms(mostCommentFilms, mostCommentedFilmsList);
  }
};

renderExtraFilms(getTopExtraComponents(films), getTopExtraComponents(films, `comments`));

const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, function () {
  const prevTasksCount = showingFilmCount;
  showingFilmCount = showingFilmCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  films.slice(prevTasksCount, showingFilmCount).forEach((film, index) => {
    renderFilms(film, popups[index + prevTasksCount], comments[index + prevTasksCount], mainFilmListContainer);
  });

  if (showingFilmCount >= films.length) {
    loadMoreButton.remove();
  }

});
