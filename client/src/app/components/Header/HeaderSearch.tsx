"use client";
import userService from "@/app/services/userService";
import { FullUser } from "@/app/types/user";
import debounce from "@/app/utils/debounce";
import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import Link from "next/link";
import Avatar from "../Avatar";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HeaderSearch() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<FullUser[]>([]);
  const router = useRouter();
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

  const handleSearchMore = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === "Enter") {
      router.push(`/search?q=${search}`);
    }
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
        onKeyDown={handleSearchMore}
        data-bs-toggle="dropdown"
      />
      <div className="bg-transparent d-flex align-items-center px-2 py-0 position-absolute top-50 start-0 translate-middle-y">
        <i className="bi bi-search fs-5"></i>
      </div>

      <ul className="dropdown-menu w-100">
        {users.map((user) => {
          return (
            <li key={user.id} className="dropdown-item">
              <Link
                href={`/profile/@${user.username}`}
                className="d-flex align-items-center"
              >
                <div className="avatar">
                  <Avatar src={user.profile.avatar} alt={user.fullName} />
                </div>
                <div className="ms-2">
                  <p className="mb-0">{user.fullName}</p>
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
