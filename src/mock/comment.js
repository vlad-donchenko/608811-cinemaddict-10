import {films, getRandomIntegerNumber} from './film-card';

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

const generateComments = (filmsArray) => {
  return filmsArray.map((filmItem) => {
    return new Array(Number(filmItem.comments))
      .fill(``)
      .map(() => {
        return generateComment();
      });
  });
};

const comments = generateComments(films);

export {comments};
