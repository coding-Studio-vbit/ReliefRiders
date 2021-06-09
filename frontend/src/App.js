import React from 'react';
import './App.css'
import Login from './components/authentication/ui/login/login';
import { AuthProvider } from './components/context/auth/authProvider';
import RegisterScreen from './components/authentication/ui/register/register'
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

      <AuthProvider>
              <Login/>
            </AuthProvider>
    </div>
  );
}

export default App;
