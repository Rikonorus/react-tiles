import React, { Component } from 'react';
import logo from './logo.svg';
/* import './App.css'; */
import './styles.css';


/* class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
} */

class Tile extends Component {
  state = {
    color: 'red',
    isFlipped: false,
    disabled: false
  };
  flipp = () => {
    this.setState({
      isFlipped: true
    });
  }
  render() {
    return (
      <div style={{ backgroundColor: (this.state.isFlipped) ? this.state.color : 'grey' }} onClick={this.flipp} className="box" ></div>
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
      tileColors: [...this.shuffleArray(this.possibleColors), ...this.shuffleArray(this.possibleColors)]
    }
  }

  getRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)} )`;
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

  fillArray = () => {
    for (let i = 0; i < this.horizontalMax / 2; i++) {
      for (let j = 0; j < this.verticalMax / 2; j++) {
        this.state.possibleColors.push(this.getRandomColor());
      }
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
      table.map((e, i) => <Tile color={this.state.tileColors[i % this.state.tileColors.length]} key={i} />)}
    </div>);
  }
}

// export default App;
export default PlayField;
