import React from "react";
import {Link} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";

const PathogenNavbar = () =>
{
  return (<>
    <Navbar expand={"md"}>
      <Navbar.Brand href="/">Pathogen Management</Navbar.Brand>

      <Container fluid>

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
