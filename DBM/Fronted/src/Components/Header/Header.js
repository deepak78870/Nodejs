//import '../index.css';
import React from "react";
import {Navbar,Nav,Container} from 'react-bootstrap';
import { NavLink } from "react-router-dom";

const Header = () =>{
    return(
        <>
 <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
  <Container>
    <NavLink to="/" style={{textDecoration:"none"}}>
       <Navbar.Brand >Deepak Sharma</Navbar.Brand>
    </NavLink>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav id="header_icon">
        <NavLink to ="/" style={{color:"white",textShadow:"blanchedalmond",textDecoration:"none"}}>
             <i class="fas fa-shopping-cart"></i>&nbsp;PRODUCT
        </NavLink>&nbsp;&nbsp;&nbsp;
        <NavLink to ="/login"style={{color:"white",textShadow:"black",float:"left",textDecoration:"none"}}>
            <i class="fas fa-user"></i>&nbsp;SignIn
        </NavLink>
      </Nav>

    </Navbar.Collapse>,
  </Container>
</Navbar>
        </>
    );
}
export default Header;