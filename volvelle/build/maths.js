"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
