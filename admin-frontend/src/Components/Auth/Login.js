import Logo from "../../Images/logo.png";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { requestOTP } from "../../Context/authOperations";

export default function Login() {
  const [mobile, setMobile] = useState()
  const [error, setError] = useState(null)
  let history = useHistory();

  const validateMobile=()=>{
    setError(null);
    const pattern = new RegExp(/^[6-9]\d{9}$/);
    if (mobile === "") {
      setError("Mobile number cannot be empty");
      return false;
    }
    if (!pattern.test(mobile)) {
      setError("Please enter a valid number");
      return false;
    }
    setError(null);
    return true;
  }

  const handleOTP = async () => {
    if(validateMobile()){
    const res = await requestOTP(mobile)
    if(res.error){
      setError(res.error)
    }else{
      history.push("/otp",{
        number:mobile
      });
    }
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex justify-content-center flex-column align-items-center px-5 py-5 mt-5">

        <img src={Logo} alt="logo" width="200" />

        <div className="fw-bold mt-3 fs-3">Admin Login</div>

        <input
          type="text"
          class="form-control mt-3 text-center"
          placeholder="Enter phone number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        ></input>
        {
          error && <p style={{textAlign:'center',color:'red'}}>{error}</p>
        }
        <Button className="mt-3" variant="success" onClick={()=>handleOTP()}>
          Request OTP
        </Button>
      </div>
    </div>
  );
}
