import React, { Component } from 'react';
import Tile from '../Tile/Tile';
import Utils from '../../utils';

class Field extends Component {
  horizontalMax = 4;
  verticalMax = 4;
  tilesCount = this.horizontalMax * this.verticalMax;
  constructor() {
    super();
    const tileSize = 100;
    const tileGap = 10;
    this.wrapperStyle = {
      width: `${this.horizontalMax * tileSize + (this.horizontalMax * tileGap - 1)}px`,
      display: 'grid',
      gridGap: `${tileGap}px`,
      gridTemplateColumns: `repeat(${this.horizontalMax}, ${tileSize}px)`,
      gridTemplateRows: `repeat(${this.verticalMax}, ${tileSize}px)`,
      gridAutoFlow: 'column',
      margin: 'auto'
    };

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
    const table = " ".repeat(this.tilesCount).split("");
    return (<div style={this.wrapperStyle}>{
      table.map((e, i) => <Tile color={this.state.tileColors[i % this.state.tileColors.length]} key={i} onClick={this.checkClickedTile} />)}
    </div>);
  }
}
export default Field;