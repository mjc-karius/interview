import React from "react";
import {Link} from "react-router-dom";
import {
  Button, Container, Dropdown, Nav, Navbar, NavDropdown,
} from "react-bootstrap";

const PathogenNavbar = () =>
{
  return (<>
    <Navbar bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand href="/">Pathogen Management System</Navbar.Brand>
        <Nav className="mr-auto">

          <Link className="nav-link d-none d-sm-block " to="/">
            Search
          </Link>
          <Link className="nav-link d-none d-sm-block " to="/create">
            Create
          </Link>
        </Nav>

      </Container>
    </Navbar>
  </>);
};

export default PathogenNavbar;
