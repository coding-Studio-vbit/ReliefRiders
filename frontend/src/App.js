import React from 'react';
import './App.css'
import { AuthProvider } from './components/context/auth/authProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/about">
            About
          </Route>
          <Route path="/">
            
            <AuthProvider>
            <InitialHomeRouting />
            </AuthProvider>
          </Route>
        </Switch>
      </Router>

      
    </div>
  );
}

export default App;
