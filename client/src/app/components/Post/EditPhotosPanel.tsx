import { FilePreview } from "@/app/types";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import ButtonBack from "../Button/ButtonBack";
import VideoPlayer from "@/app/libs/VideoPlayer";
import EditPhotoPanel from "./EditPhotoPanel";
import Image from "next/image";

interface EditPhotosPanelProps {
  active: boolean;
  files: FilePreview[];
  setFiles: Dispatch<SetStateAction<FilePreview[]>>;
  onClose: () => void;
}

export default function EditPhotosPanel({
  active,
  files,
  setFiles,
  onClose,
}: EditPhotosPanelProps) {
  const [url, setUrl] = useState<string | null>(null);

  const removeFile = (preview: string) => {
    setFiles((prev) => prev.filter((file) => file.preview !== preview));
  };

  if (files.length === 1)
    return (
      <EditPhotoPanel
        active={active}
        onClose={onClose}
        src={files[0].preview}
        onEdit={(src) =>
          setFiles((prev) => {
            const newFiles = [...prev];
            newFiles[0].preview = src;
            return newFiles;
          })
        }
      />
    );

  if (url) {
    return (
      <EditPhotoPanel
        src={url}
        active={true}
        onClose={() => setUrl(null)}
        onEdit={(preview) =>
          setFiles((prev) =>
            prev.map((file) => {
              if (file.preview === url) {
                file.preview = preview;
              }
              return file;
            })
          )
        }
      />
    );
  }

  return (
    <div className={clsx("tab-pane", active && "show active")}>
      <div className="modal-header d-flex justify-content-between">
        <ButtonBack onClick={onClose} />
        <h5 className="modal-title">Photos/Videos</h5>
        <div></div>
      </div>
      <div className="modal-body" style={{ maxHeight: 700 }}>
        <div className="row g-2">
          {files.map((file, idx) => (
            <div key={idx} className="col-12">
              <div className="card border-0">
                {file.type.includes("image") && (
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="card-img object-fit-cover h-auto"
                  />
                )}

                {file.type.includes("video") && (
                  <VideoPlayer
                    src={file.preview}
                    onLoad={() => URL.revokeObjectURL(file.preview)}
                  />
                )}

                <div
                  className="position-absolute w-100 d-flex align-items-center justify-content-between z-index-1"
                  style={{ top: 12, left: 0, padding: "0 12px" }}
                >
                  {file.type.includes("video") ? (
                    <div></div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setUrl(file.preview);
                      }}
                      className="me-2 px-2 py-1 d-inline-flex aligin-items-center justify-content-center mt-0 rounded-2 bg-white border-0 shadow-sm"
                    >
                      <i className="bi bi-pencil-fill me-1"></i>
                      <span>Edit</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(file.preview)}
                    className="d-flex align-items-center justify-content-center mt-0 rounded-circle bg-white border-0 shadow-sm"
                    style={{ height: 30, width: 30 }}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary-soft">
          Add Photos/Videos
        </button>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
