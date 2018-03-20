import {UP, DOWN, LEFT, RIGHT} from './actions';
import cost from './cost';

export default function possibleActions(x, y, p, v) {
  var retval = [];

  if (x > 0 && p !== DOWN) {
    retval.push({action: UP, cost: cost(v, x-1, y)});
  }
  if (x < 0 && p !== UP) {
    retval.push({action: DOWN, cost: cost(v, x+1, y)});
  }
  if (y > 0 && p !== RIGHT) {
    retval.push({action: LEFT, cost: cost(v, x, y-1)});
  }
  if (y < 0 && p !== LEFT) {
    retval.push({action: RIGHT, cost: cost(v, x, y+1)});
  }
  return retval;
}
