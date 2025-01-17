"use client";

import userService from "@/app/services/userService";
import { Blocked, FullUser } from "@/app/types/user";
import debounce from "@/app/utils/debounce";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import Avatar from "../Avatar";

export default function BlockUserModal({
  token,
  setBlocked,
}: {
  token: string;
  setBlocked: Dispatch<SetStateAction<Blocked[]>>;
}) {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<FullUser[]>([]);

  const debounceSearch = useCallback(
    debounce(async (value: string, token: string) => {
      if (!value) {
        setUsers([]);
        return;
      }

      try {
        const { users } = await userService.getAll(token, { search: value });

        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    }, 500),
    []
  );

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debounceSearch(value, token);
  };

  const handleBlock = async (id: string) => {
    try {
      const { blocked } = await userService.block(id, token);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setBlocked((prev) => [blocked, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal fade" id="blockUserModal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Block users</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="position-relative">
              <input
                type="search"
                className="form-control"
                style={{ paddingLeft: "2rem" }}
                placeholder="Type the name of a person"
                value={search}
                onChange={handleSearch}
              />
              <div className="d-flex align-items-center px-2 py-0 position-absolute top-50 start-0 translate-middle-y">
                <i className="bi bi-search fs-5"></i>
              </div>
            </div>

            <ul className="list-group list-group-flush">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="list-group-item py-3 px-0 d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <div className="avatar avatar-sm me-2">
                      <Avatar
                        src={user.profile.avatar}
                        className="rounded-circle"
                      />
                    </div>

                    <span className="text-dark m-0 fw-medium">
                      {user.fullName}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    onClick={() => handleBlock(user.id)}
                  >
                    Block
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
