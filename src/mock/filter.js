const menuFilmCount = (films) => {
  let allCount = films.length;
  let watchListCount = 0;
  let historyCount = 0;
  let favoritesCount = 0;

  films.map((currentFilm) => {
    if (currentFilm.isWatchlist) {
      watchListCount++;
    } else if (currentFilm.isHistory) {
      historyCount++;
    } else if (currentFilm.isFavorites) {
      favoritesCount++;
    }
  });

  return [watchListCount, historyCount, favoritesCount, allCount];
};

export {menuFilmCount};
