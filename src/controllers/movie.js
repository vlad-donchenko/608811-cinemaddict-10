import FilmCardComponent from "../components/film-card";
import PopupComponent from "../components/popup";
import {render, remove, replace, RenderPosition} from "../utils/render";

export const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, dataChangeHandler, viewChangeHandler) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmCardComponent = null;
    this._popupComponent = null;
    this._film = null;
    this._mode = Mode.DEFAULT;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._closePopup = this._closePopup.bind(this);
    this._showPopup = this._showPopup.bind(this);
    this._closePopupKeyPressHandler = this._closePopupKeyPressHandler.bind(this);
    this._showPopupKeyPressHandler = this._showPopupKeyPressHandler.bind(this);
    this._addWatchlistHandler = this._addWatchlistHandler.bind(this);
    this._addHistoryHandler = this._addHistoryHandler.bind(this);
    this._addFavoritesHandler = this._addFavoritesHandler.bind(this);
  }

  render(film) {
    this._film = film;
    const oldFilmCardComponent = this._filmCardComponent;
    const oldPopupComponent = this._popupComponent;
    this._filmCardComponent = this._getFilm(this._film);
    this._popupComponent = this._getPopup(this._film);

    if (oldFilmCardComponent && oldPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._popupComponent, oldPopupComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  _getPopup(film) {
    const popup = new PopupComponent(film);
    popup.setCloseButtonClickHandler(this._closePopup);
    popup.setWatchlistClickHandler(this._addWatchlistHandler);
    popup.setHistoryClickHandler(this._addHistoryHandler);
    popup.setFavoriteClickHandler(this._addFavoritesHandler);
    return popup;
  }

  _getFilm(film) {
    const filmCard = new FilmCardComponent(film);
    filmCard.setClickHandler(this._showPopup);
    filmCard.setKeyPressHandler(this._showPopupKeyPressHandler);
    filmCard.setWatchlistClickHandler(this._addWatchlistHandler);
    filmCard.setHistoryClickHandler(this._addHistoryHandler);
    filmCard.setFavoriteClickHandler(this._addFavoritesHandler);
    return filmCard;
  }

  _addWatchlistHandler() {
    this._dataChangeHandler(this, this._film, Object.assign({}, this._film, {
      isWatchlist: !this._film.isWatchlist,
    }));
  }

  _addHistoryHandler() {
    this._dataChangeHandler(this, this._film, Object.assign({}, this._film, {
      isHistory: !this._film.isHistory,
    }));
  }

  _addFavoritesHandler() {
    this._dataChangeHandler(this, this._film, Object.assign({}, this._film, {
      isFavorites: !this._film.isFavorites,
    }));
  }

  _showPopup() {
    if (this._mode === Mode.DEFAULT) {
      const bodyElement = document.querySelector(`body`);
      this._popupComponent = this._getPopup(this._film);
      render(bodyElement, this._popupComponent, RenderPosition.BEFOREEND);
      this._viewChangeHandler();
      document.addEventListener(`keydown`, this._closePopupKeyPressHandler);
      this._mode = Mode.DETAILS;
    }
  }

  _closePopup() {
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._closePopupKeyPressHandler);
    this._mode = Mode.DEFAULT;
  }

  _showPopupKeyPressHandler(evt) {
    const isEnter = evt.key === `Enter`;

    if (isEnter) {
      this._showPopup();
    }
  }

  _closePopupKeyPressHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closePopup();
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }
}
