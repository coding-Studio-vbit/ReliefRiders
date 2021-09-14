import { Route,BrowserRouter as Router,Switch } from "react-router-dom";
import NavigationBar from "../Components/GlobalComponents/NavigationBar";
import AssignRequest from "../Components/AssignRequest";
import OTP from "../Components/Auth/OTP";
import createRequestGeneral from "../Components/CreateRequest/createRequestGeneral";
import Home from "../Components/Home/Home";
const Routes = () => {
  return (
    <div>
      <NavigationBar />
      <Route path="/temp" component={createRequestGeneral} />
      <Route path="/home" component={Home} />
      <Route path="/assignrequest" component={AssignRequest} />
      <Route path="/Login" component={Login} />
      <Route path="/OTP" component={OTP} />
    </div>
  );
};

export default Routes;
