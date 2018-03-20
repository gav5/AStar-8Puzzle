// Course:        CS4242
// Student name:  Gavin Smith
// Student ID:    000654103
// Assignment #:  02
// Due Date:      03/06/2018
// Signature:     ______________
// Score:         ______________

import React, { Component } from 'react';
import WorldForm from './WorldForm';
import Solution from './Solution';
import AppHeader from './AppHeader';
import possibleActions from './possibleActions';
import WorldModel from './WorldModel';
import calculate from './calculate';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      solution: null,
      initial: new WorldModel()
    };

    this.handleInitialChange = this.handleInitialChange.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }

  componentDidMount() {
    this.handleCalculate(null);
  }

  handleInitialChange(newState) {
    this.setState({initial: newState});
  }

  handleCalculate(event) {
    var solution = calculate(this.state.initial);
    console.log('solution:', solution);
    this.setState({solution: solution});
  }

  possibleActions(x, y, p) {
    return possibleActions(x, y, p);
  }

  render() {
    return (
      <div className="App">
        <AppHeader/>
        <div className="initial">
          <WorldForm
            value={this.state.initial}
            onChange={this.handleInitialChange}
          />
          <button
            className="calculate-button"
            disabled={!this.state.initial.isValid()}
            onClick={this.handleCalculate}>
            Calculate
          </button>
        </div>
        {this.state.solution === null ? '' : (
          <div className="solution">
            <hr/>
            <h3>Solution</h3>
            <Solution value={this.state.solution}/>
          </div>
        )}
      </div>
    );
  }
}

export default App;
