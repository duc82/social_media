import Link from "next/link";
import Avatar from "../../Avatar";
import { FullUser } from "@/app/types/user";

interface FriendProps {
  user: FullUser;
  handleRemove: (id: string) => void;
}

const Friend = ({ user, handleRemove }: FriendProps) => {
  const url = `/profile/${user.id}`;

  return (
    <div className="card-body">
      <div className="d-md-flex align-items-center mb-4">
        <Link href={url} className="avatar me-3 mb-3 mb-md-0">
          <Avatar
            className="avatar-img rounded-circle"
            src={user.profile.avatar}
            alt={user.fullName}
          />
        </Link>

        <div className="w-100">
          <div className="d-sm-flex align-items-start">
            <Link href={url} className="h6 mb-0">
              {user.fullName}
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
          <button
            type="button"
            onClick={() => handleRemove(user.id)}
            className="btn btn-danger-soft btn-sm mb-0 me-2"
          >
            Remove
          </button>
          <button type="button" className="btn btn-primary-soft btn-sm mb-0">
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Friend;
