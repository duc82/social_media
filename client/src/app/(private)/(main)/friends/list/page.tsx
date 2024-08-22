import getServerSession from "@/app/libs/session";
import userService from "@/app/services/userService";
import formatName from "@/app/utils/formatName";
import Image from "next/image";
import Link from "next/link";

const ListFriends = async () => {
  const { token } = await getServerSession();
  const { friends } = await userService.getFriends(token, "accepted");

  return (
    <div className="row">
      {friends.map((friend) => {
        const fullName = formatName(friend.firstName, friend.lastName);
        return (
          <div key={friend.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
            <div className="card">
              <Link href={`/profile/${friend.id}`} className="d-block">
                <Image
                  src={friend.profile.avatar}
                  alt={fullName}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-100 h-auto rounded-top-2"
                />
              </Link>
              <div className="p-3">
                <Link
                  href={`/profile/${friend.id}`}
                  className="card-title d-block mb-3"
                >
                  <h5 className="mb-0">{fullName}</h5>
                </Link>
                <p className="card-text">{friend.profile.bio}</p>
                <div className="d-flex flex-column justify-content-center">
                  <Link
                    href={`/messages/${friend.id}`}
                    className="btn btn-primary-soft mb-2"
                  >
                    Message
                  </Link>
                  <button className="btn btn-danger-soft">Remove</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListFriends;
