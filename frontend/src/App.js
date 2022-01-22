import React from "react";
import "./App.css";
// import { AuthProvider } from "./components/context/auth/authProvider";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import InitialHomeRouting from "./components/home/initial_home/initialHomeRouting";
// import About from "./components/about/about";
import FeedbackForm from "./components/requester/feedback/feedbackForm";

function App() {
  return (
    <div className="App">
      {/* <AuthProvider>
        <Router>
          <Switch>
            <Route path="/about">
              <About/>
            </Route>
            <Route path="/">
              <InitialHomeRouting />
            </Route>
          </Switch>
        </Router>
      </AuthProvider> */}
      <FeedbackForm/>
    </div>
  );
}

export default App;