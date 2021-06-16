import React from 'react';
import './App.css'
import { AuthProvider } from './components/context/auth/authProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
import MyRequests from './components/requester/my_requests/MyRequests';

function App() {
  //todo

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>

            <Route exact path="/about">
              About
            </Route>
            <Route exact path="/">
              <InitialHomeRouting />
            </Route>
            <Route exact path="/myrequests">
              <MyRequests/>
            </Route>
          </Switch>
        </Router>

      </AuthProvider>




    </div>
  );
}

export default App;
