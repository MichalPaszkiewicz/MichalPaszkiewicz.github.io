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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsd0JBQXdCLEdBQUcsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCOzs7Ozs7O1VDZnhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0JBQWdCLG1CQUFPLENBQUMsK0JBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qix3QkFBd0I7QUFDeEIsdUJBQXVCO0FBQ3ZCLHNCQUFzQjtBQUN0Qix1QkFBdUI7QUFDdkIsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21vZGVsZXIvLi9zcmMvbWF0aHMudHMiLCJ3ZWJwYWNrOi8vbW9kZWxlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tb2RlbGVyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWdyZWVzVG9SYWRpYW5zID0gZXhwb3J0cy5zb2x2ZVF1YWRyYXRpYyA9IHZvaWQgMDtcbmNvbnN0IHNvbHZlUXVhZHJhdGljID0gKGEsIGIsIGMpID0+IHtcbiAgICBsZXQgcGx1cyA9ICgtYiArIE1hdGguc3FydChNYXRoLnBvdyhiLCAyKSAtIDQgKiBhICogYykpIC8gKDIgKiBhKTtcbiAgICBsZXQgbWludXMgPSAoLWIgLSBNYXRoLnNxcnQoTWF0aC5wb3coYiwgMikgLSA0ICogYSAqIGMpKSAvICgyICogYSk7XG4gICAgcmV0dXJuIFtwbHVzLCBtaW51c107XG59O1xuZXhwb3J0cy5zb2x2ZVF1YWRyYXRpYyA9IHNvbHZlUXVhZHJhdGljO1xuY29uc3QgZGVncmVlc1RvUmFkaWFucyA9IChkZWdyZWVzKSA9PiB7XG4gICAgLy8gU3RvcmUgdGhlIHZhbHVlIG9mIHBpLlxuICAgIHZhciBwaSA9IE1hdGguUEk7XG4gICAgLy8gTXVsdGlwbHkgZGVncmVlcyBieSBwaSBkaXZpZGVkIGJ5IDE4MCB0byBjb252ZXJ0IHRvIHJhZGlhbnMuXG4gICAgcmV0dXJuIGRlZ3JlZXMgKiAocGkgLyAxODApO1xufTtcbmV4cG9ydHMuZGVncmVlc1RvUmFkaWFucyA9IGRlZ3JlZXNUb1JhZGlhbnM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtYXRoc18xID0gcmVxdWlyZShcIi4vbWF0aHNcIik7XG5sZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2UnKTtcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmxldCBzY2FsZSA9IDIwMDtcbmxldCB0aW1lU2NhbGUgPSAxO1xubGV0IHZlbnVzT3JiaXRMZW5ndGggPSAyMjU7XG5sZXQgdmVudXNPcmJpdFJhdGlvID0gMjI1IC8gMzY1O1xubGV0IHZlbnVzT3JiaXQgPSAwLjcyO1xubGV0IGRyYXdTdW4gPSAoYW5nbGVTdW4sIGN0eCwgY2VudHJlKSA9PiB7XG4gICAgbGV0IGludmVyc2VBbmdsZSA9IGFuZ2xlU3VuICsgTWF0aC5QSTtcbiAgICBsZXQgY29vcmREaWZmID0geyB4OiBNYXRoLmNvcyhpbnZlcnNlQW5nbGUpICogc2NhbGUsIHk6IE1hdGguc2luKGludmVyc2VBbmdsZSkgKiBzY2FsZSB9O1xuICAgIGxldCBzdGFydENvb3JkcyA9IHsgeDogY2VudHJlLnggKyBjb29yZERpZmYueCwgeTogY2VudHJlLnkgKyBjb29yZERpZmYueSB9O1xuICAgIGN0eC5saW5lV2lkdGggPSA1O1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHN0YXJ0Q29vcmRzLngsIHN0YXJ0Q29vcmRzLnkpO1xuICAgIGxldCBjb29yZERpZmYyID0geyB4OiBNYXRoLmNvcyhhbmdsZVN1bikgKiBzY2FsZSwgeTogTWF0aC5zaW4oYW5nbGVTdW4pICogc2NhbGUgfTtcbiAgICBsZXQgZW5kQ29vcmRzID0geyB4OiBjZW50cmUueCArIGNvb3JkRGlmZjIueCwgeTogY2VudHJlLnkgKyBjb29yZERpZmYyLnkgfTtcbiAgICBjdHgubGluZVRvKGVuZENvb3Jkcy54LCBlbmRDb29yZHMueSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhzdGFydENvb3Jkcy54LCBzdGFydENvb3Jkcy55LCBzY2FsZSAvIDIwLCAwLCAyICogTWF0aC5QSSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoZW5kQ29vcmRzLngsIGVuZENvb3Jkcy55LCBzY2FsZSAvIDgsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbn07XG5sZXQgZHJhd1ZlbnVzID0gKGFuZ2xlU3VuLCBhbmdsZVZlbnVzLCBjdHgsIGNlbnRyZSkgPT4ge1xuICAgIGxldCB2ZW51c1NjYWxlID0gc2NhbGUgKiArZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVJhbmdlXCIpLnZhbHVlIC8gNTA7XG4gICAgbGV0IGJhY2tEaXN0ID0gKDEgLSB2ZW51c09yYml0KSAqIHZlbnVzU2NhbGU7XG4gICAgbGV0IGZvcndhcmREaXN0ID0gKHZlbnVzT3JiaXQgKyAxKSAqIHZlbnVzU2NhbGU7XG4gICAgbGV0IGludmVyc2VBbmdsZSA9IGFuZ2xlVmVudXMgKyBNYXRoLlBJO1xuICAgIGxldCBjb29yZERpZmYgPSB7IHg6IE1hdGguY29zKGludmVyc2VBbmdsZSkgKiBiYWNrRGlzdCwgeTogTWF0aC5zaW4oaW52ZXJzZUFuZ2xlKSAqIGJhY2tEaXN0IH07XG4gICAgbGV0IHN0YXJ0Q29vcmRzID0geyB4OiBjZW50cmUueCArIGNvb3JkRGlmZi54LCB5OiBjZW50cmUueSArIGNvb3JkRGlmZi55IH07XG4gICAgbGV0IGNvb3JkRGlmZjIgPSB7IHg6IE1hdGguY29zKGFuZ2xlVmVudXMpICogZm9yd2FyZERpc3QsIHk6IE1hdGguc2luKGFuZ2xlVmVudXMpICogZm9yd2FyZERpc3QgfTtcbiAgICBsZXQgZW5kQ29vcmRzID0geyB4OiBjZW50cmUueCArIGNvb3JkRGlmZjIueCwgeTogY2VudHJlLnkgKyBjb29yZERpZmYyLnkgfTtcbiAgICBsZXQgY29vcmREaWZmQyA9IHsgeDogTWF0aC5jb3MoYW5nbGVWZW51cykgKiB2ZW51c09yYml0ICogdmVudXNTY2FsZSwgeTogTWF0aC5zaW4oYW5nbGVWZW51cykgKiB2ZW51c09yYml0ICogdmVudXNTY2FsZSB9O1xuICAgIGxldCBjQ29vcmRzID0geyB4OiBjZW50cmUueCArIGNvb3JkRGlmZkMueCwgeTogY2VudHJlLnkgKyBjb29yZERpZmZDLnkgfTtcbiAgICAvLyBpbm5lciByaW5nXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoY0Nvb3Jkcy54LCBjQ29vcmRzLnksIHZlbnVzU2NhbGUgLyA0MCwgMCwgMiAqIE1hdGguUEkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgLy8gbWFpbiBvdXRlciByaW5nXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoY0Nvb3Jkcy54LCBjQ29vcmRzLnksIHZlbnVzU2NhbGUsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIC8vIG1haW4gYmFyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oc3RhcnRDb29yZHMueCwgc3RhcnRDb29yZHMueSk7XG4gICAgY3R4LmxpbmVUbyhlbmRDb29yZHMueCwgZW5kQ29vcmRzLnkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgbGV0IHN1bkNvb3JkRGlmZiA9IHsgeDogTWF0aC5jb3MoYW5nbGVTdW4pICogdmVudXNTY2FsZSwgeTogTWF0aC5zaW4oYW5nbGVTdW4pICogdmVudXNTY2FsZSB9O1xuICAgIGxldCBzdW5Db29yZHMgPSB7IHg6IGNDb29yZHMueCArIHN1bkNvb3JkRGlmZi54LCB5OiBjQ29vcmRzLnkgKyBzdW5Db29yZERpZmYueSB9O1xuICAgIC8vIGRlZmVyZW50XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oY0Nvb3Jkcy54LCBjQ29vcmRzLnkpO1xuICAgIGN0eC5saW5lVG8oc3VuQ29vcmRzLngsIHN1bkNvb3Jkcy55KTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIC8vIHZlbnVzXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoc3VuQ29vcmRzLngsIHN1bkNvb3Jkcy55LCB2ZW51c1NjYWxlIC8gMjAsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwieWVsbG93XCI7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG59O1xubGV0IHQgPSAwO1xubGV0IGFuaW1hdGUgPSAoKSA9PiB7XG4gICAgdCsrO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xuICAgIGxldCBjZW50cmUgPSB7IHg6IGNhbnZhcy53aWR0aCAvIDIsIHk6IGNhbnZhcy5oZWlnaHQgLyAyIH07XG4gICAgZHJhd1N1bigoMCwgbWF0aHNfMS5kZWdyZWVzVG9SYWRpYW5zKSgodCAlIDM2MCkgKiB0aW1lU2NhbGUpLCBjdHgsIGNlbnRyZSk7XG4gICAgZHJhd1ZlbnVzKCgwLCBtYXRoc18xLmRlZ3JlZXNUb1JhZGlhbnMpKCh0ICUgMzYwKSksICgwLCBtYXRoc18xLmRlZ3JlZXNUb1JhZGlhbnMpKDM2MCAqICh0ICUgdmVudXNPcmJpdExlbmd0aCkgLyB2ZW51c09yYml0TGVuZ3RoKSwgY3R4LCBjZW50cmUpO1xuICAgIC8vIGVhcnRoXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoY2VudHJlLngsIGNlbnRyZS55LCBzY2FsZSAvIDIwLCAwLCAyICogTWF0aC5QSSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsdWVcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xufTtcbmxldCBzZXQgPSAoKSA9PiB7XG4gICAgY3R4LmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGN0eC5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xufTtcbnNldCgpO1xuYW5pbWF0ZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9