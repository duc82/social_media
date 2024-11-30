"use client";

import { signOut } from "next-auth/react";

export default function ButtonSignOut() {
  return (
    <button type="button" onClick={() => signOut()} className="dropdown-item">
      <i className="bi bi-power me-2"></i>
      Sign Out
    </button>
  );
}
