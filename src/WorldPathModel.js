import {UP, DOWN, LEFT, RIGHT} from './actions';
import {last} from 'underscore';

export default class WorldPathModel {
  constructor(initialState = null, values = []) {
    if (initialState !== null) {
      this._initialState = initialState;
      this._finalState = process(initialState, values);
      this._values = values;
    }
  }

  get cost() {
    return this._finalState.cost;
  }

  get values() {
    return this._values;
  }

  get initialState() {
    return this._initialState;
  }

  get finalState() {
    return this._finalState;
  }

  possibleActions() {
    let retval = [];
    let x = this._finalState.emptyX, y = this._finalState.emptyY;
    let previousAction = last(this._values);

    if (x > 0 && previousAction !== DOWN) {
      let next = this.added(UP);
      retval.push(next);
    }
    if (x < 2 && previousAction !== UP) {
      let next = this.added(DOWN);
      console.log('DOWN')
      retval.push(next);
    }
    if (y > 0 && previousAction !== RIGHT) {
      let next = this.added(LEFT);
      retval.push(next);
    }
    if (y < 2 && previousAction !== LEFT) {
      let next = this.added(RIGHT);
      retval.push(next);
    }
    return retval;
  }

  add(action) {
    let newFinalState = process(this._finalState, [action]);
    this._finalState = newFinalState;
    this._values.push(action);
  }

  added(action) {
    let next = this.clone();
    next.add(action);
    return next;
  }

  clone() {
    let next = new WorldPathModel();
    next._initialState = this._initialState.clone();
    next._values = this._values.map(v => v);
    next._finalState = this._finalState.clone();
    return next;
  }
}

function process(initialState, actions) {
  let finalState = initialState.clone();
  for (let val of actions) {
    switch (val) {
      case UP:
        finalState = finalState.shifted(-1, 0);
        break;
      case DOWN:
        finalState = finalState.shifted(1, 0);
        break;
      case LEFT:
        finalState = finalState.shifted(0, -1);
        break;
      case RIGHT:
        finalState = finalState.shifted(0, 1);
        break;
      default:
        break;
    }
  }
  return finalState;
}
