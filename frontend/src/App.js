import React from 'react';
import './App.css'
import { AuthProvider } from './components/context/auth/authProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
import PlacedRequest from './components/requester/my_requests/placed_request';
import RiderProfile from './components/rider/profile/RiderProfile';


function App() {
  //todo

  return (
    <div className="App">
      {/* <Map/> */}
      {/* <MyMapComponent/> */}
    
      <AuthProvider>
        <Router>
          <Switch>
          
            <Route path="/about">
              <PlacedRequest/>
          </Route>
            <Route path="/">
              <InitialHomeRouting />
            </Route>
          </Switch>
        </Router>

      </AuthProvider>
      {/* <RiderProfile/> */}

    </div>
  );
}

export default App;
