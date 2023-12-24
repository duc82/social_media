"use client";
import Image from "next/image";
import Link from "next/link";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Avatar from "../Avatar";

export default function Header() {
  return (
    <Navbar fixed="top" expand="lg">
      <Container>
        <Navbar.Brand
          href="/"
          as={Link}
          className="position-relative"
          style={{ width: 36, height: 36 }}
        >
          <Image src="/logo.svg" alt="logo" fill />{" "}
        </Navbar.Brand>

        <Navbar.Toggle
          bsPrefix="navbar-toggler ms-auto btn-light icon-md p-0"
          aria-controls="navbarCollapse"
          children={
            <span className="navbar-toggler-animation">
              <span></span>
              <span></span>
              <span></span>
            </span>
          }
        />
        <Navbar.Collapse id="navbarCollapse">
          <Nav as="ul" className="navbar-nav ms-auto mb-2 mb-lg-0">
            <Nav.Item as="li" className="nav-item">
              <Nav.Link as={Link} href="/" className="nav-link">
                Home
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>

        <Nav as="ul" className="flex-row align-items-center ms-sm-3">
          <Nav.Item as="li" className="ms-2">
            <Nav.Link
              as={Link}
              title="Chats"
              href="/chats"
              className="bg-light icon-md btn btn-light p-0"
            >
              <i className="bi bi-chat-left-text-fill fs-6"></i>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li" className="ms-2">
            <Nav.Link
              as={Link}
              title="Settings"
              href="/settings"
              className="bg-light icon-md btn btn-light p-0"
            >
              <i className="bi bi-gear-fill fs-6"></i>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li" className="ms-2">
            <Nav.Link
              type="button"
              as="button"
              title="Notifications"
              className="bg-light icon-md btn btn-light p-0 position-relative"
            >
              <span
                className="position-absolute top-0 p-1 bg-danger rounded-circle"
                style={{ right: "-3px" }}
              ></span>
              <i className="bi bi-bell-fill fs-6"></i>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item as="li" className="ms-2 dropdown">
            <Nav.Link
              type="button"
              title="Profile"
              as="button"
              data-bs-toggle="dropdown"
              className="bg-light icon-md btn btn-light p-0 position-relative"
            >
              <Avatar src="/07.jpg" />
            </Nav.Link>

            <ul className="dropdown-menu">
              <li>
                <Link href="/" className="dropdown-item">
                  Home
                </Link>
              </li>
            </ul>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}
