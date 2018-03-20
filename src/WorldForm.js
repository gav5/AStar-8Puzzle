import React, { Component } from 'react';

export default class WorldForm extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(x, y) {
    return (event)=> {
      let newValue = event.target.value;
      let newState = this.props.value.clone();
      newState.set(x, y, newValue);
      this.props.onChange(newState);
    }
  }

  render() {
    return (
      <table>
        <tbody>
          {[0, 1, 2].map(x => (
            <tr key={x}>
              {[0, 1, 2].map(y => (
                <td key={y}><input
                  className="puzzle-input"
                  type="number"
                  value={this.props.value.get(x, y)}
                  placeholder="E"
                  onChange={this.handleChange(x, y)}
                  min="1"
                  max="8"
                  step="1"
                /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
