import React from 'react';
import { Switch, Route, BrowserRouter as Router} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import RiderHome from "./components/rider/RiderHome";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/" component={RiderHome} />
        </Switch>
      </Router>
     {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
    </div>
  );
}

export default App;
