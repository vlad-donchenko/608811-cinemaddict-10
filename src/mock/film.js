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

const directors = [
  `Anthony Mann`,
  `Charlie Chaplin`,
  `Sergiy Eisenstein`,
  `Alfred Hitchcock`,
  `Federico Fellini`,
  `James Cameron`,
  `Steven Spielberg`,
  `Woody Allen`,
  `Martin Scorsese`,
  `Квентін Тарантіно`,
  `Крістофер Нолан`,
];

const writers = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `William Goldman`,
  `Emma Thompson`,
];

const actors = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Tom Hanks`,
  `Margot Robbie`,
  `Scarlett Johansson`,
  `Brad Pitt`,
];

const countries = [
  `USA`,
  `United Kingdom`,
  `France`,
  `Russia`,
  `Canada`,
];

const emojis = [
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`,
];

const commentsText = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const generateComment = () => {
  return {
    emoji: emojis[getRandomIntegerNumber(0, emojis.length - 1)],
    commentText: commentsText[getRandomIntegerNumber(0, commentsText.length - 1)],
    commentAuthor: `Tim Macoveev`,
    commentDay: `2019/12/31 23:59`,
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => {
      return generateComment();
    });
};

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
    director: directors[getRandomIntegerNumber(0, directors.length - 1)],
    writers: writers.slice(0, getRandomIntegerNumber(1, writers.length - 1)),
    actors: actors.slice(0, getRandomIntegerNumber(0, actors.length - 1)),
    country: countries[getRandomIntegerNumber(0, countries.length - 1)],
    age: getRandomIntegerNumber(4, 18),
    isWatchlist: getRandomIntegerNumber(0, flags.length - 1),
    isHistory: getRandomIntegerNumber(0, flags.length - 1),
    isFavorites: getRandomIntegerNumber(0, flags.length - 1),
  };
};

const generateFilms = () => {
  return new Array(COUNT_FILMS)
    .fill(``)
    .map(() => {
      const currentFilm = generateFilm();
      currentFilm.comments = generateComments(getRandomIntegerNumber(0, 10));
      return currentFilm;
    });
};

const films = (Number(COUNT_FILMS) > 0) ? generateFilms() : 0;

export {films, getRandomIntegerNumber};
