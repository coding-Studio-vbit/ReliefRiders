import React from 'react';
import './App.css'
import { AuthProvider } from './components/context/auth/authProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ConfirmRequestGeneral from './components/requester/confirm_request/generalRequestConfirm';
import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
import UploadImages from './components/requester/new_request/upload_images';
function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/temp">
              {/* TestYourScreensHere */}
              <ConfirmRequestGeneral />
              {/* <UploadImages/> */}
            </Route>
            <Route path = "/upload">
              <UploadImages />
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