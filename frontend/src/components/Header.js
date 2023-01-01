import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../my.css'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Navbar bg="danger" expand="lg">
        <Container fluid>
          <Navbar.Brand className="nav-color" href="/products"><i className="fa-sharp fa-solid fa-house"></i> Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

              <LinkContainer to="/about">
                <Nav.Link className="nav-color"><i className="fa-sharp fa-solid fa-circle-question"></i> About Us</Nav.Link>
              </LinkContainer>
              
              <Nav.Link className="nav-color" href="https://www.tff.org"><i className="fa-solid fa-futbol"></i> TFF Official</Nav.Link>

              {userInfo ? (
                <NavDropdown className='nav-color' title={userInfo.name} id='username'>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item className='nav-color'>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item className='nav-color' onClick={logoutHandler}>Logout</NavDropdown.Item>

                </NavDropdown>
              ):
                (
                <LinkContainer to="/Login">
                  <Nav.Link className="nav-color"><i className="fa-solid fa-user"></i> Log In</Nav.Link>
                </LinkContainer>
              )}
              
            </Nav>
            <Form className="d-flex">
              
              <Form.Control
                type="search"
                placeholder="Search..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header