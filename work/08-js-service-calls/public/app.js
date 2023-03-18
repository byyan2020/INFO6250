/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLIENT": () => (/* binding */ CLIENT),
/* harmony export */   "MESSAGES": () => (/* binding */ MESSAGES),
/* harmony export */   "SERVER": () => (/* binding */ SERVER)
/* harmony export */ });
var _MESSAGES;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SERVER = {
  AUTH_MISSING: 'auth-missing'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = (_MESSAGES = {}, _defineProperty(_MESSAGES, CLIENT.NETWORK_ERROR, 'Network problems. Please try again'), _defineProperty(_MESSAGES, CLIENT.NO_SESSION, 'No login session. Please login'), _defineProperty(_MESSAGES, CLIENT.AUTH_MISSING, 'Auth missing. Please login again'), _defineProperty(_MESSAGES, "default", 'Something went wrong. Please try again'), _MESSAGES);

/***/ }),

/***/ "./src/listener.js":
/*!*************************!*\
  !*** ./src/listener.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLoginListener": () => (/* binding */ addLoginListener),
/* harmony export */   "addLogoutListener": () => (/* binding */ addLogoutListener),
/* harmony export */   "addWordListenser": () => (/* binding */ addWordListenser)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");




function addLoginListener(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("login-form")) {
      return;
    }
    var username = appEl.querySelector(".login-username").value;
    // Service call to login
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (_ref2) {
      var username = _ref2.username;
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.login)(username);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchWord)();
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
    })
    // Get word from fetchWord service and render the page
    .then(function (response) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setWord)(response.storedWord);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
    })
    // Catch fetchWord error
    ["catch"](function (err) {
      // Catch no session error
      if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_3__.CLIENT.NO_SESSION) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
        (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
          state: state,
          appEl: appEl
        });
        return;
      }
      // Catch unpected error
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addLogoutListener(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("logout-form")) {
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addWordListenser(_ref4) {
  var state = _ref4.state,
    appEl = _ref4.appEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("word-form")) {
      return;
    }
    var word = appEl.querySelector(".word-input").value;
    // Service call to update word
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchPostWord)(word).then(function (_ref5) {
      var storedWord = _ref5.storedWord;
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setWord)(storedWord);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n    ".concat(getErrorHtml(state), "\n    ").concat(getLoginHtml(state), "\n    ").concat(getLogoutHtml(state), "\n    ").concat(getWordHtml(state), "\n    ");
  appEl.innerHTML = html;
}
function getLoginHtml(state) {
  if (state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"login\">\n        <form class=\"login-form\" action=\"#/login\">\n            <label class=\"form-label\">\n                <span>Username:</span>\n                <input class=\"login-username\" name=\"username\"/>\n            </label>\n            <button type=\"submit\" class=\"form-btn\">Submit</button>\n        </form>\n    </div>\n    ";
}
function getLogoutHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"logout\">\n        <form class=\"logout-form\" action=\"#/logout\">\n            <button type=\"submit\" class=\"logout-btn\">Logout</button>\n        </form>\n    </div>\n    ";
}
function getWordHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"word\">\n        <p>Username: ".concat(state.username, "</p>\n        <p>Stored Word: ").concat(state.word, "</p>\n        <form class=\"word-form\" action=\"#/store\">\n            <label>\n                <span>Update your stored word: </span>\n                <input class=\"word-input\" name=\"storedWord\"/>\n            </label>\n            <button class=\"form-btn\" type=\"submit\">Submit</button>\n        </form>\n    </div>\n    ");
}
function getErrorHtml(state) {
  return "\n    <div class=\"error\">".concat(state.error, "</div>\n");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchPostWord": () => (/* binding */ fetchPostWord),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession),
/* harmony export */   "fetchWord": () => (/* binding */ fetchWord)
/* harmony export */ });
// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions
function fetchSession() {
  return fetch('/api/session', {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'netword-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchWord() {
  return fetch('/api/word', {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchPostWord(word) {
  return fetch('/api/word', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "setError": () => (/* binding */ setError),
/* harmony export */   "setWord": () => (/* binding */ setWord)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  word: "",
  isLoggedIn: false,
  username: "",
  error: ""
};
function login(username) {
  state.isLoggedIn = true;
  state.username = username;
  state.error = "";
}
function logout() {
  state.isLoggedIn = false;
  state.username = "";
  state.word = "";
  state.error = "";
}
function setWord(word) {
  state.word = word;
  state.error = "";
}
function setError(error) {
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listener__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listener */ "./src/listener.js");





var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listener__WEBPACK_IMPORTED_MODULE_4__.addLoginListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listener__WEBPACK_IMPORTED_MODULE_4__.addLogoutListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listener__WEBPACK_IMPORTED_MODULE_4__.addWordListenser)({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
checkForSession();
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchSession)()
  // Session exists
  .then(function (session) {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.login)(session.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchWord)();
  })
  // Catch fetchSession error
  ["catch"](function (err) {
    // Catch no session error
    if ((err === null || err === void 0 ? void 0 : err.error) === SERVICE.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_2__.CLIENT.NO_SESSION
      });
    }
    // Catch other session
    return Promise.reject(err);
  })
  // Get word from fetchWord service and render the page
  .then(function (response) {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setWord)(response.storedWord);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
  })
  // Catch fetchWord error
  ["catch"](function (err) {
    // Catch no session error
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_2__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
        state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
        appEl: appEl
      });
      return;
    }
    // Catch unpected error
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=app.js.map