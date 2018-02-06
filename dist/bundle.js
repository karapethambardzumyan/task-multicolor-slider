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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var KSlider = function () {
  var KSlider = function KSlider() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        target = _ref.target;

    if (target === undefined || target === null) return;

    var min = parseInt(target.getAttribute("min") || 0),
        max = parseInt(target.getAttribute("max") || 100),
        className = target.getAttribute("id"),
        parentElem = target.parentNode,
        newElem = document.createElement("div"),
        newElemThumb = document.createElement("div"),
        newElemRange = document.createElement("div"),
        newElemTooltip = document.createElement("div");
    newElem.className = "KSlider KSlider-" + className;
    newElem.setAttribute("id", className);
    newElemRange.className = "KSlider-range";
    newElemThumb.className = "KSlider-thumb";
    newElemTooltip.className = "KSlider-tooltip";
    newElem.appendChild(newElemThumb);
    newElem.appendChild(newElemRange);
    newElem.appendChild(newElemTooltip);

    parentElem.removeChild(target);
    target = null;
    parentElem.appendChild(newElem);

    this.target = newElem;
    this.min = min;
    this.max = max;

    this.changeHandler();
  };

  KSlider.prototype = function () {
    function getCoords(elem) {
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }

    function changeHandler() {
      var _this = this;

      this.target.querySelector(".KSlider-thumb").onmousedown = function (e) {
        var thumbCoords = getCoords(_this.target.querySelector(".KSlider-thumb"));
        var shiftX = e.pageX - thumbCoords.left;
        var sliderCoords = getCoords(_this.target);

        var thumbCoordsTooltip = getCoords(_this.target.querySelector(".KSlider-tooltip"));
        var shiftXTooltip = e.pageX - thumbCoords.left;
        var sliderCoordsTooltip = getCoords(_this.target);

        document.onmousemove = function (e) {
          var newLeft = e.pageX - shiftX - sliderCoords.left,
              rightEdge = _this.target.offsetWidth - _this.target.querySelector(".KSlider-thumb").offsetWidth,
              newLeftTooltip = e.pageX - shiftXTooltip - sliderCoordsTooltip.left,
              range = _this.min + Math.floor((newLeft + shiftXTooltip) / (_this.target.offsetWidth / (_this.max - _this.min)));

          if (newLeft < 0) {
            newLeft = newLeftTooltip = 0;
            range = _this.min;
          }
          if (newLeft > rightEdge) {
            newLeft = newLeftTooltip = rightEdge;
            range = _this.max;
          }

          _this.target.querySelector(".KSlider-tooltip").innerHTML = range;
          _this.target.querySelector(".KSlider-tooltip").style.opacity = 1;
          _this.target.querySelector(".KSlider-tooltip").style.visibility = "visible";

          _this.target.querySelector(".KSlider-range").style.width = newLeft + 7 + "px";
          _this.target.querySelector(".KSlider-tooltip").style.left = newLeftTooltip - 23 + "px";
          _this.target.querySelector(".KSlider-thumb").style.left = newLeft + "px";
        };

        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
          _this.target.querySelector(".KSlider-tooltip").style.opacity = 0;
          _this.target.querySelector(".KSlider-tooltip").style.visibility = "hidden";
        };

        return false;
      };

      this.target.ondragstart = function () {
        return false;
      };
    }

    return {
      changeHandler: changeHandler
    };
  }();

  return KSlider;
}();

var slider1 = new KSlider({
  target: document.getElementById("slider-1")
});
var slider1 = new KSlider({
  target: document.getElementById("slider-2")
});
var slider1 = new KSlider({
  target: document.getElementById("slider-3")
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);