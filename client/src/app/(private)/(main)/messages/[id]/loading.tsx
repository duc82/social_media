import ChatForm from "@/app/components/Messages/ChatForm";

export default function MessagesSkeleton() {
  return (
    <div className="col-lg-8 col-xxl-9">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0 h-100">
        <div className="card-body">
          {/* Top Avatar Status */}
          <div className="d-sm-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center mb-2 mb-sm-0 w-100">
              <div className="placeholder-glow">
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                  }}
                  className="rounded-circle flex-shrink-0 placeholder me-2"
                ></div>
              </div>
              <div className="mb-0 mt-1 w-100 placeholder-glow">
                <div className="placeholder col-2"></div>
                <br />
                <div className="placeholder col-1"></div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Audio call"
              >
                <i className="bi bi-telephone-fill"></i>
              </button>
              <button
                type="button"
                className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Video call"
              >
                <i className="bi bi-camera-video-fill"></i>
              </button>
              <div className="dropdown">
                <button
                  type="button"
                  className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
                >
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
              </div>
            </div>
          </div>

          <hr />

          {/* Messages */}

          <div
            className="overflow-y-auto"
            style={{
              height: "calc(-19.5rem + 100vh)",
            }}
          >
            <div className="placeholder-glow">
              <div className="d-flex mb-1">
                <div
                  style={{
                    width: 35,
                    height: 35,
                  }}
                  className="rounded-circle flex-shrink-0 placeholder me-2"
                ></div>
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-start">
                      <div
                        className="p-2 px-3 rounded-2 placeholder placeholder-lg col-3"
                        style={{ height: 38 }}
                      ></div>
                      <div className="my-2 placeholder placeholder-lg col-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="placeholder-glow">
              <div className="d-flex mb-1">
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-end">
                      <div
                        className="p-2 px-3 rounded-2 placeholder placeholder-lg col-3"
                        style={{ height: 38 }}
                      ></div>
                      <div className="my-2 placeholder placeholder-lg col-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="placeholder-glow">
              <div className="d-flex mb-1">
                <div
                  style={{
                    width: 35,
                    height: 35,
                  }}
                  className="rounded-circle flex-shrink-0 placeholder me-2"
                ></div>
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-start">
                      <div
                        className="p-2 px-3 rounded-2 placeholder placeholder-lg col-3"
                        style={{ height: 38 }}
                      ></div>
                      <div className="my-2 placeholder placeholder-lg col-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="placeholder-glow">
              <div className="d-flex mb-1">
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-end">
                      <div
                        className="p-2 px-3 rounded-2 placeholder placeholder-lg col-3"
                        style={{ height: 38 }}
                      ></div>
                      <div className="my-2 placeholder placeholder-lg col-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="placeholder-glow">
              <div className="d-flex mb-1">
                <div
                  style={{
                    width: 35,
                    height: 35,
                  }}
                  className="rounded-circle flex-shrink-0 placeholder me-2"
                ></div>
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-start">
                      <div
                        className="p-2 px-3 rounded-2 placeholder placeholder-lg col-3"
                        style={{ height: 38 }}
                      ></div>
                      <div className="my-2 placeholder placeholder-lg col-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="placeholder-glow">
              <div className="d-flex mb-1">
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-end">
                      <div
                        className="p-2 px-3 rounded-2 placeholder placeholder-lg col-3"
                        style={{ height: 38 }}
                      ></div>
                      <div className="my-2 placeholder placeholder-lg col-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="placeholder-glow">
              <div className="d-flex mb-1">
                <div
                  style={{
                    width: 35,
                    height: 35,
                  }}
                  className="rounded-circle flex-shrink-0 placeholder me-2"
                ></div>
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-start">
                      <div
                        className="p-2 px-3 rounded-2 placeholder placeholder-lg col-3"
                        style={{ height: 38 }}
                      ></div>
                      <div className="my-2 placeholder placeholder-lg col-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="placeholder-glow">
              <div className="d-flex mb-1">
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-end">
                      <div
                        className="p-2 px-3 rounded-2 placeholder placeholder-lg col-3"
                        style={{ height: 38 }}
                      ></div>
                      <div className="my-2 placeholder placeholder-lg col-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <ChatForm token="" />
        </div>
      </div>
    </div>
  );
}
