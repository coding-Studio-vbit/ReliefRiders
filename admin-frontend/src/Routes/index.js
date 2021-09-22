import { Route,BrowserRouter as Router,Switch } from "react-router-dom";
import NavigationBar from "../Components/GlobalComponents/NavigationBar";
import AssignRequest from "../Components/AssignRequest";
import Login from './../Components/Auth/Login'
import OTP from "../Components/Auth/OTP";
import createRequestGeneral from "../Components/CreateRequest/createRequestGeneral";
import Home from "../Components/Home/Home";
import CreateAdmin from "../Components/CreateAdmin/CreateAdmin";

const Routes = () => {
  return (
    <div>
      <NavigationBar />
      <Router>
        <Switch>
          <Route path="/createRequest/general" component={createRequestGeneral} />
        </Switch>
        <Switch>
          <Route path="/createrequest/p&d" component={createRequestGeneral} />
        </Switch>
        <Switch>
          <Route path="/assignrequest" component={AssignRequest} />        
        </Switch>       
        <Switch>
          <Route path="/createRequest" component={createRequestGeneral} />
        </Switch>
        <Switch>
          <Route path="/createadmin" component={CreateAdmin} />
        </Switch>
        <Switch>
          <Route path="/login" component={Login}/>
        </Switch>
        <Switch>
          <Route path="/home" component={Home} />
        </Switch>       
        <Switch>
          <Route path="/OTP" component={OTP} />
        </Switch>
      </Router>      
    </div>
  );
};

export default Routes;
