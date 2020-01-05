import AbstractComponent from "./abstract";

const createNavigationTemplate = (filmsCounts) => {
  const [watchList, history, favorites] = filmsCounts;

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchList}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createNavigationTemplate(this._filmsCount);
  }
}
