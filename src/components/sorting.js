import AbstractComponent from "./abstract";

const SortType = {
  SORT_DEFAULT: `sort-default`,
  SORT_DATE: `sort-date`,
  SORT_RATING: `sort-rating`,
};

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort="${SortType.SORT_DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort="${SortType.SORT_DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort="${SortType.SORT_RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortChangeHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
