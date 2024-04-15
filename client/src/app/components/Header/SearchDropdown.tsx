"use client";
import userService from "@/app/services/userService";
import { FullUser } from "@/app/types/user";
import debounce from "@/app/utils/debounce";
import { useCallback, useState } from "react";
import { Search } from "react-bootstrap-icons";
import Link from "next/link";
import Avatar from "../Avatar";

export default function SearchDropdown() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<FullUser[]>([]);

  const debounceSearch = debounce(async (value: string) => {
    if (!value) return setUsers([]);

    try {
      const data = await userService.getAll({
        search: value
      });
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const getSearchResults = useCallback(
    (value: string) => debounceSearch(value),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    // getSearchResults(value);
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
      />
      <button
        className="btn bg-transparent d-flex align-items-center px-2 py-0 position-absolute top-50 start-0 translate-middle-y"
        type="button"
        data-bs-toggle="dropdown"
      >
        <Search className="fs-5" />
      </button>

      <ul className="dropdown-menu"></ul>
    </div>
  );
}
