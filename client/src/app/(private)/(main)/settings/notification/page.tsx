import NotificationForm from "@/app/components/Settings/NotificationForm";
import getServerSession from "@/app/libs/session";

export default async function Notification() {
  const { currentUser } = await getServerSession();

  return (
    <div className="card">
      <div className="card-header border-0 pb-0">
        <h5 className="card-title">Notification</h5>
        <p className="mb-0">
          Preference stimulated principles day. Sure about but most to.{" "}
        </p>
      </div>
      <NotificationForm
        currentUser={currentUser}
        settings={currentUser.notificationSettings}
      />
    </div>
  );
}
