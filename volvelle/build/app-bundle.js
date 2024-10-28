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
let timeScale = 1;
let venusOrbitLength = 225;
let venusOrbitRatio = 225 / 365;
let venusOrbit = 0.72;
let drawSun = (angleSun, ctx, centre) => {
    let inverseAngle = angleSun + Math.PI;
    let coordDiff = { x: Math.cos(inverseAngle) * scale, y: Math.sin(inverseAngle) * scale };
    let startCoords = { x: centre.x + coordDiff.x, y: centre.y + coordDiff.y };
    ctx.lineWidth = 5;
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
    ctx.fillStyle = "white";
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
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.stroke();
};
let t = 0;
let animate = () => {
    t++;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let centre = { x: canvas.width / 2, y: canvas.height / 2 };
    drawSun((0, maths_1.degreesToRadians)((t % 360) * timeScale), ctx, centre);
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
