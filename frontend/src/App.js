import React, { useState } from 'react';
import './App.css'
import { AuthProvider } from './components/context/auth/authProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
import PlacedRequest from './components/requester/my_requests/placed_request';
import Button from './components/global_ui/buttons/button';


function App() {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    console.log("fjfkfkfjk");
    setIsChecked(!isChecked);
  };

  //todo

  return (
    <div className="App">
      {/* <AuthProvider>
        <Router>
          <Switch>
          
            <Route path="/about">
              <PlacedRequest/>
          </Route>
            <Route path="/">
              <InitialHomeRouting />
            </Route>
          </Switch>
        </Router>

      </AuthProvider> */}
      <Button 
      text="SUBMIT" bgColor="red" color="white"
      isRounded="true"
      paddingTB="20px"
      paddingLR="17px"
      borderWidth="0px"
      isBlock="true"
      onClick={ ()=>console.log("Clicked")}
        />

        <span className="bc">
       
      <label htmlFor="topping">ckck</label>
      <input
          type="checkbox"
          checked={isChecked}
          onChange={handleOnChange}
        />

        </span>

     
        
      
      
    </div>
  );
}

export default App;
