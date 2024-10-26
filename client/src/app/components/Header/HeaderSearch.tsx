"use client";
import userService from "@/app/services/userService";
import { FullUser } from "@/app/types/user";
import debounce from "@/app/utils/debounce";
import { ChangeEvent, useCallback, useState } from "react";
import Link from "next/link";
import Avatar from "../Avatar";
import formatName from "@/app/utils/formatName";
import { useSession } from "next-auth/react";

export default function HeaderSearch() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<FullUser[]>([]);
  const { data } = useSession();
  const token = data?.token;

  const debounceSearch = debounce(async (value: string, token?: string) => {
    if (!token) return;
    if (!value) return setUsers([]);

    try {
      const data = await userService.getAll(token, {
        search: value,
        page: 1,
        limit: 10,
      });
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const getSearchResults = useCallback(debounceSearch, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    getSearchResults(value, token);
  };

  return (
    <div className="nav-item w-100 rounded position-relative dropdown">
      <input
        className="form-control ps-5 bg-light"
        id="search"
        type="text"
        placeholder="Search..."
        aria-label="Search"
        value={search}
        onChange={handleSearch}
        data-bs-toggle="dropdown"
      />
      <div className="bg-transparent d-flex align-items-center px-2 py-0 position-absolute top-50 start-0 translate-middle-y">
        <i className="bi bi-search fs-5"></i>
      </div>

      <ul className="dropdown-menu w-100">
        {users.map((user) => {
          const fullName = formatName(user.firstName, user.lastName);
          return (
            <li key={user.id} className="dropdown-item">
              <Link
                href={`/profile/${user.id}`}
                className="d-flex align-items-center"
              >
                <div className="avatar">
                  <Avatar src={user.profile.avatar} alt={fullName} />
                </div>
                <div className="ms-2">
                  <p className="mb-0">{fullName}</p>
                  {/* <small className="text-muted">{user.email}</small> */}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
