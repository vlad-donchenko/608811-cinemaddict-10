import {films, getRandomIntegerNumber} from './film-card';

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

const generatePopap = (filmCard) => {
  return {
    poster: filmCard.poster,
    name: filmCard.name,
    originalName: filmCard.name,
    rating: filmCard.rating,
    director: directors[getRandomIntegerNumber(0, directors.length - 1)],
    writers: writers.slice(0, getRandomIntegerNumber(1, writers.length - 1)),
    actors: actors.slice(0, getRandomIntegerNumber(0, actors.length - 1)),
    year: filmCard.year,
    runtime: filmCard.runtime,
    country: `${countries[getRandomIntegerNumber(0, countries.length - 1)]}`,
    genres: filmCard.genres,
    age: `${getRandomIntegerNumber(4, 18)}+`,
    description: filmCard.description
  };
};

const generatePopaps = (filmsArray) => {
  return new Array(filmsArray.length)
    .fill(``)
    .map((currentValue, index) => {
      return generatePopap(filmsArray[index]);
    });
};

const popaps = generatePopaps(films);

export {popaps};
