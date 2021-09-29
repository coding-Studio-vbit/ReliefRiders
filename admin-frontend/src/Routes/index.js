import { Route,Switch } from "react-router-dom";
import NavigationBar from "../Components/GlobalComponents/NavigationBar";
import Login from './../Components/Auth/Login'
import OTP from "../Components/Auth/OTP";
import AdminHome from "../Components/AdminHome/AdminHome";
import CreateAdmin from "../Components/CreateAdmin/CreateAdmin";
import NewRequest from "../Components/CreateRequest/RequestType/RequestType";
import AssignRequest from "../Components/AssignRequest/assignRequest";
import { useContext } from "react";
import { AuthContext } from "../Context/authProvider";
import { Redirect } from "react-router";

const Routes = () => {
  const {token} = useContext(AuthContext)
  

  return (
    <div>
      <NavigationBar />
        {
          !token && <Redirect to="/login"></Redirect>
        }
        <Switch>
          <Route path="/createrequest" component={NewRequest} />
       
          <Route path="/assignrequest" component={AssignRequest} />      
      
          <Route path="/createadmin" component={CreateAdmin} />
      
          <Route path="/login" component={Login}/>
      
          <Route path="/OTP" component={OTP} />
        
          <Route exact path="/" component={AdminHome} />
        </Switch>
          
    </div>
  );
};



export default Routes;
