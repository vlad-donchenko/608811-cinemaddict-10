import FilmCardComponent from "../components/film-card";
import PopupComponent from "../components/popup";
import {render, remove, RenderPosition} from "../utils/render";

export default class MovieController {
  constructor(container) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmCardComponent = null;
    this._popupComponent = null;
    this._dataChangeHandler = dataChangeHandler;
    this._closePopup = this._closePopup.bind(this);
    this._showPopup = this._showPopup.bind(this);
    this._closePopupKeyPressHandler = this._closePopupKeyPressHandler.bind(this);
    this._showPopupKeyPressHandler = this._showPopupKeyPressHandler.bind(this);
  }

  render(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._popupComponent = new PopupComponent(film);
    this._filmCardComponent.setClickHandler(this._showPopup);
    this._filmCardComponent.setKeyPressHandler(this._showPopupKeyPressHandler);
    this._popupComponent.setCloseButtonClickHandler(this._closePopup);
    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _showPopup() {
    const bodyElement = document.querySelector(`body`);
    render(bodyElement, this._popupComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._closePopupKeyPressHandler);
  }

  _closePopup() {
    remove(this._popupComponent);
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
}
