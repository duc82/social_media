import { PropsWithChildren } from "react";
import CreateGroupModal from "@/app/components/Groups/CreateGroupModal";
import GroupMenu from "@/app/components/Groups/GroupMenu";
import getServerSession from "@/app/libs/session";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function GroupLayout({ children }: PropsWithChildren) {
  const { token } = await getServerSession();

  return (
    <>
      <CreateGroupModal token={token} />
      <div className="col-md-8 col-lg-6 vstack gap-4">
        <div className="card">
          <div className="card-header border-0 pb-0">
            <div className="row g-2">
              <div className="col-lg-2">
                <h1 className="h4 card-title mb-lg-0">Group</h1>
              </div>
              <div className="col-sm-6 col-lg-3 ms-lg-auto">
                <select name="group-sort" className="form-select">
                  <option value="alphabetical">Alphabetical</option>
                  <option value="newest">Newest group</option>
                  <option value="recently-active">Recently active</option>
                  <option value="suggessted">Suggested</option>
                </select>
              </div>
              <div className="col-sm-6 col-lg-3">
                <button
                  type="button"
                  className="btn btn-primary-soft ms-auto w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#createGroupModal"
                >
                  <FontAwesomeIcon icon={faPlus} className="pe-1" />
                  Create group
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <GroupMenu />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
