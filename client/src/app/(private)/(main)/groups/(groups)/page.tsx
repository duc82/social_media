import Avatar from "@/app/components/Avatar";
import getServerSession from "@/app/libs/session";
import groupService from "@/app/services/groupService";
import formatNumber from "@/app/utils/formatNumber";
import Link from "next/link";

export default async function Groups() {
  const { token } = await getServerSession();

  const { groups } = await groupService.getAll(token, {
    tags: ["groups"],
  });

  return (
    <div className="row g-4">
      {groups.map((group) => (
        <div key={group.id} className="col-sm-6 col-lg-4">
          <div className="card">
            <div
              className="rounded-top"
              style={{
                height: 80,
                backgroundImage: `url('${group.wallpaper}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="card-body text-center pt-0">
              <Link
                href={`/groups/${group.id}`}
                className="avatar avatar-lg mt-n4 mb-2"
              >
                <Avatar
                  className="rounded-circle border border-white border-3 bg-white"
                  src={group.picture}
                  alt={group.name}
                />
              </Link>
              <h5 className="mb-0">
                <Link href={`/groups/${group.id}`}>{group.name}</Link>
              </h5>
              <small>
                <i className="bi bi-lock pe-1"></i>{" "}
                {group.access[0].toUpperCase() + group.access.slice(1)} Group
              </small>
              <div className="hstack gap-2 gap-xl-3 justify-content-center mt-3">
                <div>
                  <h6 className="mb-0">{formatNumber(group.totalMembers)}</h6>
                  <small>Members</small>
                </div>
                <div className="vr"></div>
                <div>
                  <h6 className="mb-0">20</h6>
                  <small>Post per day</small>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <button type="button" className="btn btn-success-soft btn-sm">
                Join group
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
