import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ProfileChangeButtons({
  isEditing,
  onProfileUpdate,
  onCancelProfileChanges,
  onConfirmProfileEdit,
}) {
  return (
    <div className="profile-change-button-div">
      {!isEditing ? (
        <Button variant="primary" onClick={() => onProfileUpdate()}>
          <i className="bi bi-pencil-square"></i>
        </Button>
      ) : (
        <>
          <Button variant="secondary" onClick={() => onCancelProfileChanges()}>
            <i className="bi bi-trash"></i>
          </Button>
          <Button variant="success" onClick={() => onConfirmProfileEdit()}>
            <i className="bi bi-floppy"></i>
          </Button>
        </>
      )}
    </div>
  );
}
