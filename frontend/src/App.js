import React from 'react';
import './App.css'
import { AuthProvider } from './components/context/auth/authProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
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
            
            </AuthProvider>
          </Route>
        </Switch>
      </Router>

      
    </div>
  );
}

export default App;
