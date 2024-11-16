"use strict";
import View from "./View.js";
class AddRecipeView extends View {
  _parentEl = document.querySelector(".upload");

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpenModal = document.querySelector(".nav__btn--add-recipe");
  _btnCloseForm = document.querySelector(".btn--close-modal");
  constructor() {
    super();
    this._addHandlerAddRecipe();
    this._addHandlerCloseRecipe();
  }
  _toggleHide() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }
  _addHandlerAddRecipe() {
    this._btnOpenModal.addEventListener("click", this._toggleHide.bind(this));
  }
  _addHandlerCloseRecipe() {
    this._btnCloseForm.addEventListener("click", this._toggleHide.bind(this));
    this._overlay.addEventListener("click", this._toggleHide.bind(this));
  }
  _addHandlerUpload(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log(this);
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
