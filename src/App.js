import React from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
import Form from './Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="title">ZoneGenie</h1>
        <p>Ma création, votre demande</p>
        <Form />
      </header>
    </div>
  );
}

export default App;
