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
import RequesterProfile from './components/requester/profile/editRequesterProfile';
// import { AuthProvider } from './components/context/auth/authProvider';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
// } from "react-router-dom";
// import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
// import PlacedRequest from './components/requester/my_requests/placed_request';


function App() {
  //todo

  return (
    <div className="App">        
      {/* <AuthProvider>
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
      </AuthProvider> */}
      <RequesterProfile/>
    </div>
  );
}

export default App;
