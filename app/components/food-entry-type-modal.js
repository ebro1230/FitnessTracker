import { Modal, Table, Button } from "react-bootstrap";
import LoadingIndicator from "@/app/components/loading-indicator";

export default function FoodEntryTypeModal({
  foodEntry,
  onCloseFoodEntryModal,
  onFoodLookup,
  onCustomFoodEntry,
}) {
  return (
    <Modal
      show={foodEntry}
      onHide={() => onCloseFoodEntryModal()}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="search-modal-title">
          Food Entry Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-button-div">
          <Button
            size="sm"
            className="modal-button"
            variant="primary"
            onClick={() => {
              onFoodLookup();
            }}
          >
            Food Lookup
          </Button>
          <Button
            size="sm"
            className="modal-button"
            variant="primary"
            onClick={() => {
              onCustomFoodEntry();
            }}
          >
            Custom Food Entry
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
