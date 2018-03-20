import React, { Component } from 'react';
import World from './World';
import WorldPath from './WorldPath';
import {first, result} from 'underscore';

export default class Solution extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Step</th>
            <th>Current State</th>
            <th>Queue</th>
          </tr>
        </thead>
        <tbody>
          {this.props.value.map((row, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td><World value={result(first(row), 'finalState')}/></td>
              <td><WorldPath value={row}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
