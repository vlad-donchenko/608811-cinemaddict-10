import AbstractComponent from "./abstract";

const createUserLevelTemplate = (watchedMoviesCount) => {
  let userRank = null;
  if (watchedMoviesCount >= 1 && watchedMoviesCount <= 10) {
    userRank = `novice`;
  } else if (watchedMoviesCount >= 11 && watchedMoviesCount <= 20) {
    userRank = `fan`;
  } else if (watchedMoviesCount >= 21) {
    userRank = `movie buff`;
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRank extends AbstractComponent {
  constructor(watchedMoviesCount) {
    super();
    this._watchedMoviesCount = watchedMoviesCount;
  }

  getTemplate() {
    return createUserLevelTemplate(this._watchedMoviesCount);
  }
}
