// Course:        CS4242
// Student name:  Gavin Smith
// Student ID:    000654103
// Assignment #:  02
// Due Date:      03/06/2018
// Signature:     ______________
// Score:         ______________

import React, { Component } from 'react';
import World from './World';
import './App.css';

const INITIAL = 'I';
const LEFT = 'L';
const RIGHT = 'R';
const UP = 'U';
const DOWN = 'D';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      solution: null,
      canCalculate: true,
      initial: [
        [1, 2, 3],
        [8, '', 4],
        [7, 6, 5]
      ]
    };

    this.handleInitialChange = this.handleInitialChange.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }

  handleInitialChange(x, y) {
    return (event)=> {
      var canCalculate = true;
      var requiredSpace = 0x0;
      var newValue = event.target.value;

      var newState = [];
      this.state.initial.forEach(xx => {
        var newRow = [];
        xx.forEach(yy => {
          newRow.push(yy);
        });
        newState.push(newRow);
      });
      newState[x][y] = newValue;

      newState.forEach(row => {
        row.forEach(val => {
          var xval = (val === '') ? 0 : val;
          var mask = (1 << xval);
          if ((mask & requiredSpace) > 0) {
            canCalculate = false;
          }
          requiredSpace |= mask;
        })
      })
      this.setState({
        canCalculate: canCalculate,
        initial: newState,
      })
    }
  }

  handleCalculate(event) {
    var solution = [];
    var queue = [];

    var pa = this.possibleActions(1, 1, INITIAL);
    pa.forEach(a => queue.push([a]));
    solution.push({action: INITIAL, queue: queue});

    this.setState({solution: solution});
  }

  possibleActions(x, y, p) {
    var retval = [];

    if (x > 0 && p !== DOWN) {
      retval.push(UP);
    }
    if (x < 0 && p !== UP) {
      retval.push(DOWN);
    }
    if (y > 0 && p !== RIGHT) {
      retval.push(LEFT);
    }
    if (y < 0 && p !== LEFT) {
      retval.push(RIGHT);
    }
    return retval;
  }

  cost(v, x, y) {
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            A* 8-Puzzle Solver<br/><br/>
            <small>
              Kennesaw State University CS4242 Spring 2018<br/>
              Assignment 02 Solution by Gavin Smith
            </small>
          </h1>
        </header>
        <div className="initial">
          <table>
            <tbody>
              {[0, 1, 2].map(x => (
                <tr key={x}>
                  {[0, 1, 2].map(y => (
                    <td key={y}><input
                      className="puzzle-input"
                      type="number"
                      value={this.state.initial[x][y]}
                      placeholder="E"
                      onChange={this.handleInitialChange(x, y)}
                      min="1"
                      max="8"
                      step="1"
                    /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="calculate-button"
            disabled={!this.state.canCalculate}
            onClick={this.handleCalculate}>
            Calculate
          </button>
        </div>
        <World value={[[1, 2, 3], [8, '', 4], [7, 6, 5]]} />
        {this.state.solution === null ? '' : (
          <div className="solution">
            <hr/>
            <h3>Solution</h3>
            <table>
              <tbody>{this.state.solution.map((row, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td><World value={row.action}/></td>
                  <td>{row.queue.join('')}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default App;
