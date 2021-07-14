import { Route } from "react-router-dom";
import Login from "../Components/Auth/Login";
import NavigationBar from "../Components/GlobalComponents/NavigationBar";
import AssignRequest from "../Components/AssignRequest";
const Routes = () => {
  return (
    <div>
      <NavigationBar />
      <Route path="/temp" component={Login} />
      <Route path="/assignrequest" component={AssignRequest} />
    </div>
  );
};

export default Routes;
