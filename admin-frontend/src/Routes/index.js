import { Route } from "react-router-dom";
import Login from "../Components/Auth/Login";
import NavigationBar from "../Components/GlobalComponents/NavigationBar";
import AssignRequest from "../Components/AssignRequest";
import OTP from "../Components/Auth/OTP";
import createRequestGeneral from "../Components/CreateRequest/createRequestGeneral";
const Routes = () => {
  return (
    <div>
      <NavigationBar />
      <Route path="/temp" component={createRequestGeneral} />
      <Route path="/assignrequest" component={AssignRequest} />
      <Route path="/Login" component={Login} />
      <Route path="/OTP" component={OTP} />
    </div>
  );
};

export default Routes;
