"use client";
import { List } from "react-bootstrap-icons";
import "./admin_navbar.scss";

export default function AdminNavbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white">
      <button type="button">
        <List />
      </button>
    </nav>
  );
}
