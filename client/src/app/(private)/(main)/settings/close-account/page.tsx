"use client";

import userService from "@/app/services/userService";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function CloseAccount() {
  const [checked, setChecked] = useState(false);
  const { data: session } = useSession();
  const token = session?.token;
  const userId = session?.user.id;

  const closeAccount = async () => {
    if (!token || !userId) return;
    try {
      await userService.closeAccount(userId, token);
      await signOut({
        callbackUrl: "/signin",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div className="card-header border-0 pb-0">
        <h5 className="card-title">Delete account</h5>
        <p className="mb-0">
          If you want to delete your account, you can do it here. Please note
          that this action is irreversible.
        </p>
      </div>
      <div className="card-body">
        <h6>Before you go...</h6>
        <ul>
          <li>
            Take a backup of your data <Link href="#">here</Link>
          </li>
          <li>If you delete your account, you will lose your all data.</li>
        </ul>
        <div className="form-check form-check-md my-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="deleteaccountCheck"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label className="form-check-label" htmlFor="deleteaccountCheck">
            Yes, I&apos;d like to delete my account
          </label>
        </div>

        <button
          type="button"
          className="btn btn-danger btn-sm mb-0"
          disabled={!checked}
          onClick={closeAccount}
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}
