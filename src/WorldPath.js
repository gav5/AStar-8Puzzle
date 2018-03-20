import React, { Component } from 'react';

export default class WorldPath extends Component {
  render() {
    return this.props.value === undefined ? "" : (
      <div>
        {this.props.value.map((v, i) => {
          return (
            <span key={i}>
              {i > 0 ? (<br/>) : ""}
              {v.values.join('')} ({v.cost})
            </span>
          );
        })}
      </div>
    );
  }
}
