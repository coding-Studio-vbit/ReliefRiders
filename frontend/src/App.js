import React from 'react';
import './App.css'
import { AuthProvider } from './components/context/auth/authProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
import RequesterHomeScreen from './components/home/Requester/RequesterHomeScreen';
import Temp from './components/requester/my_requests/temp';

function App() {
  
  return (
    <div className="App">
      {/* <AuthProvider>
        <Router>
          <Switch>
          <Route path="/home/requester">
              <RequesterHomeScreen />
            </Route>
            <Route path="/home/rider">
              TODO by anisha
            </Route>
            <Route path="/about">
              About
          </Route>
            <Route path="/">
              <InitialHomeRouting />
            </Route>
            
          </Switch>
        </Router>

      </AuthProvider> */}
      <Temp/>



      
    </div>
  );
}

export default App;
