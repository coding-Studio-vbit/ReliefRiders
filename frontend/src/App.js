import React from 'react';
import './App.css'
// import { AuthProvider } from './components/context/auth/authProvider';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
// } from "react-router-dom";
// import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
// import Test from './components/rider/common/viewRequest';
import ChooseRequest from './components/rider/make_delivery/chooseRequest';

function App() {


  return (
    <div className="App">
      {/* <AuthProvider>
        <Router>
          <Switch>
            <Route path="/temp">
              <Test/> */}

              {/* <UploadImages 
              imgHeader="Upload Images: "
              imgText="Tap to add"
              name="Bills"
              setImages={setUrl}              
                /> */}
<ChooseRequest/>
            {/* </Route>
            <Route path="/">
              <InitialHomeRouting />
            </Route>
          </Switch>
        </Router>
      </AuthProvider> */}
    </div>
  );
}

export default App;
