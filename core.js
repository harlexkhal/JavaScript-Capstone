/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./custom_modules/application/application.js":
/*!***************************************************!*\
  !*** ./custom_modules/application/application.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gateway_food_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gateway/food.js */ \"./custom_modules/gateway/food.js\");\n/* harmony import */ var _gateway_interaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gateway/interaction.js */ \"./custom_modules/gateway/interaction.js\");\n/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./window.js */ \"./custom_modules/application/window.js\");\n\r\n\r\n\r\n\r\nclass ApplicationEngine {\r\n  constructor() {\r\n    this.appID = 'LWKqOYwzRz4RLPAnwcTk';\r\n    this.foodAPIConnection = new _gateway_food_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    this.involvmentConnection = new _gateway_interaction_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.appID);\r\n\r\n    this.window = new _window_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n    this.items = [];\r\n    this.currCategory = '';\r\n    this.currSelectedItemID = -1;\r\n  }\r\n\r\n  start = () => {\r\n    this.fetchFoodItems();\r\n  }\r\n\r\n  fetchFoodItems = () => {\r\n    const res = this.foodAPIConnection.fetchAllCategories();\r\n    res.then((data) => {\r\n      const categoryList = data.meals;\r\n      const rand = Math.floor(Math.random() * categoryList.length);\r\n      this.currCategory = categoryList[rand].strCategory;\r\n      const promiseRes = this.foodAPIConnection.getItemsByCategory(this.currCategory);\r\n      promiseRes.then((data) => {\r\n        const iRes = this.involvmentConnection.getLIkes();\r\n        iRes.then((likes) => {\r\n          this.items = data.meals;\r\n          this.window.displayItems(this.items, likes);\r\n          this.#bindEvents();\r\n        });\r\n      })\r\n        .catch((error) => {\r\n          throw error;\r\n        });\r\n    })\r\n      .catch((error) => {\r\n        throw error;\r\n      });\r\n  }\r\n\r\n  FetchFoodItemByID = (id) => {\r\n    this.window.showLoader();\r\n    const res = this.foodAPIConnection.getItemByID(id);\r\n    res.then((data) => {\r\n      const iRes = this.involvmentConnection.getComments(id);\r\n      iRes.then(() => {\r\n        this.currSelectedItemID = id;\r\n        this.window.displayItem(data.meals[0]);\r\n      });\r\n    })\r\n      .catch((error) => {\r\n        throw error;\r\n      });\r\n  }\r\n\r\n  addLikeToItem = (id) => {\r\n    this.involvmentConnection.addLike(id);\r\n  }\r\n\r\n  addCommentToItem = (itemId, userName, comment) => {\r\n    this.involvmentConnection.addComment(itemId, userName, comment);\r\n  }\r\n\r\n  #bindEvents = () => {\r\n    const modal = this.window.openModalAction();\r\n    const modalCloser = this.window.closeModalAction();\r\n    modalCloser.addEventListener('click', () => {\r\n      modal.classList.remove('d-block');\r\n      modal.classList.add('d-none');\r\n    });\r\n\r\n    const commentSpans = this.window.commentsButtonAction();\r\n    commentSpans.forEach((span, i) => {\r\n      span.addEventListener('click', (event) => {\r\n        const refEvent = event.currentTarget;\r\n        modal.classList.remove('d-none');\r\n        modal.classList.add('d-block');\r\n        refEvent.ref.FetchFoodItemByID(refEvent.ref.items[refEvent.index].idMeal);\r\n      });\r\n      span.ref = this;\r\n      span.index = i;\r\n    });\r\n\r\n    const viewSpans = this.window.fullViewImageAction();\r\n    viewSpans.forEach((viewSpan, i) => {\r\n      viewSpan.addEventListener('click', (event) => {\r\n        const refEvent = event.currentTarget;\r\n        modal.classList.remove('d-none');\r\n        modal.classList.add('d-block');\r\n        refEvent.ref.FetchFoodItemByID(refEvent.ref.items[refEvent.index].idMeal);\r\n      });\r\n      viewSpan.ref = this;\r\n      viewSpan.index = i;\r\n    });\r\n\r\n    const itemsLike = this.window.likeItemAction();\r\n    itemsLike.forEach((itemLike, i) => {\r\n      itemLike.addEventListener('click', (event) => {\r\n        const refEvent = event.currentTarget;\r\n        refEvent.thisRef.classList.add('animate__animated');\r\n        refEvent.thisRef.classList.add('animate__rubberBand');\r\n        setTimeout(() => {\r\n          refEvent.thisRef.classList.remove('animate__animated');\r\n          refEvent.thisRef.classList.remove('animate__rubberBand');\r\n        }, 800, refEvent);\r\n        refEvent.classRef.addLikeToItem(refEvent.classRef.items[refEvent.index].idMeal);\r\n      });\r\n      itemLike.thisRef = itemLike;\r\n      itemLike.classRef = this;\r\n      itemLike.index = i;\r\n    });\r\n\r\n    const modalContent = this.window.modalContentAction();\r\n    document.addEventListener('click', (event) => {\r\n      const isClickInsideElementModal = modalContent.contains(event.target);\r\n      let isClickInsideModalOpener = false;\r\n\r\n      for (let i = 0; i < viewSpans.length; i += 1) {\r\n        const optionTwo = viewSpans[i].contains(event.target);\r\n        const optionOne = commentSpans[i].contains(event.target);\r\n        if (optionOne || optionTwo) {\r\n          isClickInsideModalOpener = true;\r\n          break;\r\n        }\r\n      }\r\n\r\n      if (!isClickInsideElementModal && !isClickInsideModalOpener) {\r\n        modal.classList.remove('d-block');\r\n        modal.classList.add('d-none');\r\n      }\r\n    });\r\n\r\n    const form = this.window.commentformAction();\r\n    form.addEventListener('submit', (event) => {\r\n      const nameInput = this.window.commentformNameInputAction();\r\n      const commentBody = this.window.commentformBodyInputAction();\r\n      this.addCommentToItem(this.currSelectedItemID, nameInput.value, commentBody.value);\r\n      nameInput.value = '';\r\n      commentBody.value = '';\r\n      this.window.commentsListAction().innerHTML = '<i class=\"green-text\">Loading all comments ...<i>';\r\n      setTimeout(() => {\r\n        const iRes = this.involvmentConnection.getComments(this.currSelectedItemID);\r\n        iRes.then((comments) => {\r\n          this.window.displayItemComments(comments);\r\n        });\r\n      }, 800);\r\n      event.preventDefault();\r\n    });\r\n\r\n    const winRef = this.window;\r\n    setInterval(() => {\r\n      const promiseRes = this.foodAPIConnection.getItemsByCategory(this.currCategory);\r\n      promiseRes.then((data) => {\r\n        const iRes = this.involvmentConnection.getLIkes();\r\n        iRes.then((likes) => {\r\n          this.items = data.meals;\r\n          winRef.updateDisplay(this.items, likes);\r\n        });\r\n      })\r\n        .catch((error) => {\r\n          throw error;\r\n        });\r\n    }, 300, winRef);\r\n  }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApplicationEngine);\n\n//# sourceURL=webpack://foodipy/./custom_modules/application/application.js?");

/***/ }),

/***/ "./custom_modules/application/window.js":
/*!**********************************************!*\
  !*** ./custom_modules/application/window.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Window {\r\n  constructor() {\r\n    this.itemList = document.querySelector('.meal-content');\r\n    this.itemCounter = document.querySelector('.item-count');\r\n    this.loaders = document.querySelectorAll('.loading');\r\n\r\n    // modal\r\n    this.itemName = document.querySelector('.item-name');\r\n    this.itemCategoryModal = document.querySelector('.modal-item-category');\r\n    this.itemAreaModal = document.querySelector('.modal-item-area');\r\n    this.itemVideoModal = document.querySelector('.modal-item-video');\r\n    this.itemDescription = document.querySelector('.modal-item-description');\r\n    this.itemComments = document.querySelector('.user-comments');\r\n    this.itemCommentsCounter = document.querySelector('.comment-count-info');\r\n  }\r\n\r\n  displayItems = (items, likes) => {\r\n    this.itemCounter.innerHTML = items.length;\r\n    let domContent = '';\r\n    items.forEach((item) => {\r\n      const filtered = likes.filter((like) => {\r\n        const likeState = like.item_id === item.idMeal;\r\n        return likeState;\r\n      });\r\n\r\n      let likeCount = 0;\r\n      if (filtered.length > 0) {\r\n        likeCount = filtered[0].likes;\r\n      }\r\n\r\n      domContent = `${domContent}<li class=\"item\">\r\n      <img class=\"full-view zoom\"\r\n        src=${item.strMealThumb}\r\n        alt=${item.strMeal}\r\n      />\r\n      <section class=\"caption\">\r\n        <h2 class=\"d-flex\">\r\n        ${item.strMeal}<span class=\"item-likes\">&nbsp; <i class=\"fa-solid fa-heart red-heart\"></i>&nbsp;<i class=\"heart-counter\">${likeCount}</i></span>\r\n        </h2>\r\n        <span class=\"view-comments\"\r\n          ><i class=\"fa-solid fa-comments blue-comment\"></i> Comment</span\r\n        >\r\n      </section>\r\n    </li>`;\r\n    });\r\n    this.itemList.innerHTML = domContent;\r\n    this.hideLoader();\r\n  }\r\n\r\n  displayItem = (item) => {\r\n    this.itemName.innerHTML = `Name: ${item.strMeal}`;\r\n    this.itemCategoryModal.innerHTML = `Category: <span class=\"green-text animate__animated animate__bounceInLeft\">${item.strCategory}</span>`;\r\n    this.itemAreaModal.innerHTML = `Area: <span class=\"red-text animate__animated animate__bounceInLeft\"> ${item.strArea} </span>`;\r\n    const videoUrl = item.strYoutube.split('=');\r\n    const ID = videoUrl.pop();\r\n    this.itemVideoModal.src = `https://www.youtube.com/embed/${ID}?autoplay=0&loop=1&mute=1&playlist=${ID}`;\r\n    this.itemDescription.innerHTML = item.strInstructions;\r\n    this.itemComments.innerHTML = '<li class=\"comment red-text\">Comment on this meal to see other comments! if exist</li>';\r\n    this.itemCommentsCounter.innerHTML = 'Comments (0)';\r\n    this.hideLoader();\r\n  }\r\n\r\n  displayItemComments = (comments) => {\r\n    let domContent = '';\r\n    comments.forEach((comment) => {\r\n      domContent = `${domContent}<li class=\"comment\"><i>${comment.creation_date}: </i> <span class=\"red-text\">${comment.username}:</span> <span class=\"green-text\">${comment.comment}</span></li>`;\r\n    });\r\n    this.itemComments.innerHTML = domContent;\r\n    this.itemCommentsCounter.innerHTML = `Comments (${comments.length})`;\r\n  }\r\n\r\n  showLoader = () => {\r\n    this.loaders.forEach((loader) => {\r\n      loader.classList.remove('hide');\r\n      loader.classList.add('show');\r\n    });\r\n  }\r\n\r\n  hideLoader = () => {\r\n    this.loaders.forEach((loader) => {\r\n      loader.classList.remove('show');\r\n      loader.classList.add('hide');\r\n    });\r\n  }\r\n\r\n  updateDisplay = (items, likes) => {\r\n    const allHearts = this.likeCounterAction();\r\n    allHearts.forEach((heart, index) => {\r\n      const filtered = likes.filter((like) => {\r\n        const likeState = like.item_id === items[index].idMeal;\r\n        return likeState;\r\n      });\r\n\r\n      let likeCount = 0;\r\n      if (filtered.length > 0) {\r\n        likeCount = filtered[0].likes;\r\n        heart.innerHTML = likeCount;\r\n      }\r\n    });\r\n  }\r\n\r\n  openModalAction = () => document.querySelector('#the-modal');\r\n\r\n  commentformAction = () => document.querySelector('.comment-form');\r\n\r\n  commentformNameInputAction = () => document.querySelector('.username');\r\n\r\n  commentformBodyInputAction = () => document.querySelector('.comment-body');\r\n\r\n  closeModalAction = () => document.querySelector('#modal-closer');\r\n\r\n  commentsButtonAction = () => document.querySelectorAll('.view-comments');\r\n\r\n  fullViewImageAction = () => document.querySelectorAll('.full-view');\r\n\r\n  modalContentAction = () => document.querySelector('.modal-content');\r\n\r\n  likeItemAction = () => document.querySelectorAll('.item-likes');\r\n\r\n  likeCounterAction = () => document.querySelectorAll('.heart-counter');\r\n\r\n  commentsListAction = () => this.itemComments;\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Window);\n\n//# sourceURL=webpack://foodipy/./custom_modules/application/window.js?");

/***/ }),

/***/ "./custom_modules/gateway/food.js":
/*!****************************************!*\
  !*** ./custom_modules/gateway/food.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gateway_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gateway.js */ \"./custom_modules/gateway/gateway.js\");\n\r\n\r\nclass FoodNetwork extends _gateway_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n  constructor() {\r\n    super('https://www.themealdb.com/api/json/v1/1/');\r\n  }\r\n\r\n  getItemByID = async (id) => {\r\n    const data = await fetch(`${this.baseurl}lookup.php?i=${id}`);\r\n    return data.json();\r\n  }\r\n\r\n  getItemsByCategory = async (category) => {\r\n    const data = await fetch(`${this.baseurl}filter.php?c=${category}`);\r\n    return data.json();\r\n  }\r\n\r\n  fetchAllCategories = async () => {\r\n    const data = await fetch(`${this.baseurl}list.php?c=list`);\r\n    return data.json();\r\n  }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FoodNetwork);\n\n//# sourceURL=webpack://foodipy/./custom_modules/gateway/food.js?");

/***/ }),

/***/ "./custom_modules/gateway/gateway.js":
/*!*******************************************!*\
  !*** ./custom_modules/gateway/gateway.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass NetworkGateway {\r\n  constructor(src) {\r\n    this.baseurl = '';\r\n    this.start(src);\r\n  }\r\n\r\n  start = (srcLink) => {\r\n    this.baseurl = srcLink;\r\n  }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NetworkGateway);\n\n//# sourceURL=webpack://foodipy/./custom_modules/gateway/gateway.js?");

/***/ }),

/***/ "./custom_modules/gateway/interaction.js":
/*!***********************************************!*\
  !*** ./custom_modules/gateway/interaction.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gateway_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gateway.js */ \"./custom_modules/gateway/gateway.js\");\n\r\n\r\nclass InteractionGateway extends _gateway_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n  constructor(instanceID) {\r\n    super('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/');\r\n    this.dbInstance = instanceID;\r\n  }\r\n\r\n  addLike = async (itemID) => {\r\n    await fetch(`${this.baseurl}${this.dbInstance}/likes`, {\r\n      method: 'POST',\r\n      headers: {\r\n        'Content-Type': 'application/json',\r\n      },\r\n      body: JSON.stringify({ item_id: itemID }),\r\n    });\r\n  }\r\n\r\n  getLIkes = async () => {\r\n    const data = await fetch(`${this.baseurl}${this.dbInstance}/likes`, { method: 'GET' });\r\n    return data.json();\r\n  }\r\n\r\n  addComment = async (itemID, _userName, _comment) => {\r\n    await fetch(`${this.baseurl}${this.dbInstance}/comments`, {\r\n      method: 'POST',\r\n      headers: {\r\n        'Content-Type': 'application/json',\r\n      },\r\n      body: JSON.stringify({ item_id: itemID, username: _userName, comment: _comment }),\r\n    });\r\n  }\r\n\r\n  getComments = async (itemID) => {\r\n    const data = await fetch(`${this.baseurl}${this.dbInstance}/comments?item_id=${itemID}`, { method: 'GET' });\r\n    return data.json();\r\n  }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InteractionGateway);\n\n//# sourceURL=webpack://foodipy/./custom_modules/gateway/interaction.js?");

/***/ }),

/***/ "./node_modules/@fortawesome/fontawesome-free/js/all.js":
/*!**************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-free/js/all.js ***!
  \**************************************************************/
/***/ (() => {


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_utility_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!./utility.css */ \"./node_modules/css-loader/dist/cjs.js!./src/utility.css\");\n// Imports\n\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_utility_css__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\r\\n  box-sizing: border-box;\\r\\n}\\r\\n\\r\\nbody {\\r\\n  overflow-x: hidden;\\r\\n  margin: 0;\\r\\n}\\r\\n\\r\\nul {\\r\\n  list-style: none;\\r\\n  padding: 0;\\r\\n}\\r\\n\\r\\nimg {\\r\\n  width: 50%;\\r\\n  height: 20vh;\\r\\n}\\r\\n\\r\\na {\\r\\n  text-decoration: none;\\r\\n}\\r\\n\\r\\nfieldset {\\r\\n  height: 100%;\\r\\n  width: 100%;\\r\\n  border: none;\\r\\n}\\r\\n\\r\\nlegend {\\r\\n  margin-bottom: 1rem;\\r\\n  text-align: center;\\r\\n}\\r\\n\\r\\ninput,\\r\\ntextarea {\\r\\n  width: 30vw;\\r\\n  height: 5vh;\\r\\n  padding: 0.5rem 0.3rem;\\r\\n  transition: all 1s ease-in-out;\\r\\n}\\r\\n\\r\\ntextarea {\\r\\n  width: 35vw;\\r\\n  height: 30vh;\\r\\n  resize: none;\\r\\n}\\r\\n\\r\\ninput:focus,\\r\\ntextarea:focus {\\r\\n  font-size: large;\\r\\n}\\r\\n\\r\\nh2 span {\\r\\n  font-size: small;\\r\\n}\\r\\n\\r\\nfooter {\\r\\n  border-top: black 1px solid;\\r\\n  height: 10vh;\\r\\n  align-items: center;\\r\\n  padding-left: 2rem;\\r\\n}\\r\\n\\r\\n.comments {\\r\\n  font-size: large;\\r\\n}\\r\\n\\r\\n.comments:hover {\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.modal {\\r\\n  position: fixed;\\r\\n  width: 100%;\\r\\n  height: 100%;\\r\\n  top: 0;\\r\\n  left: 0;\\r\\n  background: rgba(50, 50, 50, 0.9);\\r\\n  color: white;\\r\\n  overflow-y: scroll;\\r\\n}\\r\\n\\r\\n.modal-content {\\r\\n  width: 90%;\\r\\n  background-color: white;\\r\\n  color: black;\\r\\n  margin: 1rem auto;\\r\\n  padding-bottom: 3rem;\\r\\n}\\r\\n\\r\\n.modal iframe {\\r\\n  width: 100%;\\r\\n  border: none;\\r\\n}\\r\\n\\r\\n.loading {\\r\\n  margin-left: auto;\\r\\n  margin-right: auto;\\r\\n  width: 200px;\\r\\n}\\r\\n\\r\\n.hide {\\r\\n  display: none;\\r\\n}\\r\\n\\r\\n.show {\\r\\n  display: block;\\r\\n}\\r\\n\\r\\n.red-text {\\r\\n  color: red;\\r\\n  font-family: 'Comic Sans MS', serif;\\r\\n  font-size: large;\\r\\n}\\r\\n\\r\\n.green-text {\\r\\n  color: green;\\r\\n  font-family: 'Comic Sans MS', serif;\\r\\n  font-size: large;\\r\\n}\\r\\n\\r\\n.zoom {\\r\\n  transition: transform 0.2s;\\r\\n}\\r\\n\\r\\n.zoom:hover {\\r\\n  -ms-transform: scale(1.3);\\r\\n  -webkit-transform: scale(1.3);\\r\\n  transform: scale(1.3);\\r\\n}\\r\\n\\r\\n.red-heart {\\r\\n  color: red;\\r\\n  font-size: medium;\\r\\n}\\r\\n\\r\\n.blue-comment {\\r\\n  color: rgb(85, 85, 255);\\r\\n  font-size: medium;\\r\\n}\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://foodipy/./src/index.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/utility.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/utility.css ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".container {\\r\\n  max-width: 960px;\\r\\n  margin: 0 auto;\\r\\n}\\r\\n\\r\\n.logo {\\r\\n  border-radius: 50%;\\r\\n  border: 1px solid blue;\\r\\n  padding: 0.6rem;\\r\\n}\\r\\n\\r\\n.d-flex {\\r\\n  display: flex;\\r\\n}\\r\\n\\r\\n.d-grid {\\r\\n  display: grid;\\r\\n}\\r\\n\\r\\n.d-none {\\r\\n  display: none;\\r\\n}\\r\\n\\r\\n.d-block {\\r\\n  display: block;\\r\\n}\\r\\n\\r\\n.navbar {\\r\\n  align-items: baseline;\\r\\n  justify-content: space-between;\\r\\n}\\r\\n\\r\\n.nav-item {\\r\\n  margin-right: 1rem;\\r\\n}\\r\\n\\r\\n.items {\\r\\n  grid-template-columns: repeat(3, 1fr);\\r\\n  column-gap: 10rem;\\r\\n  row-gap: 2rem;\\r\\n}\\r\\n\\r\\n.close-modal {\\r\\n  font-size: larger;\\r\\n  position: fixed;\\r\\n  right: 8rem;\\r\\n  top: 1rem;\\r\\n}\\r\\n\\r\\n.close-modal:hover {\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.caption,\\r\\n.comment-form,\\r\\n.comments-container {\\r\\n  width: 75%;\\r\\n  flex-direction: column;\\r\\n  margin: 0 auto;\\r\\n}\\r\\n\\r\\n.comment-form {\\r\\n  height: 62vh;\\r\\n}\\r\\n\\r\\n.comment-fieldset {\\r\\n  flex-direction: column;\\r\\n  align-items: flex-start;\\r\\n  justify-content: space-between;\\r\\n}\\r\\n\\r\\n.item img {\\r\\n  width: 100%;\\r\\n  height: 30vh;\\r\\n  border-radius: 10px;\\r\\n}\\r\\n\\r\\n.nav-item:last-of-type {\\r\\n  margin-right: 0;\\r\\n}\\r\\n\\r\\nh2.d-flex {\\r\\n  justify-content: space-between;\\r\\n  align-items: baseline;\\r\\n}\\r\\n\\r\\nmain.container {\\r\\n  margin-top: 3rem;\\r\\n}\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://foodipy/./src/utility.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://foodipy/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://foodipy/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ \"./node_modules/css-loader/dist/cjs.js!./src/index.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://foodipy/./src/index.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://foodipy/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://foodipy/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://foodipy/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://foodipy/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://foodipy/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://foodipy/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _fortawesome_fontawesome_free_js_all_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/fontawesome-free/js/all.js */ \"./node_modules/@fortawesome/fontawesome-free/js/all.js\");\n/* harmony import */ var _fortawesome_fontawesome_free_js_all_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_js_all_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_images_loader_gif__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/images/loader.gif */ \"./src/assets/images/loader.gif\");\n/* harmony import */ var _custom_modules_application_application_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../custom_modules/application/application.js */ \"./custom_modules/application/application.js\");\n\r\n\r\n\r\n\r\n\r\nconst loaders = document.querySelectorAll('.loading');\r\nloaders.forEach((loader) => {\r\n  loader.src = _assets_images_loader_gif__WEBPACK_IMPORTED_MODULE_2__;\r\n});\r\n\r\nconst application = new _custom_modules_application_application_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\napplication.start();\n\n//# sourceURL=webpack://foodipy/./src/index.js?");

/***/ }),

/***/ "./src/assets/images/loader.gif":
/*!**************************************!*\
  !*** ./src/assets/images/loader.gif ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"assets/images/loader..gif\";\n\n//# sourceURL=webpack://foodipy/./src/assets/images/loader.gif?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;