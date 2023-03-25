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
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = (_MESSAGES = {}, _defineProperty(_MESSAGES, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), _defineProperty(_MESSAGES, SERVER.AUTH_INSUFFICIENT, 'Your username/password combination does not match any records, please try again.'), _defineProperty(_MESSAGES, SERVER.REQUIRED_USERNAME, 'Please enter a valid (letters and/or numbers) username'), _defineProperty(_MESSAGES, SERVER.REQUIRED_MESSAGE, 'Please enter message to send'), _defineProperty(_MESSAGES, "default", 'Something went wrong.  Please try again'), _MESSAGES);

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLoginListener": () => (/* binding */ addLoginListener),
/* harmony export */   "addLogoutListener": () => (/* binding */ addLogoutListener),
/* harmony export */   "addPostMessageListener": () => (/* binding */ addPostMessageListener)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");



function addLoginListener(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl,
    chatEl = _ref.chatEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("login-form")) {
      return;
    }
    var username = appEl.querySelector(".login-username").value;
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.waitOnChat)();
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderApp)({
      state: state,
      appEl: appEl
    });
    // Service call to login
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (users) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.login)(username);
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setLoginUsers)(users);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderApp)({
        state: state,
        appEl: appEl
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderChat)({
        state: state,
        chatEl: chatEl
      });
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)();
    })["catch"](function (err) {
      return Promise.reject(err);
    })
    // Fetch all messages
    .then(function (messages) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setMessages)(messages);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderChat)({
        state: state,
        chatEl: chatEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderApp)({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addLogoutListener(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl,
    chatEl = _ref2.chatEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("logout-form")) {
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderApp)({
      state: state,
      appEl: appEl
    });
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderChat)({
      state: state,
      chatEl: chatEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderApp)({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addPostMessageListener(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl,
    chatEl = _ref3.chatEl;
  appEl.addEventListener("submit", function (e) {
    if (!e.target.classList.contains("chat-form")) {
      return;
    }
    var message = appEl.querySelector(".message").value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchPostMessage)(message).then(function (messages) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setMessages)(messages);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderApp)({
        state: state,
        appEl: appEl
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderChat)({
        state: state,
        chatEl: chatEl
      });
    })["catch"](function (err) {
      console.log(err);
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR"); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderApp)({
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
/* harmony export */   "renderApp": () => (/* binding */ renderApp),
/* harmony export */   "renderChat": () => (/* binding */ renderChat)
/* harmony export */ });
function renderApp(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n    ".concat(getErrorHtml(state), "\n    <div class=\"login-info\">\n    ").concat(getLoginHtml(state), "\n    ").concat(getLogoutHtml(state), "\n    </div>\n    ").concat(getOutgoingHtml(state), "\n    ").concat(getLoadingHtml(state), "\n    ");
  appEl.innerHTML = html;
}
function renderChat(_ref2) {
  var state = _ref2.state,
    chatEl = _ref2.chatEl;
  var html = "\n    ".concat(getUserList(state), "\n    ").concat(getMessageList(state), "\n    ");
  chatEl.innerHTML = html;
}
function getErrorHtml(state) {
  if (!state.error) {
    return "";
  }
  return "\n      <div class=\"error\">".concat(state.error, "</div>\n  ");
}
function getLoadingHtml(state) {
  if (state.isChatPending) {
    return "\n    <div class=\"waiting\">Loading Chat...</div>\n  ";
  }
  return "";
}
function getLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n      <div class=\"waiting\">Loading user...</div>\n    ";
  }
  if (state.isLoggedIn) {
    return "<div class=\"login-user\">".concat(state.username, "</div>");
  }
  return "\n    <div class=\"login\">\n        <form class=\"login-form\" action=\"#/login\">\n            <label class=\"form-label\">\n                <span>Username:</span>\n                <input class=\"login-username\" name=\"username\"/>\n            </label>\n            <button type=\"submit\" class=\"form-btn\">Submit</button>\n        </form>\n    </div>\n    ";
}
function getLogoutHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"logout\">\n        <form class=\"logout-form\" action=\"#/logout\">\n            <button type=\"submit\" class=\"logout-btn\">Logout</button>\n        </form>\n    </div>\n    ";
}
function getOutgoingHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"outgoing\">\n        <form class=\"chat-form\" action=\"/chat\" method=\"POST\">\n            <input class=\"message\" name=\"message\" value=\"\" placeholder=\"Enter message to send\"/>\n            <button type=\"submit\">Send</button>\n        </form>\n    </div>\n    ";
}
function getMessageList(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  if (state.isLoginPending) {
    return "\n    <div class=\"waiting\">Loading Messages...</div>\n  ";
  }
  var messages = state.messages;
  if (!messages) {
    return "";
  }
  return "<ol class=\"messages\">\n    <h1>Messages</h2>\n    " + messages.map(function (message) {
    return "\n        <li>\n          <div class=\"message\">\n            <div class=\"sender-info\">\n                <img class=\"avatar\" alt=\"avatar of ".concat(message.sender, "\" src=\"http://placekitten.com/150/150\"/>\n                <span class=\"username\">").concat(message.sender, "</span>\n            </div>\n            <p class=\"message-text\">").concat(message.text, "</p>\n          </div>\n        </li>\n      ");
  }).join("") + "</ol>";
}
function getUserList(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <ul class=\"users\">\n    <h1>Current Login Users</h2>\n    " + Object.values(state.users).map(function (user) {
    return "\n            <li>\n                <div class=\"user\">\n                  <img class=\"avatar\" alt=\"avatar of ".concat(user, "\" src=\"http://placekitten.com/150/150\"/>\n                  <span class=\"username\">").concat(user, "</span>\n                </div>\n            </li>\n            ");
  }).join("") + "</ul>";
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLoginUsers": () => (/* binding */ fetchLoginUsers),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchMessages": () => (/* binding */ fetchMessages),
/* harmony export */   "fetchPostMessage": () => (/* binding */ fetchPostMessage),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession)
/* harmony export */ });
function fetchLogin(username) {
  return fetch("/api/v1/session", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: "network-error"
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
function fetchLogout() {
  return fetch("/api/v1/session", {
    method: "DELETE"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
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
function fetchSession() {
  return fetch("/api/v1/session", {
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
function fetchLoginUsers() {
  return fetch("/api/v1/users", {
    method: "GET"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
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
      return [Promise.reject(err)];
    });
  });
}
function fetchMessages() {
  return fetch("/api/v1/messages", {
    method: "GET"
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
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
      return [Promise.reject(err)];
    });
  });
}
function fetchPostMessage(message) {
  return fetch("/api/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      message: message
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: "network-error"
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
/* harmony export */   "setLoginUsers": () => (/* binding */ setLoginUsers),
/* harmony export */   "setMessages": () => (/* binding */ setMessages),
/* harmony export */   "waitOnChat": () => (/* binding */ waitOnChat),
/* harmony export */   "waitOnLogin": () => (/* binding */ waitOnLogin)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  isLoggedIn: false,
  isLoginPending: false,
  isChatPending: false,
  username: "",
  error: "",
  users: {
    // "Amit": "Amit",
    // "Bob": "Bob",
  },
  messages: [
    // { sender: "Amit", text: "You up?" },
    // { sender: "Bao", text: "Good" },
  ]
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.users = {};
  state.messages = [];
  state.error = '';
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = "";
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = "";
  state.error = "";
}
function waitOnChat() {
  state.users = {};
  state.messages = [];
  state.isChatPending = true;
  state.error = '';
}
function setLoginUsers(data) {
  state.isChatPending = false;
  state.users = data;
  state.error = "";
}
function setMessages(data) {
  state.isChatPending = false;
  state.messages = data;
  state.error = "";
}
function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
  state.isLoginPending = false;
  state.isChatPending = false;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "../samples/services-todo/src/render.js":
/*!**********************************************!*\
  !*** ../samples/services-todo/src/render.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Here we rebuild ALL the HTML whenever the state changes
// That is not the most efficient way to do it
// We COULD make these functions smarter about noticing what state changed
// and what HTML is dependent on that state
// and only replace the HTML that needs to be replaced
// but we'll be moving to React soon where someone has already written that
// The key part here is to see how the HTML is based on state
// - at this stage, the "action" is not visible, only the state
// - so our render is decoupled from the actions and events

function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n   <main class=\"\">\n     ".concat(generateStatusHtml(state), "\n     ").concat(generateLoginHtml(state), "\n     ").concat(generateContentHtml(state), "\n   </main>\n  ");
  appEl.innerHTML = html;
}
function generateStatusHtml(state) {
  return "\n      <div class=\"status\">".concat(state.error, "</div>\n  ");
}
function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n      <div class=\"login__waiting\">Loading user...</div>\n    ";
  }
  if (state.isLoggedIn) {
    return "";
  }

  // The #/login below isn't "real" - the form should never navigate
  // I included it merely as a hint to what the form does
  return "\n      <div class=\"login\">\n        <form class=\"login__form\" action=\"#/login\">\n          <label>\n            <span>Username:</span>\n            <input class=\"login__username\" value=\"\">\n          </label>\n          <button class=\"login__button\" type=\"submit\">Login</button>\n        </form>\n      </div>\n  ";
}
function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  if (state.isTodoPending) {
    return "\n      <div class=\"content\">\n        ".concat(generateControlsHtml(state), "\n        <div class=\"todos__waiting\">Loading Todos...</div>\n      </div>\n    ");
  }
  return "\n      <div class=\"content\">\n        ".concat(generateControlsHtml(state), "\n        <ul class=\"todos\">").concat(generateTodosHtml(state), "</ul>\n        ").concat(generateAddTodoHtml(state), "\n      </div>\n  ");
}
function generateControlsHtml(state) {
  return "\n        <div class=\"controls\">\n          <button class=\"controls__refresh\">Refresh</button>\n          <button class=\"controls__logout\">Logout</button>\n        </div>\n  ";
}
function generateTodosHtml(state) {
  var todosHtml = Object.values(state.todos).map(function (todo) {
    var isDoneClass = todo.done ? "todo__text--complete" : "";
    var isAddedClass = state.lastAddedTodoId === todo.id ? "todo__text--added" : "";
    return "\n      <li class=\"todo\">\n        <label\n        >\n          <input\n            class=\"todo__toggle\"\n            data-id=\"".concat(todo.id, "\"\n            type=\"checkbox\"\n            ").concat(todo.done ? "checked" : "", "\n          >\n          <span\n            data-id=\"").concat(todo.id, "\"\n            class=\"todo__toggle todo__text ").concat(isDoneClass, " ").concat(isAddedClass, " \"\n          >\n            ").concat(todo.task, "\n          </span>\n        </label>\n        <button\n          data-id=\"").concat(todo.id, "\"\n          class=\"todo__delete\"\n        >\n          &#10060;\n        </button>\n      </li>\n      ");
  }).join('') || "<p>No Todo Items yet, add one!</p>";
  return todosHtml;
}
function generateAddTodoHtml(state) {
  return "\n        <form class=\"add__form\" action=\"#/add\">\n          <input class=\"add__task\">\n          <button type=\"submit\" class=\"add__button\">Add</button>\n        </form>\n  ";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

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
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _samples_services_todo_src_render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../samples/services-todo/src/render */ "../samples/services-todo/src/render.js");






var appEl = document.querySelector("#app");
var chatEl = document.querySelector("#chat");
(0,_render__WEBPACK_IMPORTED_MODULE_0__.renderApp)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_render__WEBPACK_IMPORTED_MODULE_0__.renderChat)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  chatEl: chatEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_2__.addLoginListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl,
  chatEl: chatEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_2__.addLogoutListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl,
  chatEl: chatEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_2__.addPostMessageListener)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl,
  chatEl: chatEl
});
checkForSession();
pollData();

// Polling
function pollData() {
  refreshData();
  setTimeout(pollData, 5000);
}
function refreshData() {
  if (!_state__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn) {
    return;
  }
  (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchLoginUsers)().then(function (users) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setLoginUsers)(users);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderChat)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      chatEl: chatEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchMessages)();
  })["catch"](function (err) {
    return Promise.reject(err);
  }).then(function (messages) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderChat)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      chatEl: chatEl
    });
  })["catch"](function (err) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderApp)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  });
}
function checkForSession() {
  (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnLogin)();
  (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderApp)({
    state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
    appEl: appEl
  });
  // Fetch current user
  (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchSession)().then(function (session) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderApp)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchLoginUsers)();
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_3__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_3__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  })
  // Fetch login users
  .then(function (users) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setLoginUsers)(users);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderChat)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      chatEl: chatEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchMessages)();
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_3__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderApp)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderApp)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  })
  // Fetch all messages
  .then(function (messages) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderChat)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      chatEl: chatEl
    });
  })["catch"](function (err) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
    (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderApp)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map