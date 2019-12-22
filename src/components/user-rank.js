import {createElement} from '../utils.js';

const createUserLevelTemplate = (watchedMoviesCount) => {
  let userRank = ``;
  if (watchedMoviesCount >= 1 && watchedMoviesCount <= 10) {
    userRank = `novice`;
  } else if (watchedMoviesCount >= 11 && watchedMoviesCount <= 20) {
    userRank = `fan`;
  } else if (watchedMoviesCount >= 21) {
    userRank = `movie buff`;
  }

  return (
    `
    <section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
    `
  );
};

class UserRank {
  constructor(watchedMoviesCount) {
    this._watchedMoviesCount = watchedMoviesCount;
    this._element = null;
  }

  getTemplate() {
    return createUserLevelTemplate(this._watchedMoviesCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {createUserLevelTemplate};
