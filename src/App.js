import React, { Component } from 'react';

import './styles.css';
import Tile from './components/Tile/Tile.jsx';
import Utils from './Utils';

class PlayField extends Component {
  horizontalMax = 4;
  verticalMax = 4;
  tilesCount = this.horizontalMax * this.verticalMax;
  constructor() {
    super();
    const possibleColors = Utils.getPossibleColors(Math.floor(this.tilesCount / 2));
    this.state = {
      tileColors: [...Utils.shuffleArray(possibleColors), ...Utils.shuffleArray(possibleColors)],
      clickedTiles: [],
    }
  }
  checkClickedTile = (tileCurrent) => {
    if (this.state.clickedTiles.length === 0) {
      this.setState({
        clickedTiles: [tileCurrent]
      })
      tileCurrent.setState({ flipped: true });
    } else if (this.state.clickedTiles.length === 1) {
      const tileClickedPreviously = this.state.clickedTiles[0];
      this.setState({
        clickedTiles: [...this.state.clickedTiles, tileCurrent]
      });
      tileCurrent.setState({ flipped: true });
      setTimeout(() => {
        if (!(tileCurrent !== tileClickedPreviously
          && tileCurrent.state.color === tileClickedPreviously.state.color)) {
          this.state.clickedTiles.forEach(tile => {
            tile.setState({
              flipped: false
            })
          })
        }
        this.setState({
          clickedTiles: []
        })
      }, 500);
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
