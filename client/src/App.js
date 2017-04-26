import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rand from './Components/Rand';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <Rand />
        </div>
      </div>
    );
  }
}

export default App;
