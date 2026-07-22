import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import "../styles/contactSellerModal.css";

function ContactSellerModal({
    show,
    onClose,
    onSend,
    motorcycle,
}) {

    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [validationError, setValidationError] = useState("");

    useEffect(() => {

        if (show) {

            setMessage("");
            setSending(false);
            setValidationError("");

        }

    }, [show]);

    const handleSubmit = async () => {

        if (!message.trim()) {

            setValidationError(
                "Inserisci un messaggio prima di inviarlo."
            );

            return;

        }

        try {

            setValidationError("");
            setSending(true);

            await onSend(message);

        } finally {

            setSending(false);

        }

    };

    return (

        <Modal
            show={show}
            onHide={onClose}
            centered
            size="lg"
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    <i className="bi bi-envelope-paper-fill text-danger me-2"></i>

                    Contatta il venditore

                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="contact-modal-body">

                <div className="contact-moto">

                    <i className="bi bi-speedometer2 me-2"></i>

                    <div>

                        <small>

                            Moto selezionata

                        </small>

                        <h5>

                            {motorcycle?.brand} {motorcycle?.model}

                        </h5>

                    </div>

                </div>

                <Form.Group>

                    <Form.Label>

                        Messaggio

                    </Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={7}
                        value={message}
                        maxLength={1000}
                        placeholder="Ciao! Sono interessato alla tua moto. È ancora disponibile?"
                        onChange={(e) => {

                            setMessage(e.target.value);

                            if (validationError) {

                                setValidationError("");

                            }

                        }}
                    />

                    <div className="contact-footer">

                        {validationError ? (

                            <span className="text-danger">

                                {validationError}

                            </span>

                        ) : (

                            <span></span>

                        )}

                        <small>

                            {message.length}/1000

                        </small>

                    </div>

                </Form.Group>

            </Modal.Body>

            <Modal.Footer className="contact-modal-footer">

                <Button
                    variant="outline-secondary"
                    onClick={onClose}
                    disabled={sending}
                >

                    <i className="bi bi-x-circle me-2"></i>

                    Annulla

                </Button>

                <Button
                    variant="danger"
                    onClick={handleSubmit}
                    disabled={sending}
                >

                    {sending ? (

                        <>

                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                            />

                            Invio...

                        </>

                    ) : (

                        <>

                            <i className="bi bi-send-fill me-2"></i>

                            Invia messaggio

                        </>

                    )}

                </Button>

            </Modal.Footer>

        </Modal>

    );

}

export default ContactSellerModal;