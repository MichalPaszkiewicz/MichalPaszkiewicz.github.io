/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/maths.ts":
/*!**********************!*\
  !*** ./src/maths.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.degreesToRadians = exports.solveQuadratic = void 0;
const solveQuadratic = (a, b, c) => {
    let plus = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    let minus = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    return [plus, minus];
};
exports.solveQuadratic = solveQuadratic;
const degreesToRadians = (degrees) => {
    // Store the value of pi.
    var pi = Math.PI;
    // Multiply degrees by pi divided by 180 to convert to radians.
    return degrees * (pi / 180);
};
exports.degreesToRadians = degreesToRadians;


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const maths_1 = __webpack_require__(/*! ./maths */ "./src/maths.ts");
let canvas = document.getElementById('page');
let ctx = canvas.getContext('2d');
let scale = 200;
let timeScale = 0.2;
let venusOrbitLength = 225;
let lunarOrbitLength = 29.5;
let venusOrbit = 0.72;
let drawMoon = (angleMoon, angleSun, ctx, centre) => {
    let sunCoordDiff = { x: Math.cos(angleSun) * scale, y: Math.sin(angleSun) * scale };
    let sunCoords = { x: centre.x + sunCoordDiff.x, y: centre.y + sunCoordDiff.y };
    let moonCoordDiff = { x: Math.cos(angleMoon) * scale, y: Math.sin(angleMoon) * scale };
    let moonCoords = { x: centre.x + moonCoordDiff.x, y: centre.y + moonCoordDiff.y };
    // draw moon
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(moonCoords.x, moonCoords.y, scale / 9, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "Linen";
    ctx.fill();
    ctx.stroke();
    ctx.lineWidth = 5;
    let vecTowardsSun = { x: sunCoords.x - moonCoords.x, y: sunCoords.y - moonCoords.y };
    let angleTowardsSun = Math.atan2(vecTowardsSun.y, vecTowardsSun.x);
    // draw dark side
    // for new moon
    if (Math.abs(angleMoon - angleSun) < Math.PI / 8) {
        ctx.beginPath();
        ctx.arc(moonCoords.x, moonCoords.y, scale / 9, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = "DimGray";
        ctx.fill();
    }
    // angled
    else if (Math.abs((angleTowardsSun + 2 * Math.PI) % (2 * Math.PI) - (angleSun + 2 * Math.PI) % (2 * Math.PI)) > Math.PI / 8) {
        ctx.beginPath();
        ctx.arc(moonCoords.x, moonCoords.y, scale / 9, angleTowardsSun + Math.PI / 2, angleTowardsSun - Math.PI / 2);
        ctx.closePath();
        ctx.fillStyle = "DimGray";
        ctx.fill();
    }
};
let drawSun = (angleSun, ctx, centre) => {
    let inverseAngle = angleSun + Math.PI;
    let coordDiff = { x: Math.cos(inverseAngle) * scale, y: Math.sin(inverseAngle) * scale };
    let startCoords = { x: centre.x + coordDiff.x, y: centre.y + coordDiff.y };
    ctx.beginPath();
    ctx.moveTo(startCoords.x, startCoords.y);
    let coordDiff2 = { x: Math.cos(angleSun) * scale, y: Math.sin(angleSun) * scale };
    let endCoords = { x: centre.x + coordDiff2.x, y: centre.y + coordDiff2.y };
    ctx.lineTo(endCoords.x, endCoords.y);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(startCoords.x, startCoords.y, scale / 20, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(endCoords.x, endCoords.y, scale / 8, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.stroke();
};
let drawVenus = (angleSun, angleVenus, ctx, centre) => {
    let venusScale = scale * +document.getElementById("myRange").value / 50;
    let backDist = (1 - venusOrbit) * venusScale;
    let forwardDist = (venusOrbit + 1) * venusScale;
    let inverseAngle = angleVenus + Math.PI;
    let coordDiff = { x: Math.cos(inverseAngle) * backDist, y: Math.sin(inverseAngle) * backDist };
    let startCoords = { x: centre.x + coordDiff.x, y: centre.y + coordDiff.y };
    let coordDiff2 = { x: Math.cos(angleVenus) * forwardDist, y: Math.sin(angleVenus) * forwardDist };
    let endCoords = { x: centre.x + coordDiff2.x, y: centre.y + coordDiff2.y };
    let coordDiffC = { x: Math.cos(angleVenus) * venusOrbit * venusScale, y: Math.sin(angleVenus) * venusOrbit * venusScale };
    let cCoords = { x: centre.x + coordDiffC.x, y: centre.y + coordDiffC.y };
    // inner ring
    ctx.beginPath();
    ctx.arc(cCoords.x, cCoords.y, venusScale / 40, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    // main outer ring
    ctx.beginPath();
    ctx.arc(cCoords.x, cCoords.y, venusScale, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    // main bar
    ctx.beginPath();
    ctx.moveTo(startCoords.x, startCoords.y);
    ctx.lineTo(endCoords.x, endCoords.y);
    ctx.closePath();
    ctx.stroke();
    let sunCoordDiff = { x: Math.cos(angleSun) * venusScale, y: Math.sin(angleSun) * venusScale };
    let sunCoords = { x: cCoords.x + sunCoordDiff.x, y: cCoords.y + sunCoordDiff.y };
    // deferent
    ctx.beginPath();
    ctx.moveTo(cCoords.x, cCoords.y);
    ctx.lineTo(sunCoords.x, sunCoords.y);
    ctx.closePath();
    ctx.stroke();
    // venus
    ctx.beginPath();
    ctx.arc(sunCoords.x, sunCoords.y, venusScale / 20, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "AntiqueWhite";
    ctx.fill();
    ctx.stroke();
};
let t = 0;
let animate = () => {
    t -= timeScale;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let centre = { x: canvas.width / 2, y: canvas.height / 2 };
    // outline
    ctx.lineWidth = 1;
    ctx.strokeStyle = "lightgray";
    for (var i = 0; i < 24; i++) {
        ctx.beginPath();
        ctx.moveTo(centre.x, centre.y);
        ctx.lineTo(centre.x + Math.cos((0, maths_1.degreesToRadians)(i * 15)) * scale, centre.y + Math.sin((0, maths_1.degreesToRadians)(i * 15)) * scale);
        ctx.closePath();
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(centre.x, centre.y, scale, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    drawMoon((0, maths_1.degreesToRadians)(360 * (t % lunarOrbitLength) / lunarOrbitLength), (0, maths_1.degreesToRadians)((t % 360)), ctx, centre);
    drawSun((0, maths_1.degreesToRadians)((t % 360)), ctx, centre);
    drawVenus((0, maths_1.degreesToRadians)((t % 360)), (0, maths_1.degreesToRadians)(360 * (t % venusOrbitLength) / venusOrbitLength), ctx, centre);
    // earth
    ctx.beginPath();
    ctx.arc(centre.x, centre.y, scale / 20, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
    window.requestAnimationFrame(animate);
};
let set = () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
};
set();
animate();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsd0JBQXdCLEdBQUcsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCOzs7Ozs7O1VDZnhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0JBQWdCLG1CQUFPLENBQUMsK0JBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixzQkFBc0I7QUFDdEIsMEJBQTBCO0FBQzFCLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsd0JBQXdCO0FBQ3hCLHVCQUF1QjtBQUN2QixzQkFBc0I7QUFDdEIsdUJBQXVCO0FBQ3ZCLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21vZGVsZXIvLi9zcmMvbWF0aHMudHMiLCJ3ZWJwYWNrOi8vbW9kZWxlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tb2RlbGVyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWdyZWVzVG9SYWRpYW5zID0gZXhwb3J0cy5zb2x2ZVF1YWRyYXRpYyA9IHZvaWQgMDtcbmNvbnN0IHNvbHZlUXVhZHJhdGljID0gKGEsIGIsIGMpID0+IHtcbiAgICBsZXQgcGx1cyA9ICgtYiArIE1hdGguc3FydChNYXRoLnBvdyhiLCAyKSAtIDQgKiBhICogYykpIC8gKDIgKiBhKTtcbiAgICBsZXQgbWludXMgPSAoLWIgLSBNYXRoLnNxcnQoTWF0aC5wb3coYiwgMikgLSA0ICogYSAqIGMpKSAvICgyICogYSk7XG4gICAgcmV0dXJuIFtwbHVzLCBtaW51c107XG59O1xuZXhwb3J0cy5zb2x2ZVF1YWRyYXRpYyA9IHNvbHZlUXVhZHJhdGljO1xuY29uc3QgZGVncmVlc1RvUmFkaWFucyA9IChkZWdyZWVzKSA9PiB7XG4gICAgLy8gU3RvcmUgdGhlIHZhbHVlIG9mIHBpLlxuICAgIHZhciBwaSA9IE1hdGguUEk7XG4gICAgLy8gTXVsdGlwbHkgZGVncmVlcyBieSBwaSBkaXZpZGVkIGJ5IDE4MCB0byBjb252ZXJ0IHRvIHJhZGlhbnMuXG4gICAgcmV0dXJuIGRlZ3JlZXMgKiAocGkgLyAxODApO1xufTtcbmV4cG9ydHMuZGVncmVlc1RvUmFkaWFucyA9IGRlZ3JlZXNUb1JhZGlhbnM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtYXRoc18xID0gcmVxdWlyZShcIi4vbWF0aHNcIik7XG5sZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2UnKTtcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmxldCBzY2FsZSA9IDIwMDtcbmxldCB0aW1lU2NhbGUgPSAwLjI7XG5sZXQgdmVudXNPcmJpdExlbmd0aCA9IDIyNTtcbmxldCBsdW5hck9yYml0TGVuZ3RoID0gMjkuNTtcbmxldCB2ZW51c09yYml0ID0gMC43MjtcbmxldCBkcmF3TW9vbiA9IChhbmdsZU1vb24sIGFuZ2xlU3VuLCBjdHgsIGNlbnRyZSkgPT4ge1xuICAgIGxldCBzdW5Db29yZERpZmYgPSB7IHg6IE1hdGguY29zKGFuZ2xlU3VuKSAqIHNjYWxlLCB5OiBNYXRoLnNpbihhbmdsZVN1bikgKiBzY2FsZSB9O1xuICAgIGxldCBzdW5Db29yZHMgPSB7IHg6IGNlbnRyZS54ICsgc3VuQ29vcmREaWZmLngsIHk6IGNlbnRyZS55ICsgc3VuQ29vcmREaWZmLnkgfTtcbiAgICBsZXQgbW9vbkNvb3JkRGlmZiA9IHsgeDogTWF0aC5jb3MoYW5nbGVNb29uKSAqIHNjYWxlLCB5OiBNYXRoLnNpbihhbmdsZU1vb24pICogc2NhbGUgfTtcbiAgICBsZXQgbW9vbkNvb3JkcyA9IHsgeDogY2VudHJlLnggKyBtb29uQ29vcmREaWZmLngsIHk6IGNlbnRyZS55ICsgbW9vbkNvb3JkRGlmZi55IH07XG4gICAgLy8gZHJhdyBtb29uXG4gICAgY3R4LmxpbmVXaWR0aCA9IDM7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMobW9vbkNvb3Jkcy54LCBtb29uQ29vcmRzLnksIHNjYWxlIC8gOSwgMCwgMiAqIE1hdGguUEkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJMaW5lblwiO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5saW5lV2lkdGggPSA1O1xuICAgIGxldCB2ZWNUb3dhcmRzU3VuID0geyB4OiBzdW5Db29yZHMueCAtIG1vb25Db29yZHMueCwgeTogc3VuQ29vcmRzLnkgLSBtb29uQ29vcmRzLnkgfTtcbiAgICBsZXQgYW5nbGVUb3dhcmRzU3VuID0gTWF0aC5hdGFuMih2ZWNUb3dhcmRzU3VuLnksIHZlY1Rvd2FyZHNTdW4ueCk7XG4gICAgLy8gZHJhdyBkYXJrIHNpZGVcbiAgICAvLyBmb3IgbmV3IG1vb25cbiAgICBpZiAoTWF0aC5hYnMoYW5nbGVNb29uIC0gYW5nbGVTdW4pIDwgTWF0aC5QSSAvIDgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKG1vb25Db29yZHMueCwgbW9vbkNvb3Jkcy55LCBzY2FsZSAvIDksIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJEaW1HcmF5XCI7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuICAgIC8vIGFuZ2xlZFxuICAgIGVsc2UgaWYgKE1hdGguYWJzKChhbmdsZVRvd2FyZHNTdW4gKyAyICogTWF0aC5QSSkgJSAoMiAqIE1hdGguUEkpIC0gKGFuZ2xlU3VuICsgMiAqIE1hdGguUEkpICUgKDIgKiBNYXRoLlBJKSkgPiBNYXRoLlBJIC8gOCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMobW9vbkNvb3Jkcy54LCBtb29uQ29vcmRzLnksIHNjYWxlIC8gOSwgYW5nbGVUb3dhcmRzU3VuICsgTWF0aC5QSSAvIDIsIGFuZ2xlVG93YXJkc1N1biAtIE1hdGguUEkgLyAyKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJEaW1HcmF5XCI7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxufTtcbmxldCBkcmF3U3VuID0gKGFuZ2xlU3VuLCBjdHgsIGNlbnRyZSkgPT4ge1xuICAgIGxldCBpbnZlcnNlQW5nbGUgPSBhbmdsZVN1biArIE1hdGguUEk7XG4gICAgbGV0IGNvb3JkRGlmZiA9IHsgeDogTWF0aC5jb3MoaW52ZXJzZUFuZ2xlKSAqIHNjYWxlLCB5OiBNYXRoLnNpbihpbnZlcnNlQW5nbGUpICogc2NhbGUgfTtcbiAgICBsZXQgc3RhcnRDb29yZHMgPSB7IHg6IGNlbnRyZS54ICsgY29vcmREaWZmLngsIHk6IGNlbnRyZS55ICsgY29vcmREaWZmLnkgfTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyhzdGFydENvb3Jkcy54LCBzdGFydENvb3Jkcy55KTtcbiAgICBsZXQgY29vcmREaWZmMiA9IHsgeDogTWF0aC5jb3MoYW5nbGVTdW4pICogc2NhbGUsIHk6IE1hdGguc2luKGFuZ2xlU3VuKSAqIHNjYWxlIH07XG4gICAgbGV0IGVuZENvb3JkcyA9IHsgeDogY2VudHJlLnggKyBjb29yZERpZmYyLngsIHk6IGNlbnRyZS55ICsgY29vcmREaWZmMi55IH07XG4gICAgY3R4LmxpbmVUbyhlbmRDb29yZHMueCwgZW5kQ29vcmRzLnkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoc3RhcnRDb29yZHMueCwgc3RhcnRDb29yZHMueSwgc2NhbGUgLyAyMCwgMCwgMiAqIE1hdGguUEkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKGVuZENvb3Jkcy54LCBlbmRDb29yZHMueSwgc2NhbGUgLyA4LCAwLCAyICogTWF0aC5QSSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcInllbGxvd1wiO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xufTtcbmxldCBkcmF3VmVudXMgPSAoYW5nbGVTdW4sIGFuZ2xlVmVudXMsIGN0eCwgY2VudHJlKSA9PiB7XG4gICAgbGV0IHZlbnVzU2NhbGUgPSBzY2FsZSAqICtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15UmFuZ2VcIikudmFsdWUgLyA1MDtcbiAgICBsZXQgYmFja0Rpc3QgPSAoMSAtIHZlbnVzT3JiaXQpICogdmVudXNTY2FsZTtcbiAgICBsZXQgZm9yd2FyZERpc3QgPSAodmVudXNPcmJpdCArIDEpICogdmVudXNTY2FsZTtcbiAgICBsZXQgaW52ZXJzZUFuZ2xlID0gYW5nbGVWZW51cyArIE1hdGguUEk7XG4gICAgbGV0IGNvb3JkRGlmZiA9IHsgeDogTWF0aC5jb3MoaW52ZXJzZUFuZ2xlKSAqIGJhY2tEaXN0LCB5OiBNYXRoLnNpbihpbnZlcnNlQW5nbGUpICogYmFja0Rpc3QgfTtcbiAgICBsZXQgc3RhcnRDb29yZHMgPSB7IHg6IGNlbnRyZS54ICsgY29vcmREaWZmLngsIHk6IGNlbnRyZS55ICsgY29vcmREaWZmLnkgfTtcbiAgICBsZXQgY29vcmREaWZmMiA9IHsgeDogTWF0aC5jb3MoYW5nbGVWZW51cykgKiBmb3J3YXJkRGlzdCwgeTogTWF0aC5zaW4oYW5nbGVWZW51cykgKiBmb3J3YXJkRGlzdCB9O1xuICAgIGxldCBlbmRDb29yZHMgPSB7IHg6IGNlbnRyZS54ICsgY29vcmREaWZmMi54LCB5OiBjZW50cmUueSArIGNvb3JkRGlmZjIueSB9O1xuICAgIGxldCBjb29yZERpZmZDID0geyB4OiBNYXRoLmNvcyhhbmdsZVZlbnVzKSAqIHZlbnVzT3JiaXQgKiB2ZW51c1NjYWxlLCB5OiBNYXRoLnNpbihhbmdsZVZlbnVzKSAqIHZlbnVzT3JiaXQgKiB2ZW51c1NjYWxlIH07XG4gICAgbGV0IGNDb29yZHMgPSB7IHg6IGNlbnRyZS54ICsgY29vcmREaWZmQy54LCB5OiBjZW50cmUueSArIGNvb3JkRGlmZkMueSB9O1xuICAgIC8vIGlubmVyIHJpbmdcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhjQ29vcmRzLngsIGNDb29yZHMueSwgdmVudXNTY2FsZSAvIDQwLCAwLCAyICogTWF0aC5QSSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICAvLyBtYWluIG91dGVyIHJpbmdcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhjQ29vcmRzLngsIGNDb29yZHMueSwgdmVudXNTY2FsZSwgMCwgMiAqIE1hdGguUEkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgLy8gbWFpbiBiYXJcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyhzdGFydENvb3Jkcy54LCBzdGFydENvb3Jkcy55KTtcbiAgICBjdHgubGluZVRvKGVuZENvb3Jkcy54LCBlbmRDb29yZHMueSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBsZXQgc3VuQ29vcmREaWZmID0geyB4OiBNYXRoLmNvcyhhbmdsZVN1bikgKiB2ZW51c1NjYWxlLCB5OiBNYXRoLnNpbihhbmdsZVN1bikgKiB2ZW51c1NjYWxlIH07XG4gICAgbGV0IHN1bkNvb3JkcyA9IHsgeDogY0Nvb3Jkcy54ICsgc3VuQ29vcmREaWZmLngsIHk6IGNDb29yZHMueSArIHN1bkNvb3JkRGlmZi55IH07XG4gICAgLy8gZGVmZXJlbnRcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyhjQ29vcmRzLngsIGNDb29yZHMueSk7XG4gICAgY3R4LmxpbmVUbyhzdW5Db29yZHMueCwgc3VuQ29vcmRzLnkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgLy8gdmVudXNcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhzdW5Db29yZHMueCwgc3VuQ29vcmRzLnksIHZlbnVzU2NhbGUgLyAyMCwgMCwgMiAqIE1hdGguUEkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJBbnRpcXVlV2hpdGVcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbn07XG5sZXQgdCA9IDA7XG5sZXQgYW5pbWF0ZSA9ICgpID0+IHtcbiAgICB0IC09IHRpbWVTY2FsZTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcbiAgICBsZXQgY2VudHJlID0geyB4OiBjYW52YXMud2lkdGggLyAyLCB5OiBjYW52YXMuaGVpZ2h0IC8gMiB9O1xuICAgIC8vIG91dGxpbmVcbiAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImxpZ2h0Z3JheVwiO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oY2VudHJlLngsIGNlbnRyZS55KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjZW50cmUueCArIE1hdGguY29zKCgwLCBtYXRoc18xLmRlZ3JlZXNUb1JhZGlhbnMpKGkgKiAxNSkpICogc2NhbGUsIGNlbnRyZS55ICsgTWF0aC5zaW4oKDAsIG1hdGhzXzEuZGVncmVlc1RvUmFkaWFucykoaSAqIDE1KSkgKiBzY2FsZSk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhjZW50cmUueCwgY2VudHJlLnksIHNjYWxlLCAwLCAyICogTWF0aC5QSSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDU7XG4gICAgZHJhd01vb24oKDAsIG1hdGhzXzEuZGVncmVlc1RvUmFkaWFucykoMzYwICogKHQgJSBsdW5hck9yYml0TGVuZ3RoKSAvIGx1bmFyT3JiaXRMZW5ndGgpLCAoMCwgbWF0aHNfMS5kZWdyZWVzVG9SYWRpYW5zKSgodCAlIDM2MCkpLCBjdHgsIGNlbnRyZSk7XG4gICAgZHJhd1N1bigoMCwgbWF0aHNfMS5kZWdyZWVzVG9SYWRpYW5zKSgodCAlIDM2MCkpLCBjdHgsIGNlbnRyZSk7XG4gICAgZHJhd1ZlbnVzKCgwLCBtYXRoc18xLmRlZ3JlZXNUb1JhZGlhbnMpKCh0ICUgMzYwKSksICgwLCBtYXRoc18xLmRlZ3JlZXNUb1JhZGlhbnMpKDM2MCAqICh0ICUgdmVudXNPcmJpdExlbmd0aCkgLyB2ZW51c09yYml0TGVuZ3RoKSwgY3R4LCBjZW50cmUpO1xuICAgIC8vIGVhcnRoXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoY2VudHJlLngsIGNlbnRyZS55LCBzY2FsZSAvIDIwLCAwLCAyICogTWF0aC5QSSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsdWVcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xufTtcbmxldCBzZXQgPSAoKSA9PiB7XG4gICAgY3R4LmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGN0eC5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xufTtcbnNldCgpO1xuYW5pbWF0ZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
