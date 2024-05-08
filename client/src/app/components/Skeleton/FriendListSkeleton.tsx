export default function FriendListSkeleton({ length }: { length: number }) {
  const arrays = Array(length)
    .fill(null)
    .map((_, i) => i);

  return (
    <div className="row gy-4 overflow-hidden">
      {arrays.map((_, i) => (
        <div key={i} className="col-12 col-md-6 col-lg-4 col-xl-3">
          <div className="card">
            <div className="w-100 skeleton" style={{ height: 215 }}></div>
            <div className="p-3">
              <p
                className="card-title mb-3 skeleton w-75"
                style={{ height: 22 }}
              ></p>
              <div className="d-flex flex-column justify-content-center">
                <div
                  className="skeleton mb-2 rounded-2"
                  style={{ height: 40 }}
                ></div>
                <div
                  className="skeleton rounded-2"
                  style={{ height: 40 }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
