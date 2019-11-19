import React, { Component } from 'react';
import Datatable from './components/datatable/datatable';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div id="modal-root"></div>
        <div className="App-header">
          <h2>Test Proj</h2>
        </div>
        <Datatable></Datatable>
      </div>
    );
  }
}

export default App;
