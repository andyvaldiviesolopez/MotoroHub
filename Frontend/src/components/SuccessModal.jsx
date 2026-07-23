import { Modal, Button } from "react-bootstrap";

import "../styles/successModal.css";

function SuccessModal({
    show,
    onClose,
    title = "Operazione completata",
    message = "L'operazione è stata eseguita con successo.",
    buttonText = "Perfetto",
    icon = "bi-check-circle-fill"
}) {

    return (

        <Modal
            show={show}
            onHide={onClose}
            centered
        >

            <Modal.Body className="success-modal">

                <div className="success-icon">
                    <i className={`bi ${icon}`}></i>
                </div>

                <h2>

                    {title}

                </h2>

                <p>

                    {message}

                </p>

                <Button
                    variant="danger"
                    onClick={onClose}
                    className="success-button"
                >

                    {buttonText}

                </Button>

            </Modal.Body>

        </Modal>

    );

}

export default SuccessModal;