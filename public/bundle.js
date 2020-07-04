/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/film-card.js":
/*!*************************************!*\
  !*** ./src/components/film-card.js ***!
  \*************************************/
/*! exports provided: createFilmCardTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmCardTemplate", function() { return createFilmCardTemplate; });
const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};


/***/ }),

/***/ "./src/components/films.js":
/*!*********************************!*\
  !*** ./src/components/films.js ***!
  \*********************************/
/*! exports provided: createFilmsTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmsTemplate", function() { return createFilmsTemplate; });
const createFilmsTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
    </section>`
  );
};


/***/ }),

/***/ "./src/components/most-commented.js":
/*!******************************************!*\
  !*** ./src/components/most-commented.js ***!
  \******************************************/
/*! exports provided: createMostCommentedTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMostCommentedTemplate", function() { return createMostCommentedTemplate; });
const createMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};


/***/ }),

/***/ "./src/components/navigation.js":
/*!**************************************!*\
  !*** ./src/components/navigation.js ***!
  \**************************************/
/*! exports provided: createNavigationTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNavigationTemplate", function() { return createNavigationTemplate; });
const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


/***/ }),

/***/ "./src/components/profile.js":
/*!***********************************!*\
  !*** ./src/components/profile.js ***!
  \***********************************/
/*! exports provided: createProfileTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProfileTemplate", function() { return createProfileTemplate; });
const createProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


/***/ }),

/***/ "./src/components/show-more-button.js":
/*!********************************************!*\
  !*** ./src/components/show-more-button.js ***!
  \********************************************/
/*! exports provided: createShowMoreButtonTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShowMoreButtonTemplate", function() { return createShowMoreButtonTemplate; });
const createShowMoreButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;


/***/ }),

/***/ "./src/components/sorting.js":
/*!***********************************!*\
  !*** ./src/components/sorting.js ***!
  \***********************************/
/*! exports provided: createSortingTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSortingTemplate", function() { return createSortingTemplate; });
const createSortingTemplate = () => {
  return (
    ` <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};


/***/ }),

/***/ "./src/components/top-rated.js":
/*!*************************************!*\
  !*** ./src/components/top-rated.js ***!
  \*************************************/
/*! exports provided: createTopRatedTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTopRatedTemplate", function() { return createTopRatedTemplate; });
const createTopRatedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_profile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/profile.js */ "./src/components/profile.js");
/* harmony import */ var _components_navigation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/navigation.js */ "./src/components/navigation.js");
/* harmony import */ var _components_sorting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/sorting.js */ "./src/components/sorting.js");
/* harmony import */ var _components_films_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/films.js */ "./src/components/films.js");
/* harmony import */ var _components_film_card_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/film-card.js */ "./src/components/film-card.js");
/* harmony import */ var _components_show_more_button_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/show-more-button.js */ "./src/components/show-more-button.js");
/* harmony import */ var _components_top_rated_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/top-rated.js */ "./src/components/top-rated.js");
/* harmony import */ var _components_most_commented_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/most-commented.js */ "./src/components/most-commented.js");









// Разметка попапа, из-за неиспользуемости переменной временно закомментировал код
// import {createFilmDetailsTemplate} from "./components/film-details.js";

const COUNT = {
  FILM: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
};

const FILMS_LIST_CONTAINER = {
  FILM: 0,
  TOP_RATED: 1,
  MOST_COMMENTED: 2,
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilms = (container, template, filmCount) => {
  for (let i = 0; i < filmCount; i++) {
    render(container, template);
  }
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, Object(_components_profile_js__WEBPACK_IMPORTED_MODULE_0__["createProfileTemplate"])());
render(siteMainElement, Object(_components_navigation_js__WEBPACK_IMPORTED_MODULE_1__["createNavigationTemplate"])());
render(siteMainElement, Object(_components_sorting_js__WEBPACK_IMPORTED_MODULE_2__["createSortingTemplate"])());
render(siteMainElement, Object(_components_films_js__WEBPACK_IMPORTED_MODULE_3__["createFilmsTemplate"])());

const filmsElement = siteMainElement.querySelector(`.films`);

render(filmsElement, Object(_components_top_rated_js__WEBPACK_IMPORTED_MODULE_6__["createTopRatedTemplate"])());
render(filmsElement, Object(_components_most_commented_js__WEBPACK_IMPORTED_MODULE_7__["createMostCommentedTemplate"])());

const filmListContainerElements = filmsElement.querySelectorAll(`.films-list__container`);

renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], Object(_components_film_card_js__WEBPACK_IMPORTED_MODULE_4__["createFilmCardTemplate"])(), COUNT.FILM);
render(filmListContainerElements[FILMS_LIST_CONTAINER.FILM], Object(_components_show_more_button_js__WEBPACK_IMPORTED_MODULE_5__["createShowMoreButtonTemplate"])(), `afterend`);
renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.TOP_RATED], Object(_components_film_card_js__WEBPACK_IMPORTED_MODULE_4__["createFilmCardTemplate"])(), COUNT.TOP_RATED);
renderFilms(filmListContainerElements[FILMS_LIST_CONTAINER.MOST_COMMENTED], Object(_components_film_card_js__WEBPACK_IMPORTED_MODULE_4__["createFilmCardTemplate"])(), COUNT.MOST_COMMENTED);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map