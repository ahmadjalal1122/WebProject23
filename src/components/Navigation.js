import axios from "../axios";
import React, { useRef, useState } from "react";
import { Navbar, Button, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
import "./Navigation.css";

function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const bellRef = useRef(null);
    const notificationRef = useRef(null);
    const [bellPos, setBellPos] = useState({});

    function handleLogout() {
        dispatch(logout());
    }
    const unreadNotifications = user?.notifications?.reduce((acc, current) => {
        if (current.status == "unread") return acc + 1;
        return acc;
    }, 0);

    function handleToggleNotifications() {
        const position = bellRef.current.getBoundingClientRect();
        setBellPos(position);
        notificationRef.current.style.display = notificationRef.current.style.display === "block" ? "none" : "block";
        dispatch(resetNotifications());
        if (unreadNotifications > 0) axios.post(`/users/${user._id}/updateNotifications`);
    }

    return (
        <Navbar bg="light" expand="lg">
      <Container>
                <LinkContainer to="/">
                                <Navbar.Brand>Ecomern</Navbar.Brand>
                </LinkContainer>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="ms-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> */}

            <Nav className="ms-auto">
                {/* if no user */}
                {!user && (
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                )}
                {user && !user.isAdmin && (
                    <LinkContainer to="/cart">
                        <Nav.Link>
                            <i className="fas fa-shopping-cart"></i>
                            {user?.cart.count > 0 && (
                                <span className="badge badge-warning" id="cartcount" style={{color:"red"}}>
                                    {user.cart.count}
                                </span>
                            )}
                        </Nav.Link>
                    </LinkContainer>
                )}

                {/* if user */}
                {user && (
                    <>
                    {/* onClick={handleToggleNotifications} */}
                        <Nav.Link style={{ position: "relative" }} onClick={handleToggleNotifications}>
                            <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null}></i>
                        </Nav.Link>
                        <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                            {user.isAdmin && (
                                <>
                                    <LinkContainer to="/admin">
                                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/new-product">
                                        <NavDropdown.Item>Create Product</NavDropdown.Item>
                                    </LinkContainer>
                                </>
                            )}
                            {!user.isAdmin && (
                                <>
                                    <LinkContainer to="/cart">
                                        <NavDropdown.Item>Cart</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/orders">
                                        <NavDropdown.Item>My orders</NavDropdown.Item>
                                    </LinkContainer>
                                </>
                            )}

                            <NavDropdown.Divider />
                            <Button variant="danger" onClick={handleLogout} className="logout-btn">
                                Logout
                            </Button>
                        </NavDropdown>
                    </>
                )}
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

export default Navigation;
