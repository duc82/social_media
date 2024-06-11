import { Avatar, UserResponse } from "@stream-io/video-react-sdk";

export default function CallAvatar({ user }: { user?: UserResponse }) {
  if (user) {
    return (
      <div>
        <Avatar name={user.name} imageSrc={user.image} />
        {user.name && (
          <div>
            <span>{user.name}</span>
          </div>
        )}
      </div>
    );
  }

  return null;
}
