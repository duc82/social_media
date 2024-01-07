import Avatar from "@/app/components/Avatar";
import Link from "next/link";

export default function Friends() {
  return (
    <div className="card">
      <div className="card-header pb-0">
        <h5 className="card-title">Friends</h5>
      </div>

      <div className="card-body">
        <div className="d-md-flex align-items-center mb-4">
          <Link href="/" className="avatar me-3 mb-3 mb-md-0">
            <Avatar
              className="avatar-img rounded-circle"
              src="/01.jpg"
              alt="Avatar"
            />
          </Link>

          <div className="w-100">
            <div className="d-sm-flex align-items-start">
              <Link href="/" className="h6 mb-0">
                Samuel Bishop
              </Link>

              <p className="small ms-sm-2 mb-0">Full Stack Web Developer</p>
            </div>

            <ul className="avatar-group mt-1 list-unstyled align-items-sm-center mb-0">
              <li className="small">
                Samuel Bishop, Judy Nguyen, and 115 other shared connections
              </li>
            </ul>
          </div>

          <div className="ms-md-auto d-flex">
            <button type="button" className="btn btn-danger btn-sm mb-0 me-2">
              Remove
            </button>
            <button type="button" className="btn btn-primary-soft btn-sm mb-0">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
