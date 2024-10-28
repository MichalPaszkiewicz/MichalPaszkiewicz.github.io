export const solveQuadratic = (a, b, c) => {
    let plus = ( - b + Math.sqrt(Math.pow(b, 2) - 4 * a * c) ) / (2 * a);
    let minus = ( - b - Math.sqrt(Math.pow(b, 2) - 4 * a * c) ) / (2 * a);
    return [plus, minus]
}

export const degreesToRadians = (degrees: number) =>
{
  // Store the value of pi.
  var pi = Math.PI;
  // Multiply degrees by pi divided by 180 to convert to radians.
  return degrees * (pi/180);
}