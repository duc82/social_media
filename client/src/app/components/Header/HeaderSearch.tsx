"use client";
import userService from "@/app/services/userService";
import { FullUser } from "@/app/types/user";
import debounce from "@/app/utils/debounce";
import { ChangeEvent, useCallback, useState } from "react";
import { Search } from "react-bootstrap-icons";
import Link from "next/link";
import Avatar from "../Avatar";
import formatName from "@/app/utils/formatName";

export default function HeaderSearch() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<FullUser[]>([]);

  const debounceSearch = debounce(async (value: string) => {
    if (!value) return setUsers([]);

    try {
      const data = await userService.getAll({
        search: value,
        page: 1,
        limit: 10,
      });
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const getSearchResults = useCallback(
    (value: string) => debounceSearch(value),
    [debounceSearch]
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    getSearchResults(value);
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
        <Search className="fs-5" />
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
