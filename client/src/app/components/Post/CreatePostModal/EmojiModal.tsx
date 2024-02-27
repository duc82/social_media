"use client";
import feelings from "@/app/data/emojis/feelings.json";
import clsx from "clsx";
import { useState } from "react";
import { Search } from "react-bootstrap-icons";

export default function EmojiModal() {
  const [activeTab, setActiveTab] = useState<"Feelings" | "Activities">(
    "Feelings"
  );

  const changeTab = (tab: "Feelings" | "Activities") => {
    setActiveTab(tab);
  };

  return (
    <div className="modal fade" id="emojiModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">How are you feeling?</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-toggle="modal"
              data-bs-target="#createPostModal"
            ></button>
          </div>
          <div className="modal-body">
            <ul className="nav nav-pills mb-2">
              <li className="nav-item">
                <button
                  type="button"
                  className={clsx(
                    "nav-link",
                    activeTab === "Feelings" && "active"
                  )}
                  onClick={() => changeTab("Feelings")}
                >
                  Feelings
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={clsx(
                    "nav-link",
                    activeTab === "Activities" && "active"
                  )}
                  onClick={() => changeTab("Activities")}
                >
                  Activities
                </button>
              </li>
            </ul>
            <div className="input-group position-relative mb-3">
              <Search className="position-absolute top-50 start-0 translate-middle-y" />
              <input
                type="text"
                placeholder="Search"
                autoComplete="off"
                className="form-control"
              />
            </div>
            <div className="row gy-2">
              {feelings.map((feeling) => (
                <div className="col-6" key={feeling.emoji}>
                  <div
                    className="w-100 d-flex align-items-center cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#createPostModal"
                  >
                    <div>{feeling.emoji}</div>
                    <span>{feeling.meaning}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
