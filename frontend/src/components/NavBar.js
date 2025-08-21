import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase";
import $ from "jquery";

function NavBar(props) {
  const authentication = getAuth(app);
  onAuthStateChanged(authentication, (user) => {
    if (user) {
      $("#auth-text").text("Log Out");
    } else {
      $("#auth-text").text("Log In");
    }
  });
  const signInWithGoogle = () => {
    if (props.userStatus == false) {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(authentication, provider)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      signOut(authentication)
        .then(() => {
          $("#auth-text").text("Log In");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={require("../img/tllogo.png")}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            TL Weekly Project Log
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
              <Nav.Link as={Link} to="/">
                Form
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/coachlog">
                Coach Log
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          {/* <Navbar.Collapse className="justify-content-end">
                <Nav.Link  onClick={signInWithGoogle} id="auth-text">Log in</Nav.Link>
            </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
