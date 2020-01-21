import moment from 'moment';

export const formatDateFilm = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatDateComment = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:MM`);
};
