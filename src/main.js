import {createCardTemplate} from './components/film-card';
import {createNavigationTemplate} from './components/menu';
import {createModalTemplate} from './components/popap';
import {createShowMoreButtonTemplate} from './components/show-more-button';
import {createUserLevelTemplate} from './components/user-rank';
import {createFilmsTemplate} from './components/films';

const FILM_COUNT = 5;
const FILM_COUNT_EXTRA = 2;

const renderTemplate = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const siteHeader = document.querySelector(`.header`);
renderTemplate(siteHeader, createUserLevelTemplate());

const siteMain = document.querySelector(`.main`);
renderTemplate(siteMain, createNavigationTemplate());
renderTemplate(siteMain, createFilmsTemplate());

const filmsList = siteMain.querySelector(`.films-list`);
renderTemplate(filmsList, createShowMoreButtonTemplate());

const filmsListContainers = siteMain.querySelectorAll(`.films-list__container`);

const renderFilmCard = (countCard, container) => {
  new Array(countCard)
    .fill(``)
    .forEach(() => {
      renderTemplate(container, createCardTemplate());
    });
};

Array.from(filmsListContainers).forEach((container) => {
  if (container.closest(`.films-list`)) {
    renderFilmCard(FILM_COUNT, container);
  } else {
    renderFilmCard(FILM_COUNT_EXTRA, container);
  }
});

const body = document.querySelector(`body`);
renderTemplate(body, createModalTemplate());
