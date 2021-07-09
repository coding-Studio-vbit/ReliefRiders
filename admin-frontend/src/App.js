import { Switch, BrowserRouter as Router } from "react-router-dom";
import Navigationbar from "./Components/GlobalComponents/NavigationBar";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <div>
              <Routes />
            </div>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
