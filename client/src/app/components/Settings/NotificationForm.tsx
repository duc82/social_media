"use client";
import { FullUser } from "@/app/types/user";
import Link from "next/link";
import React, { useState } from "react";

export default function NotificationForm({
  currentUser,
}: {
  currentUser: FullUser;
}) {
  const [values, setValues] = useState({
    likes: true,
    comments: true,
    friendRequests: true,
    birthdays: true,
    groups: true,
    messages: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };

  return (
    <form>
      <div className="card-body pb-0">
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
            <div className="me-2">
              <h6 className="mb-0">Likes</h6>
              <p className="small mb-0">
                These are notifications for likes on your posts
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                name="likes"
                id="likesSwitchCheckChecked"
                checked={values.likes}
                onChange={handleChange}
              />
            </div>
          </li>

          <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
            <div className="me-2">
              <h6 className="mb-0">Comments</h6>
              <p className="small mb-0">
                These are notifications for comments on your posts and replies
                to your comments.
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                name="comments"
                id="commentsSwitchCheckChecked"
                checked={values.comments}
                onChange={handleChange}
              />
            </div>
          </li>

          <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
            <div className="me-2">
              <h6 className="mb-0">Friend Requests</h6>
              <p className="small mb-0">
                Notifications when someone sends you a friend request or accepts
                your friend request.
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="friendRequestSwitchCheckChecked"
                name="friendRequests"
                checked={values.friendRequests}
                onChange={handleChange}
              />
            </div>
          </li>

          <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
            <div className="me-2">
              <h6 className="mb-0">Birthdays</h6>
              <p className="small mb-0">
                These are notifications about your friends birthdays.
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="birthdaysSwitchCheckChecked"
                name="birthdays"
                checked={values.birthdays}
                onChange={handleChange}
              />
            </div>
          </li>

          <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
            <div className="me-2">
              <h6 className="mb-0">Groups</h6>
              <p className="small mb-0">
                These are notifications about activities in groups you&apos;ve
                joined.
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="groupsSwitchCheckChecked"
                name="groups"
                checked={values.groups}
                onChange={handleChange}
              />
            </div>
          </li>

          <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
            <div className="me-2">
              <h6 className="mb-0">Messages</h6>
              <p className="small mb-0">These are notifications for messages</p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="messagesSwitchCheckChecked"
                name="messages"
                checked={values.messages}
                onChange={handleChange}
              />
            </div>
          </li>

          <li className="list-group-item px-0 py-3">
            <div
              className="accordion accordion-flush border-0"
              id="emailNotifications"
            >
              <div className="accordion-item bg-transparent">
                <h2 className="accordion-header" id="flush-headingOne">
                  <Link
                    href="#!"
                    className="accordion-button mb-0 p-0 collapsed bg-transparent shadow-none"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    <span>
                      <span className="mb-0 h6 d-block">
                        Email notifications
                      </span>
                      <small className="small mb-0 text-secondary">
                        As hastened oh produced prospect.{" "}
                      </small>
                    </span>
                  </Link>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#emailNotifications"
                >
                  <div className="accordion-body p-0 pt-3">
                    <div className="text-dark">
                      <p className="mb-0 fw-bold">{currentUser.email}</p>
                      <p className="mb-0">Primary email address</p>
                    </div>

                    <hr />
                    <div className="mt-3">
                      <h6>Email frequency</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="NotiRadio"
                          id="NotiRadio1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="NotiRadio1"
                        >
                          Daily
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="NotiRadio"
                          id="NotiRadio2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="NotiRadio2"
                        >
                          Weekly
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="NotiRadio"
                          id="NotiRadio3"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="NotiRadio3"
                        >
                          Periodically
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="NotiRadio"
                          id="NotiRadio4"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="NotiRadio4"
                        >
                          Off
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="card-footer pt-0 text-end border-0">
        <button type="submit" className="btn btn-sm btn-primary mb-0">
          Save changes
        </button>
      </div>
    </form>
  );
}
