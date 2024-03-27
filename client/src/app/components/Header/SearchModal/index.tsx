"use client";
import useBootstrap from "@/app/hooks/useBootstrap";
import userService from "@/app/services/userService";
import { FullUser } from "@/app/types/user";
import debounce from "@/app/utils/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "react-bootstrap-icons";

export default function SearchModal() {
  const bootstrap = useBootstrap();
  const searchModalRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<FullUser[]>([]);

  const debounceSearch = debounce(async (value: string) => {
    if (!value) return setUsers([]);

    try {
      const data = await userService.getAll({
        search: value,
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
    getSearchResults(value);
  };

  useEffect(() => {
    if (!bootstrap || !searchModalRef.current) return;
    const searchModal = new bootstrap.Modal(searchModalRef.current, {
      keyboard: true,
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        searchModal.toggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [bootstrap, searchModalRef]);

  return (
    <div
      className="modal fade"
      id="searchModal"
      data-bs-keyboard="true"
      ref={searchModalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="position-relative w-100">
              <input
                type="text"
                placeholder="Search"
                className="form-control ps-5"
                value={search}
                onChange={handleSearch}
              />
              <button
                type="button"
                className="position-absolute top-50 start-0 translate-middle-y btn btn-sm"
              >
                <Search className="fs-5" />
              </button>
            </div>
          </div>
          <div className="modal-body">
            <ul className="list-group">
              {users.map((user) => (
                <li key={user.id} className="list-group-item">
                  {user.fullName}
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
}
