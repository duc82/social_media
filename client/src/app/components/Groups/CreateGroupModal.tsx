"use client";
import { FilePreview } from "@/app/types";
import { faEdit, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function CreateGroupModal() {
  const [file, setFile] = useState<FilePreview | null>(null);

  return (
    <div className="modal fade" id="createGroupModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Group</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Group name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Group name here"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Group picture</label>
                <div className="d-flex align-items-center">
                  <div className="avatar-uploader me-3">
                    <div className="avatar-edit">
                      <input
                        type="file"
                        id="avatarUpload"
                        className="d-none"
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            const file = files[0];
                            const preview = URL.createObjectURL(file);
                            const filePreview = Object.assign(file, {
                              preview,
                            });
                            setFile(filePreview);
                          }
                        }}
                      />
                      <label htmlFor="avatarUpload">
                        <FontAwesomeIcon icon={faPen} />
                      </label>
                    </div>
                    <div className="avatar avatar-xl position-relative">
                      <Image
                        id="avatar-preview"
                        className="avatar-img rounded-circle border border-white border-3 shadow"
                        src={file ? file.preview : "/placeholder.jpg"}
                        alt="Placeholder"
                        fill
                        onLoad={() => {
                          if (file) URL.revokeObjectURL(file.preview);
                        }}
                      />
                    </div>
                  </div>
                  <div className="avatar-remove">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => setFile(null)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label d-block">Select audience</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="PublicRadioOptions"
                    id="publicRadio1"
                    value="option1"
                  />
                  <label className="form-check-label" htmlFor="publicRadio1">
                    Public
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="PublicRadioOptions"
                    id="privateRadio2"
                    value="option2"
                  />
                  <label className="form-check-label" htmlFor="privateRadio2">
                    Private
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Invite friend </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add friend name here"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Group description </label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Description here"
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-success-soft">
              Create now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
