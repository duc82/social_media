"use client";
import ButtonBack from "../Button/ButtonBack";
import { useEffect, useRef } from "react";
import Cropper from "cropperjs";

export default function EditPhotoModal({
  target,
  src,
}: {
  target: string;
  src: string | null;
}) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || !src) return;

    const cropper = new Cropper(image, {
      viewMode: 3,
      dragMode: "move",
      zoomable: false,
      movable: false,
      autoCropArea: 1,
    });

    return () => {
      cropper.destroy();
    };
  }, [src]);

  return (
    <div className="modal fade" id="editPhotoModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between">
            <ButtonBack data-bs-toggle="modal" data-bs-target={target} />
            <h5 className="modal-title">Photo detail</h5>
            <div></div>
          </div>
          <div className="modal-body">
            <div>
              {src && (
                <img
                  src={src}
                  alt="crop"
                  className="img-fluid"
                  ref={imageRef}
                />
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              data-bs-toggle="modal"
              data-bs-target={target}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
