import Logo from "../../Images/logo.png";
import { Button } from "react-bootstrap";
export default function OTP() {
  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex justify-content-center flex-column align-items-center py-5 mt-5">
        <img src={Logo} alt="logo" width="200" />
        <div className="fw-bold mt-3 fs-3">Enter OTP</div>
        <input
          type="text"
          class="form-control mt-3 text-center"
          placeholder="Enter OTP"
        ></input>
        <Button className="mt-3" variant="success">
          LOGIN
        </Button>
      </div>
    </div>
  );
}
