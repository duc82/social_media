export default function AddChatModal() {
  return (
    <div className="modal fade" id="addChatModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add chat</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-content"></div>
        </div>
      </div>
    </div>
  );
}
