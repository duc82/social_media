"use client";
import ButtonBack from "../Button/ButtonBack";
import { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";
import clsx from "clsx";
import Image from "next/image";

export default function EditPhotoPanel({
  src,
  active,
  onClose,
  onEdit,
}: {
  src: string;
  active: boolean;
  onClose: () => void;
  onEdit: (src: string) => void;
}) {
  const [cropper, setCropper] = useState<Cropper | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const onCrop = () => {
    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas();

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      onEdit(url);
      onClose();
    });
  };

  useEffect(() => {
    const image = imageRef.current;
    if (!image || !active) return;

    const cropper = new Cropper(image, {
      viewMode: 3,
      dragMode: "move",
      zoomable: false,
      movable: false,
      autoCropArea: 1,
    });

    setCropper(cropper);

    return () => {
      cropper.destroy();
    };
  }, [active]);

  return (
    <div className={clsx("tab-pane", active && "show active")}>
      <div className="modal-header d-flex justify-content-between">
        <ButtonBack onClick={onClose} />
        <h5 className="modal-title">Photo detail</h5>
        <div></div>
      </div>
      <div className="modal-body">
        <div>
          <Image
            src={src}
            alt="crop"
            width={0}
            height={0}
            sizes="100vw"
            className="img-fluid w-100"
            ref={imageRef}
          />
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-light" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={onCrop}>
          Save
        </button>
      </div>
    </div>
  );
}
