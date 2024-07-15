"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function AdminSidebar() {
  const { data } = useSession();
  const user = data?.user;

  return (
    <nav className="admin-sidebar">
      <div>
        <Link
          href="/"
          className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
            className="me-2"
          />
          <span>Social Media</span>
        </Link>
        <ul className="list-unstyled">
          <li className="mb-1">
            <Link href="/admin">Dashboard</Link>
          </li>
          <li className="mb-1">
            <button
              type="button"
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#users-collapse"
              aria-expanded="false"
            >
              Users
            </button>
          </li>
        </ul>
      </div>

      <div></div>
    </nav>
  );
}
