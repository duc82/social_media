import { useRef, useState } from "react";
import ButtonBack from "../Button/ButtonBack";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import feelings from "@/app/data/feelings.json";
import activities from "@/app/data/activities.json";
import { Feeling } from "@/app/types/post";

export default function FeelingActivityModal({
  setFeeling,
  currentFeeling,
  target,
  id,
}: {
  setFeeling: (_feeling: Feeling | null) => void;
  currentFeeling?: Feeling | null;
  target: string;
  id: string;
}) {
  const [activeTab, setActiveTab] = useState<"Feelings" | "Activities">(
    "Feelings"
  );
  const [search, setSearch] = useState("");
  const backBtnRef = useRef<HTMLButtonElement>(null);

  const handleClickFeeling = (feeling: Feeling) => {
    if (currentFeeling?.name === feeling.name) {
      setFeeling(null);
      backBtnRef.current?.click();
      return;
    }
    setFeeling(feeling);
    backBtnRef.current?.click();
  };

  return (
    <div className="modal fade" id={id}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header justify-content-between">
            <ButtonBack
              data-bs-toggle="modal"
              data-bs-target={target}
              ref={backBtnRef}
            />
            <h5 className="modal-title">
              {activeTab === "Feelings"
                ? "How are you feeling?"
                : "What are you doing?"}
            </h5>
            <div></div>
          </div>
          <div className="modal-body">
            <ul className="nav nav-underline mb-3">
              <li className="nav-item">
                <button
                  type="button"
                  onClick={() => setActiveTab("Feelings")}
                  className={clsx(
                    "nav-link",
                    activeTab === "Feelings" && "active"
                  )}
                >
                  Feelings
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  onClick={() => setActiveTab("Activities")}
                  className={clsx(
                    "nav-link",
                    activeTab === "Activities" && "active"
                  )}
                >
                  Activities
                </button>
              </li>
            </ul>

            <label
              htmlFor="searchEmojis"
              className="w-100 position-relative mb-3"
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="position-absolute top-50 translate-middle-y"
                style={{ left: 16 }}
              />
              <input
                type="text"
                id="searchEmojis"
                className="form-control rounded-5"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ height: 36, paddingLeft: 36 }}
              />
            </label>
            {activeTab === "Feelings" && (
              <div className="row overflow-y-auto" style={{ maxHeight: 400 }}>
                {feelings
                  .filter((feeling) => feeling.name.includes(search))
                  .map((feeling, i) => (
                    <div key={i} className="col-6">
                      <button
                        type="button"
                        onClick={() => handleClickFeeling(feeling)}
                        className={clsx(
                          "btn w-100 px-0 d-flex align-items-center fw-normal"
                        )}
                      >
                        <div
                          className="rounded-circle bg-body d-flex align-items-center justify-content-center me-2"
                          style={{ width: 36, height: 36 }}
                        >
                          {feeling.emoji}
                        </div>

                        <span>{feeling.name}</span>
                      </button>
                    </div>
                  ))}
              </div>
            )}

            {activeTab === "Activities" && (
              <ul className="nav flex-column">
                {activities
                  .filter((activity) => activity.name.includes(search))
                  .map((activity, i) => (
                    <li key={i} className="nav-item">
                      <button type="button" className="nav-link p-0">
                        {activity.emoji} {activity.name}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
