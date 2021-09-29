import Logo from "../../Images/logo.png";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { verifyOTP } from "../../Context/authOperations";
import { useContext } from "react";
import { AuthContext } from "../../Context/authProvider";

export default function OTP() {
  const [error, setError] = useState(null)
  const [otp, setotp] = useState()
  const history = useHistory();
  const {setToken} = useContext(AuthContext)
  function validateOTP() {
    setError(null)
    const pattern = new RegExp(/^[0-9]{6,6}$/);

    if (otp === "") {
      setError("OTP cannot be empty");
      return false;
    }
    if (!pattern.test(otp)) {
      setError("Enter a valid OTP");
      return false;
    }
    setError(null)
    return true        
  }

  const handleLogin=async()=>{
    if(validateOTP()){
      const res = await verifyOTP(history.location.state.number,otp)
      if(res.error) setError(res.error)
      else{
        setToken(res.token)
        history.push('/')
      }
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex justify-content-center flex-column align-items-center py-5 mt-5">
        <img src={Logo} alt="logo" width="200" />
        <div className="fw-bold mt-3 fs-3">Enter OTP</div>
        <input
          type="text"
          class="form-control mt-3 text-center"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setotp(e.target.value)}
        ></input>
        {
          error && <p style={{textAlign:'center',color:'red'}}>{error}</p>
        }
        <Button className="mt-3" variant="success" onClick={()=>handleLogin()}>
          LOGIN
        </Button>
      </div>
    </div>
  );
}
