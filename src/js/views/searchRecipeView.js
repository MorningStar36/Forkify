//----------------->>Importing async<<---------------
import { async } from "regenerator-runtime";
import "core-js";
//------->>
class SearchRecipeView {
  //on clicking in search form...things should take place.Related to DOM, hence must be in view.
  _parentEl = document.querySelector(".search");
  _errorMessage = `No recipes found for the query`;
  //------------->>get Query<<-------------
  #cleanForm() {
    this._parentEl.querySelector(".search__field").value = "";
  }
  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;
    this.#cleanForm();
    return query;
  }
  //---------->>Subscriber<<---------------
  addHandlerSearch(searchFunction) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      searchFunction();
    });
  }
}

export default new SearchRecipeView();
