import AccountForm from "@/app/components/Settings/AccountForm";
import getServerSession from "@/app/libs/session";

export default async function Settings() {
  const { currentUser } = await getServerSession();

  return (
    <div className="card mb-4">
      <div className="card-header border-0 pb-0">
        <h5 className="card-title">Account Settings</h5>
        <p className="mb-0">
          He moonlights difficult engrossed it, sportsmen. Interested has all
          Devonshire difficulty gay assistance joy. Unaffected at ye of
          compliment alteration to.
        </p>
      </div>
      <div className="card-body">
        <AccountForm currentUser={currentUser} />
      </div>
    </div>
  );
}
