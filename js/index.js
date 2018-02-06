var KSlider = (function () {
  var KSlider = function ({target} = {}) {
    if(target === undefined || target === null) return;

    var min = parseInt(target.getAttribute("min") || 0),
        max = parseInt(target.getAttribute("max") || 100),
        className = target.getAttribute("id"),
        parentElem = target.parentNode,
        newElem = document.createElement("div"),
        newElemThumb = document.createElement("div"),
        newElemRange = document.createElement("div"),
        newElemTooltip = document.createElement("div");
        newElem.className = `KSlider KSlider-${className}`;
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
  }

  KSlider.prototype = (function() {
    function getCoords(elem) {
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };

    }

    function changeHandler() {
      this.target.querySelector(".KSlider-thumb").onmousedown = (e) => {
        var thumbCoords = getCoords(this.target.querySelector(".KSlider-thumb"));
        var shiftX = e.pageX - thumbCoords.left;
        var sliderCoords = getCoords(this.target);

        var thumbCoordsTooltip = getCoords(this.target.querySelector(".KSlider-tooltip"));
        var shiftXTooltip = e.pageX - thumbCoords.left;
        var sliderCoordsTooltip = getCoords(this.target);

        document.onmousemove = (e) => {
          var newLeft = e.pageX - shiftX - sliderCoords.left,
              rightEdge = this.target.offsetWidth - this.target.querySelector(".KSlider-thumb").offsetWidth,
              newLeftTooltip = e.pageX - shiftXTooltip - sliderCoordsTooltip.left,
              range = this.min + Math.floor(((newLeft + shiftXTooltip) / (this.target.offsetWidth / (this.max - this.min))));

          if(newLeft < 0) {
            newLeft = newLeftTooltip = 0;
            range = this.min;
          }
          if(newLeft > rightEdge) {
            newLeft = newLeftTooltip = rightEdge;
            range = this.max;
          }

          this.target.querySelector(".KSlider-tooltip").innerHTML = range;
          this.target.querySelector(".KSlider-tooltip").style.opacity = 1;
          this.target.querySelector(".KSlider-tooltip").style.visibility = "visible";

          this.target.querySelector(".KSlider-range").style.width = (newLeft + 7) + "px";
          this.target.querySelector(".KSlider-tooltip").style.left = (newLeftTooltip - 23) + "px";
          this.target.querySelector(".KSlider-thumb").style.left = newLeft + "px";
        }

        document.onmouseup = () => {
          document.onmousemove = document.onmouseup = null;
          this.target.querySelector(".KSlider-tooltip").style.opacity = 0;
          this.target.querySelector(".KSlider-tooltip").style.visibility = "hidden";
        }

        return false;
      }

      this.target.ondragstart = function() {
        return false;
      }
    }

    return {
      changeHandler
    };
  }());

  return KSlider;
}());

var slider1 = new KSlider({
  target: document.getElementById("slider-1")
});
var slider2 = new KSlider({
  target: document.getElementById("slider-2")
});
var slider3 = new KSlider({
  target: document.getElementById("slider-3")
});
