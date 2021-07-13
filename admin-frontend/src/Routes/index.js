import { Route } from "react-router-dom";
import Login from "../Components/Auth/Login";
import NavigationBar from "../Components/GlobalComponents/NavigationBar";

const Routes = () => {
  return (
    <div>
      <NavigationBar />
      <Route path="/temp" component={Login} />
    </div>
  );
};

export default Routes;
