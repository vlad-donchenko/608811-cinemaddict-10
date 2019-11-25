import {createCardTemplate} from './components/film-card';
import {createNavigationTemplate} from './components/menu';
import {createModalTemplate} from './components/popap';
import {createShowMoreButtonTemplate} from './components/show-more-button';
import {createUserLevelTemplate} from './components/user-rank';

const FILM_COUNT = 5;
const FILM_COUNT_EXTRA = 2;

const renderTemplate = (wrapper, template, position = `beforeend`) => {
  wrapper.insertAdjacentHTML(position, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const cardWrapper = siteMain.querySelector(`.films-list .films-list__container`);
const cardsExtraWrapper = siteMain.querySelectorAll(`.films-list--extra .films-list__container`);

renderTemplate(siteHeader, createUserLevelTemplate());
renderTemplate(siteMain, createNavigationTemplate(), `afterbegin`);

new Array(FILM_COUNT)
  .fill(``)
  .forEach(() => renderTemplate(cardWrapper, createCardTemplate()));

Array.from(cardsExtraWrapper).forEach((container) => {
  new Array(FILM_COUNT_EXTRA)
    .fill(``)
    .forEach(() => renderTemplate(container, createCardTemplate()));
});

renderTemplate(cardWrapper, createShowMoreButtonTemplate(), `afterend`);
renderTemplate(footer, createModalTemplate(), `afterend`);
