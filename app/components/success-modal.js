import { Modal } from "react-bootstrap";

export default function SuccessModal({ success }) {
  return (
    <Modal show={success} centered>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <h2 style={{ color: "white" }}>
            SUCCESS{" "}
            <i className="bi bi-check-lg" style={{ color: "green" }}></i>
          </h2>
        </div>
      </Modal.Body>
    </Modal>
  );
}
