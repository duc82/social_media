import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonBack from "../Button/ButtonBack";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function TagPeopleModal() {
  return (
    <div className="modal fade" id="tagPeopleModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header justify-content-between">
            <ButtonBack
              data-bs-toggle="modal"
              data-bs-target="#createPostModal"
            />
            <h5 className="modal-title">Tag people</h5>
            <div></div>
          </div>

          <div className="modal-body">
            <div className="d-flex align-items-center">
              <label
                htmlFor="searchFriends"
                className="w-100 position-relative"
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="position-absolute top-50 translate-middle-y"
                  style={{ left: 16 }}
                />
                <input
                  type="text"
                  id="searchFriends"
                  className="form-control rounded-5"
                  placeholder="Search"
                  style={{ height: 36, paddingLeft: 36 }}
                />
              </label>
              <button
                type="button"
                className="btn link-primary"
                data-bs-toggle="modal"
                data-bs-target="#createPostModal"
              >
                Done
              </button>
            </div>

            <div className="py-3 text-center">No results</div>
          </div>
        </div>
      </div>
    </div>
  );
}
