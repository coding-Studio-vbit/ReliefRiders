import React from 'react';
import './App.css'
import { AuthProvider } from './components/context/auth/authProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
//import PlacedRequest from './components/requester/my_requests/placed_request';
//import PinAddress from './components/requester/new_request/PinAddress';
import Upload from './components/requester/new_request/upload_images';
function App() {
  //todo

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
          {/* <Route path="/">
              <PinAddress />
            </Route> */}
            <Route path="/about">
              <Upload />
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