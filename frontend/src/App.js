import React from 'react';
import './App.css'
import RegisterScreen from './components/authentication/ui/register/register'
// import InputField from './components/global_ui/input';

function App() {
  return (
    <div className="App">
    <Login/>

      <RegisterScreen/>
      {/* <InputField type="number" error={"Error"} maxLength='10' placeholder="Enter Phone number" /> */}

    </div>
  );
}

export default App;
