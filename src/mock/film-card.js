const COUNT_FILMS = 15;

const filmNames = [
  `Made for each other`,
  `Popeye meets Sinbad`,
  `Sagebrush trail`,
  `Santa Claus conquers the martians`,
  `The dance of life`,
  `The great Flamarion`,
  `The man with the golden arm`,
  `The Lord of the Rings: The Return of the King`,
  `Schindler's List`,
  `Titanic`,
  `The Green Mile`,
  `The Godfather`,
  `The Dark Knight`,
  `The Matrix`,
  `Avatar`,
];

const posters = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const genres = [
  `Western`,
  `Detective`,
  `Action`,
  `Drama`,
  `Fantasy`,
  `Film-Noir`,
  `Mystery`,
];

const flags = [true, false];

const getRandomIntegerNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const generateFilm = () => {
  return {
    name: filmNames[getRandomIntegerNumber(0, filmNames.length - 1)],
    rating: `${getRandomIntegerNumber(0, 10)}.${getRandomIntegerNumber(0, 9)}`,
    year: getRandomIntegerNumber(1900, 2020),
    runtime: `${getRandomIntegerNumber(1, 2)}h ${getRandomIntegerNumber(0, 59)}m`,
    genres: genres.slice(0, getRandomIntegerNumber(1, genres.length - 1)),
    poster: posters[getRandomIntegerNumber(0, posters.length - 1)],
    description: descriptions[getRandomIntegerNumber(0, descriptions.length)] + descriptions[getRandomIntegerNumber(0, descriptions.length - 1)],
    comments: `${getRandomIntegerNumber(0, 10)}`,
    isWatchlist: getRandomIntegerNumber(0, flags.length - 1),
    isHistory: getRandomIntegerNumber(0, flags.length - 1),
    isFavorites: getRandomIntegerNumber(0, flags.length - 1),
  };
};

const generateFilms = () => {
  return new Array(COUNT_FILMS)
    .fill(``)
    .map(generateFilm);
};

const films = generateFilms();

export {films, getRandomIntegerNumber};
