import { Modal, Table, Button } from "react-bootstrap";
import LoadingIndicator from "@/app/components/loading-indicator";

export default function MyFoodsModal({
  myFoods,
  customFoods,
  onCloseMyFoodsModal,
  onFoodChoice,
}) {
  return (
    <Modal
      show={myFoods}
      onHide={() => onCloseMyFoodsModal()}
      size="xl"
      centered
      dialogClassName="fit-content-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="food-entry-modal-title">My Foods</Modal.Title>
      </Modal.Header>
      {customFoods.length ? (
        <>
          <Modal.Body>
            <div className="results-table-div">
              <Table striped bordered hover size="sm" variant="dark" responsive>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Brand Name</th>
                    <th>Brand Owner</th>
                    <th>Serving Size</th>
                    <th>Package Size</th>
                  </tr>
                </thead>
                <tbody className="scrollable-table-body">
                  {customFoods.map((foodItem, index) => {
                    return (
                      <tr
                        key={`${foodItem.fdcId} + ${index}`}
                        accessKey={foodItem.fdcId}
                        onClick={(e) => onFoodChoice(e)}
                      >
                        <td accessKey={foodItem.fdcId}>
                          {foodItem.description}
                        </td>
                        <td accessKey={foodItem.fdcId}>{foodItem.brandName}</td>
                        <td accessKey={foodItem.fdcId}>
                          {foodItem.brandOwner}
                        </td>
                        {foodItem.householdServingFullText ? (
                          <td accessKey={foodItem.fdcId}>
                            {foodItem.householdServingFullText}{" "}
                          </td>
                        ) : (
                          <td accessKey={foodItem.fdcId}>
                            {foodItem.servingSize}
                            {foodItem.servingSizeUnit}
                          </td>
                        )}
                        <td accessKey={foodItem.fdcId}>
                          {foodItem.packageWeight}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </>
      ) : (
        <Modal.Body>
          <div className="blank-results-table-div">
            <h1>MY FOODS IS CURRENTLY EMPTY</h1>
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
}
