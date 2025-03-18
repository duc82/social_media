"use client";
import { Blocked } from "@/app/types/user";
import { ChangeEvent, Fragment, useCallback, useState } from "react";
import Avatar from "../Avatar";

import userService from "@/app/services/userService";
import debounce from "@/app/utils/debounce";
import Link from "next/link";
import BlockUserModal from "./BlockUserModal";

interface BlockedListProps {
  initialBlocked: Blocked[];
  initialTotal: number;
  token: string;
}

export default function BlockedList({
  initialBlocked,
  initialTotal,
  token,
}: BlockedListProps) {
  const [blocked, setBlocked] = useState<Blocked[]>(initialBlocked);
  const [total, setTotal] = useState<number>(initialTotal);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [blockedSearch, setBlockedSearch] = useState<Blocked[]>([]);

  const handleViewMore = async () => {
    const newPage = page + 1;
    const { blocked: newBlocked, total: newTotal } =
      await userService.getBlocked(token, { page: newPage });
    setBlocked((prev) => [...prev, ...newBlocked]);
    setTotal(newTotal);
    setPage(newPage);
  };

  const handleUnblock = async (id: string) => {
    await userService.unblock(id, token);
    setBlocked((prev) => prev.filter((item) => item.user.id !== id));
    setTotal((prev) => prev - 1);
  };

  const debounceSearch = useCallback(
    debounce(async (value: string, token: string) => {
      if (!value) {
        setBlockedSearch([]);
        return;
      }

      try {
        const { blocked: newBlocked } = await userService.getBlocked(token, {
          search: value,
        });
        setBlockedSearch(newBlocked);
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

  return (
    <Fragment>
      <BlockUserModal token={token} setBlocked={setBlocked} />
      <div className="card-body pb-0">
        <div className="mb-3 d-flex flex-wrap align-items-center justify-content-between row-gap-2">
          <div className="position-relative" style={{ width: 300 }}>
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
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#blockUserModal"
            className="btn btn-primary-soft d-flex align-items-center"
          >
            <i className="bi bi-plus"></i>
            Add to blocked list
          </button>
        </div>

        <ul className="list-group list-group-flush">
          {(search ? blockedSearch : blocked).map((item) => (
            <li
              key={item.id}
              className="list-group-item py-3 px-0 d-flex justify-content-between align-items-center"
            >
              <Link
                href={`/profile/@${item.user.username}`}
                className="d-flex align-items-center"
                style={{
                  color: "inherit",
                }}
              >
                <div className="avatar avatar-sm me-2">
                  <Avatar
                    src={item.user.profile.avatar}
                    className="rounded-circle"
                  />
                </div>

                <span className="m-0 fw-medium">{item.user.fullName}</span>
              </Link>
              <button
                type="button"
                className="btn btn-sm btn-light"
                onClick={() => handleUnblock(item.user.id)}
              >
                Unblock
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer border-0 pt-0 d-flex justify-content-center">
        {blocked.length < total && !search && (
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={handleViewMore}
          >
            View more
          </button>
        )}
      </div>
    </Fragment>
  );
}
