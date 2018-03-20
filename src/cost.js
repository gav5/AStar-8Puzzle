export default function cost(v, x, y) {
  var xf, yf;
  switch (v) {
    case 1:
      xf = 0;
      yf = 0;
      break;
    case 2:
      xf = 0;
      yf = 1;
      break;
    case 3:
      xf = 0;
      yf = 2;
      break;
    case 8:
      xf = 1;
      yf = 0;
      break;
    case '':
      xf = 1;
      yf = 1;
      break;
    case 4:
      xf = 1;
      yf = 2;
      break;
    case 7:
      xf = 2;
      yf = 0;
      break;
    case 6:
      xf = 2;
      yf = 1;
      break;
    case 5:
      xf = 2;
      yf = 2;
      break;
    default:
      throw new Error("invalid value!");
  }
  return Math.abs(x - xf) + Math.abs(y - yf);
}
