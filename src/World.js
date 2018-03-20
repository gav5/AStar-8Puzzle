import React, { Component } from 'react';

class World extends Component {
  render() {
    if (this.props.value === undefined) {
      return (<span>???</span>);
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="95" height="95">
        <text x="0" y="0">
          {[0, 1, 2].map((y, i) => {
            return [0, 1, 2].map((x, j) => {
              return (
                <tspan x={x*25} y={y*25+14} key={(3*i)+j}>
                  {this.props.value.get(i, j)}
                </tspan>
              );
            });
          })}
        </text>
      </svg>
    );
  }
}

export default World;
