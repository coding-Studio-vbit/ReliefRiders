import { Route,BrowserRouter as Router,Switch } from "react-router-dom";
import NavigationBar from "../Components/GlobalComponents/NavigationBar";
import NewRequest from "../Components/CreateRequest/NewRequest";

const Routes = () => {
  return (
    <div>
      <NavigationBar />
      <Router>
        <Switch>
          <Route exact path="/newrequest" component={NewRequest}/>
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
