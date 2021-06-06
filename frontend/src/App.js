import React from 'react';
import './App.css'
import VerifyOTP from './components/authentication/ui/otp/verify_otp';
import RegisterScreen from './components/authentication/ui/register/register'
// import Spinner from './components/global_ui/spinner';

function App() {
  return (
    <div className="App">
      {/* <Spinner radius="2" /> */}
      <VerifyOTP/>
      <RegisterScreen/>
    </div>
  );
}

export default App;
