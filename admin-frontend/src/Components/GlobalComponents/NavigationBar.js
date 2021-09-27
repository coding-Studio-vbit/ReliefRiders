import { Navbar, Nav } from "react-bootstrap";

import logo from '../../Images/logo.png'

export default function Navigationbar() {
  return (
    <div>
      <Navbar
        bg="dark"
        className="px-3"
        variant="dark"
        expand="lg"
        style={{fontWeight: "400"}}
      >
        <Navbar.Brand varaint="light">
        <img src={logo} alt="" height="25" style={{paddingRight:'10px'}}/>
        Relief Riders
        </Navbar.Brand>
        <Navbar.Toggle className="right-0"/>

        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/createrequest">Create Request</Nav.Link>
            <Nav.Link href="/assignrequest" >Assign Request</Nav.Link>
            <Nav.Link href="/createAdmin">Create Admin</Nav.Link>
            <Nav.Link href="/">SIGN OUT</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
