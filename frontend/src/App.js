import React from "react";
import "./App.css";
import { AuthProvider } from "./components/context/auth/authProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import InitialHomeRouting from "./components/home/initial_home/initialHomeRouting";
import ViewRequest from "./components/rider/common/viewRequest";
import About from "./components/about/about";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/about">
              <About/>
            </Route>
            <Route path="/temp">
              <ViewRequest/>
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