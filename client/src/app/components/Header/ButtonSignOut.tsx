"use client";

import { signOut } from "next-auth/react";
import { Power } from "react-bootstrap-icons";

export default function ButtonSignOut() {
  return (
    <button type="button" onClick={() => signOut()} className="dropdown-item">
      <Power className="me-2" />
      Sign Out
    </button>
  );
}
