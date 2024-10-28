"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maths_1 = require("./maths");
let canvas = document.getElementById('page');
let ctx = canvas.getContext('2d');
let scale = 100;
let timeScale = 1;
let venusOrbitRatio = 225 / 365;
let venusOrbit = 0.72;
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
    ctx.arc(endCoords.x, endCoords.y, scale / 50, 0, 2 * Math.PI);
    ctx.fill();
};
let drawVenus = (angleSun, angleVenus, ctx, centre) => {
};
let t = 0;
let animate = () => {
    t++;
    let centre = { x: canvas.width / 2, y: canvas.height / 2 };
    drawSun((0, maths_1.degreesToRadians)((t % 365) * timeScale), ctx, centre);
    drawVenus((0, maths_1.degreesToRadians)((t % 365) * timeScale), (0, maths_1.degreesToRadians)((t % 365) & timeScale * venusOrbitRatio), ctx, centre);
    window.requestAnimationFrame(animate);
};
