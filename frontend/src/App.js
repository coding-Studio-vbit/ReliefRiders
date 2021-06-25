import React from 'react';
import './App.css'
import { AuthProvider } from './components/context/auth/authProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
import Map from './components/requester/new_request/Map';
function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/temp">
              {/* TestYourScreensHere */}
              <Map/>
            </Route>
            <Route path="/">
              <InitialHomeRouting />
            </Route>
          </Switch>
        </Router>

      </AuthProvider>
    </div>
  );
}

export default App;