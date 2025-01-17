import Link from "next/link";
import Avatar from "../Avatar";

export default function GroupItem() {
  return (
    <div className="col-sm-6 col-lg-4">
      <div className="card">
        <div
          className="rounded-top"
          style={{
            backgroundImage: "url('/01.jpg')",
            height: 80,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="card-body text-center pt-0">
          <div className="avatar avatar-lg mt-n4 mb-3">
            <Link href="group-details.html">
              <Avatar
                src={"/07.jpg"}
                className="rounded-circle border border-white border-3"
              />
            </Link>
          </div>
          <h5 className="mb-0">
            <Link href="group-details.html">All in the Mind</Link>{" "}
          </h5>
          <small>
            {" "}
            <i className="bi bi-lock pe-1"></i>
            Private Group
          </small>
          <div className="hstack gap-2 gap-xl-3 justify-content-center mt-3">
            <div>
              <h6 className="mb-0">32k</h6>
              <small>Members</small>
            </div>
            <div className="vr"></div>
            <div>
              <h6 className="mb-0">20</h6>
              <small>Post per day</small>
            </div>
          </div>
          <ul className="avatar-group list-unstyled align-items-center justify-content-center mb-0 mt-3">
            <li className="avatar avatar-xs">
              <Avatar src={"/02.jpg"} className="rounded-circle" />
            </li>
            <li className="avatar avatar-xs">
              <Avatar src={"/03.jpg"} className="rounded-circle" />
            </li>
            <li className="avatar avatar-xs">
              <Avatar src={"/04.jpg"} className="rounded-circle" />
            </li>
            <li className="avatar avatar-xs">
              <Avatar src={"/05.jpg"} className="rounded-circle" />
            </li>
            <li className="avatar avatar-xs">
              <div className="avatar-img rounded-circle bg-primary">
                <span className="smaller text-white position-absolute top-50 start-50 translate-middle">
                  +22
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className="card-footer text-center">
          <button type="button" className="btn btn-success-soft btn-sm">
            Join group
          </button>
        </div>
      </div>
    </div>
  );
}
