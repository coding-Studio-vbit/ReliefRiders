import { Switch, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/authProvider";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <div>
              <AuthProvider>
              <Routes />
                </AuthProvider>
            </div>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
