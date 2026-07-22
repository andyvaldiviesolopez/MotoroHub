import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ContactSellerModal({
    show,
    onClose,
    onSend,
    motorcycle
}) {

    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (show) {
            setMessage("");
            setSending(false);
        }
    }, [show]);

    const handleSubmit = async () => {

        if (!message.trim()) {
            return alert("Inserisci un messaggio.");
        }

        try {

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
        >

            <Modal.Header closeButton>

                <Modal.Title>
                    📧 Contatta il venditore
                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <p>
                    Stai inviando un messaggio al proprietario della moto:
                </p>

                <h5 className="mb-3">
                    {motorcycle?.brand} {motorcycle?.model}
                </h5>

                <Form.Group>

                    <Form.Label>
                        Messaggio
                    </Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={6}
                        value={message}
                        maxLength={1000}
                        placeholder="Scrivi qui il tuo messaggio..."
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="text-end text-muted mt-2">
                        {message.length}/1000
                    </div>

                </Form.Group>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={onClose}
                    disabled={sending}
                >
                    Annulla
                </Button>

                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={sending}
                >
                    {sending ? "Invio..." : "Invia"}
                </Button>

            </Modal.Footer>

        </Modal>
    );

}

export default ContactSellerModal;