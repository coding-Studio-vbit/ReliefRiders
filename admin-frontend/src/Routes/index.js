import { Route } from "react-router-dom";
import Login from "../Components/Auth/Login";
import NavigationBar from "../Components/GlobalComponents/NavigationBar";
import AssignRequest from "../Components/AssignRequest";
import OTP from "../Components/Auth/OTP";
const Routes = () => {
  return (
    <div>
      <NavigationBar />
      <Route path="/temp" component={Login} />
      <Route path="/assignrequest" component={AssignRequest} />
      <Route path="/Login" component={Login} />
      <Route path="/OTP" component={OTP} />
    </div>
  );
};

export default Routes;
