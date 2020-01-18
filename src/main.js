import UserRankComponent from "./components/user-rank";
import PageController from "./controllers/page";
import {films, getRandomIntegerNumber} from "./mock/film";
import {render, RenderPosition} from "./utils/render";

const footerFilmsCount = document.querySelector(`.footer__statistics`);
footerFilmsCount.textContent = (Number(films.length) > 0) ? `${films.length} movies inside` : `${0} movies inside`;

const siteHeader = document.querySelector(`.header`);
const userRankComponent = new UserRankComponent(getRandomIntegerNumber(1, 30));
render(siteHeader, userRankComponent, RenderPosition.BEFOREEND);

const siteMain = document.querySelector(`.main`);
const pageController = new PageController(siteMain);
pageController.render(films);

