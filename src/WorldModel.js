export default class WorldModel {
  constructor() {
    this.state = [
      2, 8, 3,
      1, 6, 4,
      7, 5, ''
    ]
    this.emptyX = 2;
    this.emptyY = 2;
  }

  get cost() {
    const goalState = WorldModel.goal;
    return this.state.reduce((valPrev, valCur)=> {
      let valCost;
      if (valCur === '') {
        valCost = 0;
      } else {
        let gC = goalState.coordinatesOf(valCur);
        let vC = this.coordinatesOf(valCur);
        valCost = Math.abs(gC[0] - vC[0]) + Math.abs(gC[1] - vC[1]);
      }
      return valPrev + valCost;
    }, 0);
  }

  get mapKey() {
    return this.state.reduce((valPrev, valCur)=> {
      return valPrev + valCur.toString();
    }, '');
  }

  static get goal() {
    let retval = new WorldModel();
    retval.state = [
      1, 2, 3,
      8, '', 4,
      7, 6, 5
    ];
    retval.emptyX = 1;
    retval.emptyY = 1;
    return retval;
  }

  static mappedKey(x, y) {
    return (3*x) + y;
  }

  get(x, y) {
    let k = WorldModel.mappedKey(x, y);
    return this.state[k];
  }

  set(x, y, v) {
    let k = WorldModel.mappedKey(x, y);
    this.state[k] = v;

    if (v === '') {
      this.emptyX = x;
      this.emptyY = y;
    }
  }

  equals(other) {
    if (other === null || other === undefined) {
      return false;
    }
    if (this.state.length !== other.state.length) {
      return false;
    }
    for (let i in this.state) {
      let thisRow = this.state[i];
      let otherRow = other.state[i];
      if (thisRow !== otherRow) {
        return false;
      }
    }
    return true;
  }

  coordinatesOf(value) {
    for (let i in this.state) {
      if (this.state[i] === value) {
        return [Math.floor(i / 3), i % 3];
      }
    }
    return null;
  }

  clone() {
    let newState = [];
    for (let val of this.state) {
      newState.push(val);
    }
    let newWorld = new WorldModel();
    newWorld.state = newState;
    newWorld.emptyX = this.emptyX;
    newWorld.emptyY = this.emptyY;
    return newWorld;
  }

  isValid() {
    let requiredSpace = 0x0;

    for (let val of this.state) {
      let xval = (val === '') ? 0 : val;
      let mask = (1 << xval);
      if ((mask & requiredSpace) > 0) {
        return false;
      }
      requiredSpace |= mask;
    }
    return true;
  }

  get emptySpace() {
    for (let rowNum in this.state) {
      let row = this.state[rowNum];
      for (let colNum of row) {
        if (row[colNum] === '') {
          return [rowNum, colNum];
        }
      }
    }
    return null;
  }

  shifted(xDelta, yDelta) {
    let result = this.clone()
    let x = this.emptyX, y = this.emptyY;
    let xPrime = x+xDelta, yPrime = y+yDelta;
    let newVal = result.get(xPrime, yPrime);
    result.set(x, y, newVal);
    result.set(xPrime, yPrime, '');
    return result;
  }
}
