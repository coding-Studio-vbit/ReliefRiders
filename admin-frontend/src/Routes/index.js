import { Route } from "react-router-dom";
//import Login from "../Components/Auth/Login";
import NavigationBar from "../Components/GlobalComponents/NavigationBar";
import createRequestGeneral from "../Components/CreateRequest/createRequestGeneral";

const Routes = () => {
  return (
    <div>
      <NavigationBar />
      <Route path="/temp" component={createRequestGeneral} />
    </div>
  );
};

export default Routes;
