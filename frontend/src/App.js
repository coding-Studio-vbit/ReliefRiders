import React from 'react';
import './App.css'
import { AuthProvider } from './components/context/auth/authProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
// import Model from './components/authentication/ui/error_dialog/err_dialog';
// import useModel from './components/authentication/ui/error_dialog/useerr';

function App() {
  
  //const {isShowing, toggle} = useModel();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/about">
            About
          </Route>
          <Route path="/">
            
            <AuthProvider>
            <InitialHomeRouting />
            </AuthProvider>
          </Route>
        </Switch>
      </Router>

{/* <button className="button-default" onClick={toggle}>Show Modal</button>
      <Model
        isShowing={isShowing}
        hide={toggle}
        msg="Hey this is error box"
      /> */}

      
    </div>
  );
}

export default App;
