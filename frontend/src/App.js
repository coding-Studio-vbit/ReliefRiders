import React from 'react';
import './App.css'
import Login from './components/authentication/ui/login/login';
// import VerifyOTP from './components/authentication/ui/otp/verify_otp';
// import RegisterScreen from './components/authentication/ui/register/register'
// import Spinner from './components/global_ui/spinner';

function App() {
  return (
    <div className="App">
      {/* <Spinner radius="2" /> */}
    {/* <VerifyOTP/> */}
      <Login/>
    {/* <RegisterScreen/> */}
    </div>
  );
}

export default App;
