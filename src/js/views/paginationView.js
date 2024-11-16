"use strict";
import View from "./View.js";
import { REC_PER_PAGE } from "../config.js";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");
  render(state) {
    const totPages = Math.ceil(state.search.results.length / REC_PER_PAGE);
    const markup = this.generateMarkup(state.search.currPage, totPages);
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  generateMarkup(currPage, totPages) {
    //if first and only page
    if (currPage === 1 && totPages === 1) {
      return ``;
    }
    //if first of multiple pages
    if (currPage === 1 && totPages > 1) {
      return `
            <button class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                    <use href="${this._iconsUrl}#icon-arrow-right"></use>
                </svg>
            </button>`;
    }
    //if last page
    if (currPage === totPages) {
      return `
                <button class="btn--inline pagination__btn--prev">
                    <span>Page ${currPage - 1}</span>
                    <svg class="search__icon">
                        <use href="${this._iconsUrl}#icon-arrow-left"></use>
                    </svg>
                </button>`;
    }
    //any page in between
    return `
            <button class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${this._iconsUrl}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
            </button>
            <button class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                    <use href="${this._iconsUrl}#icon-arrow-right"></use>
                </svg>
            </button>`;
  }
  addHandlerPagination(handle) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      handle(e, btn);
    });
  }
}

export default new PaginationView();
