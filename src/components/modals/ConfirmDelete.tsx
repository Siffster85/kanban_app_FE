import { Button, Modal } from "react-bootstrap"

interface ConfirmDeleteProps {
    onDismiss: () => void
    onDelete: () => void
}

export const ConfirmDelete = ({onDismiss, onDelete}: ConfirmDeleteProps) => {



    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title className="text-center">
                    ARE YOU SURE YOU WISH TO DELETE THIS PROJECT?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                If you delete this project it cannot be undone and will delete all associated tasks. Please be certain before progressing.
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between w-100">
                <Button
                onClick={onDismiss}>
                    CANCEL
                </Button>
                <Button
                className="btn-danger"
                onClick={onDelete}>
                    DELETE
                </Button>
            </Modal.Footer>
        </Modal>
    )
}