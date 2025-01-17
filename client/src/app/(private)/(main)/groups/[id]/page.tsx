import SharePost from "@/app/components/Post/SharePost";
import getServerSession from "@/app/libs/session";
import groupService from "@/app/services/groupService";

export default async function GroupDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { token, currentUser } = await getServerSession();
  const { id } = await params;

  const group = await groupService.getById(id, token);

  return (
    <div className="row g-4">
      <div className="col-lg-8 vstack gap-4">
        <SharePost currentUser={currentUser} />
      </div>
      <div className="col-lg-4">
        <div className="row g-4">
          <div className="col-md-6 col-lg-12">
            <div className="card">
              <div className="card-header border-0 pb-0">
                <h5 className="card-title">About</h5>
              </div>
              <div className="card-body position-relative pt-0">
                {group.description && <p>{group.description}</p>}
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="bi bi-people pe-1"></i>
                    People: <strong>{group.totalMembers} Members</strong>{" "}
                  </li>
                  {group.access && (
                    <li className="mb-2">
                      <i className="bi bi-eye pe-1"></i>
                      Access:{" "}
                      <strong className="text-capitalize">
                        {group.access}
                      </strong>{" "}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
