import React from 'react';
import './App.css'
// import { AuthProvider } from './components/context/auth/authProvider';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
// } from "react-router-dom";
// import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
import Dialog from './components/global_ui/nav'

function App() {
  return (
    <div className="App">
    <Dialog style={{background:"red"}}/>   
      {/* <AuthProvider>
        <Router>
          <Switch>          
            <Route path="/about">
              About Page
            </Route>
            <Route path="/">
              <InitialHomeRouting />
            </Route>
          </Switch>
        </Router>
      </AuthProvider> */}
    </div>
  );
}

export default App;
