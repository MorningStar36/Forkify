"use strict";
import "regenerator-runtime";
//-------------->>URL TRIMMER<<----------
import icons from "url:../../img/icons.svg";
function svgUrlTrimmer(url) {
  const pos = url.search(".svg");
  return url.slice(0, pos + 4);
}
const iconsUrl = svgUrlTrimmer(icons);
//---------------------------------------------->>
export default class View {
  _data;
  _iconsUrl = iconsUrl;
  //-------->>Rendering SPINNER
  _renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${iconsUrl}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  //---------------------->>Render<<-----------------
  render(recipe) {
    this._data = recipe;
    const markup = this._generateMarkup(this._data);
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  //--------------------->>Updating view<<-------------
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup(this._data);

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //console.log(newDOM);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const prevElements = Array.from(this._parentEl.querySelectorAll("*"));
    //console.log(newElements, prevElements);
    newElements.forEach((ele, ind) => {
      const prevEl = prevElements[ind];
      if (!prevEl.isEqualNode(ele)) {
        //change text content
        if (prevEl.firstChild?.nodeValue.trim() != "") {
          prevEl.textContent = ele.textContent;
        }
        //change attributes
        Array.from(ele.attributes).forEach((attr) => {
          prevEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  //------------>>Clear Parent Element<<--------------
  _clear() {
    this._parentEl.innerHTML = "";
  }
  //--------------->>Render Errors<<------------
  renderError() {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${this._iconsUrl}#icon-alert-triangle"></use>
        </svg>
        </div>
        <p>${this._errorMessage}</p>
      </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}
