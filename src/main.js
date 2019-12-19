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

const getTopRatingValue = (filmsArray) => {
  const ratings = filmsArray.slice().map((filmArrayItem) => {
    return filmArrayItem.rating;
  });

  ratings.sort((a, b) => {
    return b - a;
  });

  const ratingsTopValue = ratings.slice(1, SHOWING_FILM_COUNT_EXTRA_ON_START);

  return (ratingsTopValue[0] > 0) ? ratingsTopValue[0] : 0;
};

const getTopRatingFilms = (ratingValue, filmsArray) => {
  if (ratingValue) {
    const topFilms = [];

    filmsArray.map((filmArrayItem) => {
      return (ratingValue <= Number(filmArrayItem.rating) && Number(filmArrayItem.rating) !== 0) ? topFilms.push(filmArrayItem) : ``;
    });

    return topFilms;
  } else {
    return 0;
  }
};

const renderTopRatedFilms = (ratingFilms) => {
  if (ratingFilms) {
    renderTemplate(filmsWrapper, creatFilmsExtraTemplate(`Top rated`));

    const topRatedFilmsSection = filmsWrapper.querySelector(`.films-list--extra`);
    const topRatedFilmsList = topRatedFilmsSection.querySelector(`.films-list__container`);

    ratingFilms.forEach((ratingFilm) => {
      renderTemplate(topRatedFilmsList, createCardTemplate(ratingFilm));
    });

  }
};

renderTopRatedFilms(getTopRatingFilms(getTopRatingValue(films), films), films);

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
