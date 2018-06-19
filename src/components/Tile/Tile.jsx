import React, { Component } from 'react';
import './Tile.css';
import PropTypes from 'prop-types';

class Tile extends Component {
  state = {
    color: this.props.color,
    flipped: false,
    disabled: false
  };
  flipp = () => {
    if (!this.state.flipped) {
      this.props.onClick(this);
    }
  }
  render() {
    return (
      <div style={{ backgroundColor: (this.state.flipped) ? this.state.color : 'grey' }} onClick={this.flipp} className="box"></div>
    );
  }
}

Tile.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Tile;
