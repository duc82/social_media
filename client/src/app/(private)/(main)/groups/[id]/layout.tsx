import Avatar from "@/app/components/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import one from "@/app/assets/images/avatars/01.jpg";
import two from "@/app/assets/images/avatars/02.jpg";
import three from "@/app/assets/images/avatars/03.jpg";
import four from "@/app/assets/images/avatars/04.jpg";
import five from "@/app/assets/images/avatars/05.jpg";
import six from "@/app/assets/images/avatars/06.jpg";
import seven from "@/app/assets/images/avatars/07.jpg";
import eight from "@/app/assets/images/avatars/08.jpg";
import nine from "@/app/assets/images/avatars/09.jpg";
import ten from "@/app/assets/images/avatars/10.jpg";
import GroupDetailMenus from "@/app/components/Groups/GroupDetailMenus";
import Link from "next/link";
import getServerSession from "@/app/libs/session";
import groupService from "@/app/services/groupService";
import formatNumber from "@/app/utils/formatNumber";

export default async function GroupDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { token, currentUser } = await getServerSession();
  const { id } = await params;

  const group = await groupService.getById(id, token);

  return (
    <div className="col-md-8 col-lg-6 vstack gap-4">
      <div className="card">
        <div className="card-body">
          <div className="d-md-flex flex-wrap align-items-start text-center text-md-start">
            <div className="avatar avatar-xl mb-2">
              <Avatar src={group.picture} />
            </div>
            <div className="ms-md-4 mt-3">
              <h1 className="h5 mb-0">
                {group.name}
                <i className="bi bi-patch-check-fill text-success small"></i>
              </h1>
              <ul className="nav nav-divider justify-content-center justify-content-md-start">
                <li className="nav-item">
                  {" "}
                  {group.access.slice(0, 1).toUpperCase() +
                    group.access.slice(1)}{" "}
                  group{" "}
                </li>
                <li className="nav-item">
                  {" "}
                  {formatNumber(group.totalMembers)} members{" "}
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-center justify-content-md-start align-items-center mt-3 ms-lg-auto">
              {group.members.some(
                (member) => member.user.id === currentUser.id
              ) && (
                <button
                  className="btn btn-sm btn-primary-soft me-2"
                  type="button"
                >
                  {" "}
                  <i className="bi bi-person-check-fill pe-1"></i> Joined
                </button>
              )}
              <button className="btn btn-sm btn-success me-2" type="button">
                <FontAwesomeIcon icon={faPlus} className="pe-1" />
                Invite
              </button>
              <div className="dropdown">
                <button
                  className="icon-sm btn btn-dark-soft"
                  type="button"
                  id="groupAction"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots"></i>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="groupAction"
                >
                  <li>
                    <Link className="dropdown-item" href="#">
                      {" "}
                      <i className="bi bi-bookmark fa-fw pe-2"></i>Share profile
                      in a message
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      {" "}
                      <i className="bi bi-file-earmark-pdf fa-fw pe-2"></i>Save
                      your profile to PDF
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      {" "}
                      <i className="bi bi-lock fa-fw pe-2"></i>Lock profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      {" "}
                      <i className="bi bi-gear fa-fw pe-2"></i>Profile settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <ul className="avatar-group list-unstyled justify-content-center justify-content-md-start align-items-center mb-0 mt-3 flex-wrap">
            <li className="avatar avatar-xs">
              <Avatar className="rounded-circle" src={one.src} alt="avatar" />
            </li>
            <li className="avatar avatar-xs">
              <Avatar className="rounded-circle" src={two.src} alt="avatar" />
            </li>
            <li className="avatar avatar-xs">
              <Avatar className="rounded-circle" src={three.src} alt="avatar" />
            </li>
            <li className="avatar avatar-xs">
              <Avatar className="rounded-circle" src={four.src} alt="avatar" />
            </li>
            <li className="avatar avatar-xs">
              <Avatar className="rounded-circle" src={five.src} alt="avatar" />
            </li>
            <li className="avatar avatar-xs">
              <Avatar className="rounded-circle" src={six.src} alt="avatar" />
            </li>
            <li className="avatar avatar-xs">
              <Avatar className="rounded-circle" src={seven.src} alt="avatar" />
            </li>
            <li className="avatar avatar-xs">
              <Avatar className="rounded-circle" src={eight.src} alt="avatar" />
            </li>
            <li className="avatar avatar-xs">
              <Avatar className="rounded-circle" src={nine.src} alt="avatar" />
            </li>
            <li className="avatar avatar-xs">
              <Avatar className="rounded-circle" src={ten.src} alt="avatar" />
            </li>
            <li className="avatar avatar-xs me-2">
              <div className="avatar-img rounded-circle bg-primary">
                <span className="smaller text-white position-absolute top-50 start-50 translate-middle">
                  +19
                </span>
              </div>
            </li>
            <li className="small text-center">
              Carolyn Ortiz, Frances Guerrero, and 20 joined group
            </li>
          </ul>
        </div>
        <div className="card-footer">
          <GroupDetailMenus totalMembers={28300} />
        </div>
      </div>

      {children}
    </div>
  );
}
