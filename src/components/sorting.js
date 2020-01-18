import AbstractComponent from "./abstract";

export const SortType = {
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
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const currentTarget = evt.target;

      if (!currentTarget.classList.contains(`sort__button--active`) && evt.target.tagName === `A`) {
        const sortType = evt.target.dataset.sort;
        const sortItems = currentTarget.closest(`.sort`).querySelectorAll(`.sort__button`);
        Array.from(sortItems).forEach((it) => {
          it.classList.remove(`sort__button--active`);
        });

        currentTarget.classList.add(`sort__button--active`);
        handler(sortType);
      }

    });
  }
}
