function ConfirmModal({
  show,
  title,
  message,
  onConfirm,
  onClose,
}) {
  if (!show) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
      ></div>

      <div
        className="modal d-block"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">

            <div className="modal-header">

              <h5 className="modal-title">
                {title}
              </h5>

              <button
                className="btn-close"
                onClick={onClose}
              ></button>

            </div>

            <div className="modal-body">

              <p>{message}</p>

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Annulla
              </button>

              <button
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Elimina
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default ConfirmModal;