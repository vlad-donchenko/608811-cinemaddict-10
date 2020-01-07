import MenuComponent from './components/menu';
import SortComponent from './components/sorting';
import UserRankComponent from './components/user-rank';
import FilmListComponent from './components/film-list';
import PageController from './controllers/page';
import {films, getRandomIntegerNumber} from './mock/film';
import {menuFilmCount} from './mock/filter';
import {render, RenderPosition} from './utils/render';

const footerFilmsCount = document.querySelector(`.footer__statistics`);
footerFilmsCount.textContent = (Number(films.length) > 0) ? `${films.length} movies inside` : `${0} movies inside`;

const siteHeader = document.querySelector(`.header`);
const userRankComponent = new UserRankComponent(getRandomIntegerNumber(1, 30));
render(siteHeader, userRankComponent, RenderPosition.BEFOREEND);

const siteMain = document.querySelector(`.main`);
const menuComponent = new MenuComponent(menuFilmCount(films));
const sortComponent = new SortComponent();
render(siteMain, menuComponent, RenderPosition.BEFOREEND);
render(siteMain, sortComponent, RenderPosition.BEFOREEND);

const filmListComponent = new FilmListComponent(films.length);
render(siteMain, filmListComponent, RenderPosition.BEFOREEND);

const filmsWrapper = siteMain.querySelector(`.films`);
const pageController = new PageController(filmsWrapper);
pageController.render(films);

