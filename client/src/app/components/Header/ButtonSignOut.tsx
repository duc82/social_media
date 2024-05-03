"use client";

import { signOut } from "next-auth/react";
import { Power } from "react-bootstrap-icons";

export default function ButtonSignOut() {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <button type="button" onClick={handleSignOut} className="dropdown-item">
      <Power className="me-2" />
      Sign Out
    </button>
  );
}
