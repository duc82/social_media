import FriendListSkeleton from "@/app/components/Skeleton/FriendListSkeleton";

export default function FriendsLoading() {
  return (
    <div>
      <h5 className="mb-3">People you may know</h5>
      <FriendListSkeleton length={20} />
    </div>
  );
}
