import React, { Component } from 'react';

export default class AppHeader extends Component {
  render() {
    return (
      <header className="App-header">
        <h1 className="App-title">
          A* 8-Puzzle Solver<br/><br/>
          <small>
            Kennesaw State University CS4242 Spring 2018<br/>
            Assignment 02 Solution by Gavin Smith
          </small>
        </h1>
      </header>
    );
  }
}
