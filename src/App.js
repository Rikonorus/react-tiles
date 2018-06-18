import React, { Component } from 'react';
import './styles.css';

class Tile extends Component {
  state = {
    color: this.props.color,
    flipped: false,
    disabled: false
  };
  flipp = () => {
    if (!this.state.disabled) {
      this.props.onClick(this);
    }
  }
  render() {
    return (
      <div style={{ backgroundColor: (this.state.flipped) ? this.state.color : 'grey' }} onClick={this.flipp} className="box"></div>
    );
  }
}


class PlayField extends Component {
  horizontalMax = 4;
  verticalMax = 4;
  possibleColors = [];
  constructor() {
    super();
    this.fillPossibleColors();
    this.state = {
      tileColors: [...this.shuffleArray(this.possibleColors), ...this.shuffleArray(this.possibleColors)],
      clicketTiles: []
    }
  }
  getRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  }
  fillPossibleColors = () => {
    for (let i = 0; i < Math.floor(this.horizontalMax * this.verticalMax / 2); i++) {
      this.possibleColors.push(this.getRandomColor());
    }
  }
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  checkClickedTile = (tileCurrent) => {
    if (this.state.clicketTiles.length === 0) {
      this.setState({
        clicketTiles: [tileCurrent]
      })
      tileCurrent.setState({ flipped: true });
    } else {
      const tileClickedPreviously = this.state.clicketTiles[0];
      const tilesArray = [tileCurrent, tileClickedPreviously];
      if (tileCurrent !== tileClickedPreviously
        && tileCurrent.state.color === tileClickedPreviously.state.color) {
        tilesArray.forEach(tile => {
          tile.setState({
            flipped: true,
            disabled: true,
          })
        })
      } else {
        tilesArray.forEach(tile => {
          tile.setState({
            flipped: false
          })
        })
      }
      this.setState({
        clicketTiles: []
      })
    }
  }
  render() {
    const table = " ".repeat(this.horizontalMax * this.verticalMax).split("");
    let tileSize = 100;
    let tileGap = 10;
    const wrapper = {
      width: `${this.horizontalMax * tileSize + (this.horizontalMax * tileGap - 1)}px`,
      display: 'grid',
      gridGap: `${tileGap}px`,
      gridTemplateColumns: `repeat(${this.horizontalMax}, ${tileSize}px)`,
      gridTemplateRows: `repeat(${this.verticalMax}, ${tileSize}px)`,
      gridAutoFlow: 'column',
      margin: 'auto'
    };
    return (<div style={wrapper}>{
      table.map((e, i) => <Tile color={this.state.tileColors[i % this.state.tileColors.length]} key={i} onClick={this.checkClickedTile} />)}
    </div>);
  }
}

// export default App;
export default PlayField;
