import { Button, Modal } from "react-bootstrap"

interface ConfirmCompleteProps {
    onDismiss: () => void
    onComplete: () => void
}

export const ConfirmComplete = ({onDismiss, onComplete}: ConfirmCompleteProps) => {



    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title className="text-center">
                    ARE YOU SURE YOU WISH TO COMPLETE THIS PROJECT?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                Congratulations on completing all the tasks, before completing the project, double check everything is working correctly and is a success before marking this project as complete.
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between w-100">
                <Button
                onClick={onDismiss}>
                    CANCEL
                </Button>
                <Button
                className="btn-success"
                onClick={onComplete}>
                    COMPLETE
                </Button>
            </Modal.Footer>
        </Modal>
    )
}