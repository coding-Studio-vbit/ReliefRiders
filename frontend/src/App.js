import React from 'react';
import './App.css'
// import Login from './components/authentication/ui/login/login';
import { AuthProvider } from './components/context/auth/authProvider';
// import VerifyOTP from './components/authentication/ui/otp/verify_otp';
// import RegisterScreen from './components/authentication/ui/register/register'
// import Spinner from './components/global_ui/spinner';
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
              <p>Home</p>
            </AuthProvider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
