"use strict";
//----------------->>Importing API URL<<------------
import { async } from "regenerator-runtime";
import { API_URL, REC_PER_PAGE } from "./config.js";
import { getJSON } from "./helper.js";
//-------------->>EXPORT RECIPE OBJ<<---------------
export const state = {
  recipe: {},
  search: {
    query: [],
    results: [],
    currPage: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    let fetchRecipe = data.data.recipe;
    state.recipe = {
      title: fetchRecipe.title,
      id: fetchRecipe.id,
      cookingTime: fetchRecipe.cooking_time,
      imageUrl: fetchRecipe.image_url,
      ingredients: fetchRecipe.ingredients,
      servings: fetchRecipe.servings,
      sourceUrl: fetchRecipe.source_url,
      publisher: fetchRecipe.publisher,
    };

    const findInd = state.bookmarks.reduce((acc, ele) => {
      //prettier-ignore
      return acc || (ele.id === state.recipe.id);
    }, false);
    if (findInd) state.recipe.isBookmarked = true;
  } catch (err) {
    throw err;
  }
};
export const getSearchResults = async function (query) {
  try {
    state.search.query.push(query);
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        imageUrl: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });
    state.search.currPage = 1;
  } catch (err) {
    throw err;
  }
};
//--------------->>Trims search Results by page for Pagination<<-----------
export function trimResByPage(
  results = state.search.results,
  page = state.search.currPage
) {
  const start = REC_PER_PAGE * (state.search.currPage - 1);
  const end = Math.min(
    state.search.results.length,
    REC_PER_PAGE * state.search.currPage
  );
  return results.slice(start, end);
}

export function updateServings(updateTo) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * updateTo) / state.recipe.servings;
  });
  state.recipe.servings = updateTo;
}

export const addBookmarks = function (recipe) {
  //add recipe to bookmarks array in state
  state.bookmarks.push(recipe);
  //manipulate the isBookmarked property in state.recipe
  state.recipe.isBookmarked = true;

  //Saving bookmarks in localStorage
  persistBookmarks();
};

export const deleteBookmarks = function (id) {
  console.log(state.bookmarks);
  //remove recipe to bookmarks array in state
  const index = state.bookmarks.findIndex((ele) => {
    return ele.id === id;
  });
  const delEle = state.bookmarks.splice(index, 1);
  //manipulate the isBookmarked property in state.recipe
  state.recipe.isBookmarked = false;

  //Saving bookmarks in localStorage
  persistBookmarks();
};
const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

const removeAllBookmarks = function () {
  localStorage.clear("bookmarks");
};
