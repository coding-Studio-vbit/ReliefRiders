import { Route,BrowserRouter as Router,Switch } from "react-router-dom";
import NavigationBar from "../Components/GlobalComponents/NavigationBar";
import AssignRequest from "../Components/AssignRequest";
import Login from './../Components/Auth/Login'
import OTP from "../Components/Auth/OTP";
import AdminHome from "../Components/AdminHome/AdminHome";
import CreateAdmin from "../Components/CreateAdmin/CreateAdmin";
import NewRequest from "../Components/CreateRequest/RequestType/RequestType";
import Home from "../Components/Home";

const Routes = () => {
  return (
    <div>
      <NavigationBar />
      <Router>
        <Switch>
          <Route path="/assignrequest" component={AssignRequest} />        
        </Switch>       
        <Switch>
          <Route path="/createrequest" component={NewRequest} />
        </Switch>
        <Switch>
          <Route path="/createadmin" component={CreateAdmin} />
        </Switch>
        <Switch>
          <Route path="/login" component={Login}/>
        </Switch>
        <Switch>
          <Route path="/home" component={AdminHome} />
        </Switch>       
        <Switch>
          <Route path="/OTP" component={OTP} />
        </Switch>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>      
    </div>
  );
};

export default Routes;
