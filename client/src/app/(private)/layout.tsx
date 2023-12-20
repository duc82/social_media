"use client";
import Image from "next/image";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar expand="lg" fixed="top" bg="mode">
        <Container>
          <Navbar.Brand
            href="/"
            className="position-relative"
            style={{ width: "36px", height: "36px" }}
          >
            <Image src="/logo.svg" alt="Logo" fill />
          </Navbar.Brand>

          <Navbar.Toggle
            className="ms-auto icon-md btn btn-light p-0"
            aria-controls="navbarCollapse"
          />
          <Navbar.Collapse id="navbarCollapse">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <Nav
            className="flex-nowrap align-items-center ms-sm-3 flex-row"
            as="ul"
          >
            <Nav.Item className="ms-2" as="li">
              <Nav.Link className="bg-light icon-md" href="/chats">
                <i className="bi bi-chat-left-text-fill"></i>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="ms-2" as="li">
              <Nav.Link className="bg-light icon-md" href="/settings">
                <i className="bi bi-gear-fill"></i>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>

      <main>{children}</main>
    </>
  );
}
