import { Modal, Table, Button } from "react-bootstrap";
import LoadingIndicator from "@/app/components/loading-indicator";

export default function FoodEntryTypeModal({
  foodEntry,
  onCloseFoodEntryModal,
  onFoodLookup,
  onCustomFoodEntry,
  customFoods,
  onMyFoodsModal,
}) {
  return (
    <Modal
      show={foodEntry}
      onHide={() => onCloseFoodEntryModal()}
      centered
      dialogClassName="fit-content-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="food-entry-modal-title">
          Food Entry Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {customFoods.length ? (
            <Button
              size="sm"
              className="modal-button"
              variant="primary"
              onClick={() => {
                onMyFoodsModal();
              }}
            >
              My Foods
            </Button>
          ) : null}
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
