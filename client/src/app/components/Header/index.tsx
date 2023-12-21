"use client";
import Image from "next/image";
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar fixed="top" expand="lg" className="bg-mode">
      <Container>
        <Navbar.Brand
          href="/"
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
              href="/chats"
              className="bg-light icon-md btn btn-light p-0"
            >
              <i className="bi bi-chat-left-text-fill"></i>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}
