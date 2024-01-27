import {
  Calendar2EventFill,
  CameraReelsFill,
  EmojiSmileFill,
  GeoAltFill,
  ImageFill,
  TagFill,
} from "react-bootstrap-icons";
import Avatar from "../../Avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CreatePostModal() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  return (
    <div className="modal fade" id="createPostModal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create post</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="d-flex mb-3">
              <Avatar
                wrapperClassName="avatar avatar-xs me-2"
                className="avatar-img rounded-circle"
                src={currentUser?.profile.avatar ?? ""}
                alt={currentUser?.fullName}
              />
              <form className="w-100">
                <textarea
                  className="form-control pe-4 fs-3 lh-1 border-0"
                  rows={4}
                  placeholder="Share your thoughts..."
                  autoFocus
                ></textarea>
              </form>
            </div>
            <div className="hstack gap-2">
              <label
                className="icon-md bg-success bg-opacity-10 text-success rounded-circle cursor-pointer"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Photo"
                data-bs-original-title="Photo"
                htmlFor="image"
              >
                <ImageFill />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  hidden
                />
              </label>
              <label
                className="icon-md bg-info bg-opacity-10 text-info rounded-circle cursor-pointer"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Video"
                data-bs-original-title="Video"
                htmlFor="video"
              >
                <CameraReelsFill />
                <input
                  type="file"
                  id="video"
                  name="video"
                  accept="video/*"
                  hidden
                />
              </label>
              <button
                className="icon-md bg-danger bg-opacity-10 text-danger rounded-circle border-0"
                type="button"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Events"
                data-bs-original-title="Events"
              >
                <Calendar2EventFill />
              </button>
              <a
                className="icon-md bg-warning bg-opacity-10 text-warning rounded-circle"
                href="#"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Feeling/Activity"
                data-bs-original-title="Feeling/Activity"
              >
                <EmojiSmileFill />
              </a>
              <a
                className="icon-md bg-light text-secondary rounded-circle"
                href="#"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Check in"
                data-bs-original-title="Check in"
              >
                <GeoAltFill />
              </a>
              <a
                className="icon-md bg-primary bg-opacity-10 text-primary rounded-circle"
                href="#"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Tag people on top"
                data-bs-original-title="Tag people on top"
              >
                <TagFill />
              </a>
            </div>
          </div>

          <div className="modal-footer row justify-content-between">
            <div className="col-lg-3">
              <select className="form-select">
                <option value="public" defaultChecked>
                  Public
                </option>
                <option value="friends">Friends</option>
                <option value="onlyMe">Only me</option>
              </select>
            </div>
            <div className="col-lg-8 text-sm-end">
              <button type="submit" className="btn btn-success">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
