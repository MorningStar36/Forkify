"use strict";
import View from "./View.js";
class SearchView extends View {
  #data;
  _parentEl = document.querySelector(".results");
  _errorMessage = " No such recipe found. Plz try for some other recipe.";
  /*
  renderSearchResults(results) {
    const markup = this.generateMarkup(results);
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      `<div class='pagination'></div>`
    );
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }*/
  _generateMarkup(results) {
    return results
      .map((res) => {
        const id = window.location.hash.slice(1);
        return `
        <li class="preview">
          <a class="preview__link ${
            res.id === id ? "preview__link--active" : ""
          }" href="#${res.id}">
            <figure class="preview__fig">
              <img src="${res.imageUrl}" alt="Test" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${res.title}</h4>
              <p class="preview__publisher">${res.publisher}</p>
            </div>
          </a>
        </li>`;
      })
      .join("");
  }
}

export default new SearchView();