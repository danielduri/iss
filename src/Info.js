import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    API Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Please note that there is an inherent uncertainty in the ISS position models that is usually larger
                    than one second. In addition the position is only calculated once per second (the maximum resolution
                    of an integer unix time stamp). So polling more than 1 Hz would be useless except to add unnecessary
                    strain to the servers.

                    A single client should try and keep polling to about once every 5 seconds.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <a href={"http://open-notify.org/Open-Notify-API/ISS-Location-Now/"}>Read API Docs</a>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Info() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <p className={"Info"} onClick={() => setModalShow(true)}>
                *API Info
            </p>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default Info