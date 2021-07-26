import Logo from "../../Images/logo.png";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
export default function Login() {
  let history = useHistory();
  const handleOTP = () => {
    history.push("/otp");
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
        ></input>
        <Button className="mt-3" variant="success" onClick={handleOTP}>
          Request OTP
        </Button>
      </div>
    </div>
  );
}
