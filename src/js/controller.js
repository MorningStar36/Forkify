"use strict";
//------------------------>>Pollyfilling<<---------------------------
import "core-js/stable";
import "regenerator-runtime/runtime";
//------------------------>>Importing from modle.js<<-----------------
import * as model from "./model.js";
//------------------------>>Importing from recipeView.js<<-----------------
import RecipeView from "./views/recipeView.js";
//------------------------->>Importing from searchRecipeView<<---------------
import SearchRecipeView from "./views/searchRecipeView.js";
//------------------------>>Importing from searchView.js<<------------------
import SearchView from "./views/searchView.js";
//------------------------>>Selecting Elements<<------------------------
const recipeContainer = document.querySelector(".recipe");
//----------------------->>Importing from paginationView<<--------------
import PaginationView from "./views/paginationView.js";
//----------------------->>Importing from BookmarkView<<-----------------
import BookmarksView from "./views/bookmarksView.js";
//----------------------->>Importing from RecipeView.js<<---------------
import AddRecipeView from "./views/addRecipeView.js";
//------------------------------->>Functions<<--------------------
//------>>Rendering Recipe
//API DOCS :-  https://forkify-api.herokuapp.com/v2
const controlRecipes = async function () {
  try {
    const hashId = window.location.hash.slice(1);
    if (!hashId) return;
    RecipeView._renderSpinner();
    //------------------------->>Updating Search <<---------------------------
    SearchView.update(model.trimResByPage());
    //------------------------->>Loading the Recipe<<--------------------------
    await model.loadRecipe(hashId);

    const { recipe } = model.state;
    //------------------------>>Rendering the Recipe<<------------------------
    RecipeView.render(recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const controlSearchRecipes = async function () {
  try {
    const query = SearchRecipeView.getQuery();
    if (!query) return;
    SearchView._renderSpinner();
    await model.getSearchResults(query);
    //data inside model.results
    //console.log(model.state.results);
    if (model.state.search.results.length === 0) {
      throw new Error();
    }
    const trimmedRecipies = model.trimResByPage(
      model.state.search.results,
      model.state.search.currPage
    );
    SearchView.render(trimmedRecipies);
    //------------------------>>Insert Initial Pagintion<<---------------------
    PaginationView.render(model.state);
  } catch (err) {
    SearchView.renderError();
  }
};
function controlPagination(e, btn) {
  if (btn.classList.contains("pagination__btn--prev")) {
    model.state.search.currPage--;
    const trimmedRecipies = model.trimResByPage(
      model.state.search.results,
      model.state.search.currPage
    );
    SearchView.render(trimmedRecipies);
  } else {
    model.state.search.currPage++;
    const trimmedRecipies = model.trimResByPage(
      model.state.search.results,
      model.state.search.currPage
    );
    SearchView.render(trimmedRecipies);
  }
  //------------->.Under Pagination<<----------
  PaginationView.render(model.state);
}
function controlBookmarks(e, btn) {
  try {
    //if not bookmarked:- bookmark
    if (!model.state.recipe.isBookmarked)
      model.addBookmarks(model.state.recipe);
    else model.deleteBookmarks(model.state.recipe.id);
    //update the ui
    RecipeView.update(model.state.recipe);
    if (model.state.bookmarks.length === 0) throw new Error();
    BookmarksView.render(model.state.bookmarks);
  } catch {
    BookmarksView.renderError();
  }
}
function controlServings(updateTo) {
  //update the recipe according to servings
  model.updateServings(updateTo);
  //render to updated recipe
  RecipeView.update(model.state.recipe);
}
function controlLoadBookmarks() {
  const bkmrks = localStorage.getItem("bookmarks");
  if (!bkmrks) return;
  model.state.bookmarks = JSON.parse(bkmrks);
  if (model.state.bookmarks.length === 0) return;
  BookmarksView.render(model.state.bookmarks);
}
function controlUploadRecipe(RecipeData) {
  console.log(RecipeData);
}
function init() {
  BookmarksView.addHandlerBookmarks(controlLoadBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerServings(controlServings);
  RecipeView.addHandlerBookmarks(controlBookmarks);
  SearchRecipeView.addHandlerSearch(controlSearchRecipes);
  PaginationView.addHandlerPagination(controlPagination);
  AddRecipeView._addHandlerUpload(controlUploadRecipe);
}
init();

//----------->>hot module replacement
if (module.hot) {
  module.hot.accept();
}
///////////////////////////////////////
