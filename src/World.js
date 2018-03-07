import React, { Component } from 'react';

class World extends Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="150" height="150">
        <text x="10" y="20">
          {[45, 70, 95].map((y, i) => {
            return [10, 35, 60].map((x, j) => {
              return (
                <tspan x={x} y={y}>{this.props.value[i][j]}</tspan>
              );
            });
          })}
        </text>
      </svg>
    );
  }
}

export default World;
