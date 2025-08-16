import { Modal, Table, Button } from "react-bootstrap";
import LoadingIndicator from "@/app/components/loading-indicator";

export default function MyFoodsModal({
  myFoods,
  customFoods,
  onCloseMyFoodsModal,
  onMyFoodChoice,
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
                    <th>Calories (kcal)</th>
                    <th>Protein (g)</th>
                    <th>Fat (g)</th>
                    <th>Carbohydrates (g)</th>
                  </tr>
                </thead>
                <tbody className="scrollable-table-body">
                  {customFoods.map((foodItem, index) => {
                    return (
                      <tr
                        key={`${foodItem.fdcId} + ${index}`}
                        accessKey={foodItem.fdcId}
                        onClick={(e) => {
                          onMyFoodChoice(e);
                        }}
                      >
                        <td accessKey={foodItem.fdcId}>
                          {foodItem.description}
                        </td>
                        <td accessKey={foodItem.fdcId}>
                          {foodItem.calories.amountPerServing}
                        </td>
                        <td accessKey={foodItem.fdcId}>
                          {foodItem.protein.amountPerServing}
                        </td>

                        <td accessKey={foodItem.fdcId}>
                          {foodItem.fat.amountPerServing}
                        </td>

                        <td accessKey={foodItem.fdcId}>
                          {foodItem.carbohydrates.amountPerServing}
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
