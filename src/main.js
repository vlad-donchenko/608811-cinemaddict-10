import {createCardTemplate} from './components/film-card';
import {createNavigationTemplate} from './components/menu';
import {createModalTemplate} from './components/popap';
import {createShowMoreButtonTemplate} from './components/show-more-button';
import {createUserLevelTemplate} from './components/user-rank';
import {createFilmsTemplate, creatFilmsExtraTemplate} from './components/films';
import {films, getRandomIntegerNumber} from './mock/film-card';
import {menuFilmCount} from './mock/filter';
import {popaps} from './mock/popap';
import {comments} from './mock/comment';

const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_COUNT_EXTRA_ON_START = 2;

const footerFilmsCount = document.querySelector(`.footer__statistics`);
footerFilmsCount.textContent = `${films.length} movies inside`;

const renderTemplate = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const siteHeader = document.querySelector(`.header`);
renderTemplate(siteHeader, createUserLevelTemplate(getRandomIntegerNumber(0, 30)));

const siteMain = document.querySelector(`.main`);
renderTemplate(siteMain, createNavigationTemplate(menuFilmCount(films)));
renderTemplate(siteMain, createFilmsTemplate());

const filmsWrapper = siteMain.querySelector(`.films`);
const filmsList = filmsWrapper.querySelector(`.films-list`);
const mainFilmListContainer = filmsList.querySelector(`.films-list__container`);
renderTemplate(filmsList, createShowMoreButtonTemplate());

const getTopExtraFilms = (filmsArray, nameProperty = `rating`) => {
  return filmsArray.slice().sort((a, b) => {
    return b[nameProperty] - a[nameProperty];
  });
};

const renderTopRatedFilms = (ratingFilms, container) => {
  ratingFilms.forEach((currentElement) => {
    renderTemplate(container, createCardTemplate(currentElement));
  });
};

const renderMostCommentedFilms = (mostCommentFilms, container) => {
  mostCommentFilms.forEach((currentElement) => {
    renderTemplate(container, createCardTemplate(currentElement));
  });
};

const renderExtraFilms = (ratingFilms, mostCommentFilms) => {
  if (ratingFilms && mostCommentFilms) {
    ratingFilms = ratingFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);
    mostCommentFilms = mostCommentFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

    renderTemplate(filmsWrapper, creatFilmsExtraTemplate(`Top rated`));
    renderTemplate(filmsWrapper, creatFilmsExtraTemplate(`Most commented`));

    const extraFilmsWrappers = filmsWrapper.querySelectorAll(`.films-list--extra`);
    const topRatedFilmsList = extraFilmsWrappers[0].querySelector(`.films-list__container`);
    const mostCommentedFilmsList = extraFilmsWrappers[1].querySelector(`.films-list__container`);
    renderTopRatedFilms(ratingFilms, topRatedFilmsList);
    renderMostCommentedFilms(mostCommentFilms, mostCommentedFilmsList);

  } else if (ratingFilms) {
    ratingFilms = ratingFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

    renderTemplate(filmsWrapper, creatFilmsExtraTemplate(`Top rated`));
    const extraFilmsWrappers = filmsWrapper.querySelector(`.films-list--extra`);
    const topRatedFilmsList = extraFilmsWrappers.querySelector(`.films-list__container`);
    renderTopRatedFilms(ratingFilms, topRatedFilmsList);
  } else if (mostCommentFilms) {
    mostCommentFilms = mostCommentFilms.slice(0, SHOWING_FILM_COUNT_EXTRA_ON_START);

    renderTemplate(filmsWrapper, creatFilmsExtraTemplate(`Most commented`));
    const extraFilmsWrappers = filmsWrapper.querySelector(`.films-list--extra`);
    const mostCommentedFilmsList = extraFilmsWrappers.querySelector(`.films-list__container`);

    renderMostCommentedFilms(mostCommentFilms, mostCommentedFilmsList);
  }
};

renderExtraFilms(getTopExtraFilms(films), getTopExtraFilms(films, `comments`));

let showingTasksCount = SHOWING_FILM_COUNT_ON_START;
films.slice(0, showingTasksCount).forEach((film) => renderTemplate(mainFilmListContainer, createCardTemplate(film)));

const body = document.querySelector(`body`);
renderTemplate(body, createModalTemplate(popaps[0], comments[0]));

const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, function () {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  films.slice(prevTasksCount, showingTasksCount).forEach((film) => renderTemplate(mainFilmListContainer, createCardTemplate(film)));

  if (showingTasksCount >= films.length) {
    loadMoreButton.remove();
  }

});
