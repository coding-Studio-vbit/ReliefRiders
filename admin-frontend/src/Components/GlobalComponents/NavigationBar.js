import { Navbar, Nav } from "react-bootstrap";

export default function Navigationbar() {
  return (
    <>
      <Navbar
        bg="*"
        variant="dark"
        expand="lg"
        style={{ backgroundColor: "#79CBC5", fontWeight: "bold" }}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Admin Home</Nav.Link>
            <Nav.Link href="#home">New Request</Nav.Link>
            <Nav.Link href="/assignrequest">Assign Request</Nav.Link>
            <Nav.Link href="#ca">Create Admin</Nav.Link>
          </Nav>
          <Nav inline>
            <Nav.Link href="#home">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
