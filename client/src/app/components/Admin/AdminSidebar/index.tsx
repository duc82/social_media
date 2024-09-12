"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/images/logo.svg";
import { FullUser } from "@/app/types/user";
import "./admin_sidebar.scss";

export default function AdminSidebar({
  currentUser,
}: {
  currentUser: FullUser;
}) {
  return (
    <nav className="sidebar">
      <div className="sidebar-content"></div>
    </nav>
  );
}
