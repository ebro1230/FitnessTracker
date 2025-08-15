import { Modal, Table, Button } from "react-bootstrap";
import LoadingIndicator from "@/app/components/loading-indicator";

export default function FoodDetailsModal({
  isModalOpen,
  onCloseModal,
  onCloseSearchModal,
  onCloseFoodEntryModal,
  foodDetailsLoading,
  foodDetails,
  updateServings,
  onServingsInput,
  onUpdateServings,
  inputError,
  servings,
  onAddToMeal,
}) {
  return (
    <>
      {isModalOpen ? (
        <Modal
          show={isModalOpen}
          onHide={() => onCloseModal()}
          centered
          size="lg"
        >
          {foodDetailsLoading ? (
            <div style={{ background: "black" }}>
              <LoadingIndicator />
            </div>
          ) : (
            <>
              <Modal.Header closeButton>
                <Modal.Title className="food-details-header-text">
                  {foodDetails.description}
                </Modal.Title>
                <div className="servings-input-div">
                  <input
                    value={updateServings}
                    placeholder="# of Servings"
                    onChange={(e) => {
                      onServingsInput(e);
                    }}
                    className="number-of-servings-input"
                  />
                  {inputError.length ? (
                    <p className="number-of-servings-input-error">
                      {inputError}
                    </p>
                  ) : null}
                </div>
                {/* <Button
                  variant="primary"
                  onClick={() => onUpdateServings()}
                  className="update-servings-button"
                >
                  Update # of Servings
                </Button> */}
              </Modal.Header>
              <Modal.Body>
                <Table
                  striped
                  bordered
                  hover
                  size="sm"
                  variant="dark"
                  responsive
                >
                  <thead>
                    <tr>
                      <th>Nutrient</th>
                      <th>Amount Per Serving</th>
                      <th>{`Total Amount for ${servings} Serving(s)`}</th>
                    </tr>
                  </thead>
                  <tbody className="scrollable-table-body">
                    <tr key={foodDetails.calories.number}>
                      <td>Calories {`(${foodDetails.calories.unit})`}</td>
                      <td>
                        {foodDetails.calories.amountPerServing > 0
                          ? foodDetails.calories.amountPerServing.toFixed(2)
                          : foodDetails.calories.amountPerServing}
                      </td>
                      <td>
                        {foodDetails.calories.amountPerServing * servings > 0
                          ? (
                              foodDetails.calories.amountPerServing * servings
                            ).toFixed(2)
                          : foodDetails.calories.amountPerServing * servings}
                      </td>
                    </tr>
                    <tr key={foodDetails.protein.number}>
                      <td>Protein {`(${foodDetails.protein.unit})`}</td>
                      <td>
                        {foodDetails.protein.amountPerServing > 0
                          ? foodDetails.protein.amountPerServing.toFixed(2)
                          : foodDetails.protein.amountPerServing}
                      </td>
                      <td>
                        {foodDetails.protein.amountPerServing * servings > 0
                          ? (
                              foodDetails.protein.amountPerServing * servings
                            ).toFixed(2)
                          : foodDetails.protein.amountPerServing * servings}
                      </td>
                    </tr>
                    <tr key={foodDetails.fat.number}>
                      <td>Total Fat {`(${foodDetails.fat.unit})`}</td>
                      <td>
                        {foodDetails.fat.amountPerServing > 0
                          ? foodDetails.fat.amountPerServing.toFixed(2)
                          : foodDetails.fat.amountPerServing}
                      </td>
                      <td>
                        {foodDetails.fat.amountPerServing * servings > 0
                          ? (
                              foodDetails.fat.amountPerServing * servings
                            ).toFixed(2)
                          : foodDetails.fat.amountPerServing * servings}
                      </td>
                    </tr>
                    <tr key={foodDetails.carbohydrates.number}>
                      <td>
                        Carbohydrates {`(${foodDetails.carbohydrates.unit})`}
                      </td>
                      <td>
                        {foodDetails.carbohydrates.amountPerServing > 0
                          ? foodDetails.carbohydrates.amountPerServing.toFixed(
                              2
                            )
                          : foodDetails.carbohydrates.amountPerServing}
                      </td>
                      <td>
                        {foodDetails.carbohydrates.amountPerServing * servings >
                        0
                          ? (
                              foodDetails.carbohydrates.amountPerServing *
                              servings
                            ).toFixed(2)
                          : foodDetails.carbohydrates.amountPerServing *
                            servings}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <div className="modal-footer-div">
                  <div>
                    <p style={{ fontSize: "0.6rem" }}>
                      {foodDetails.ingredients}
                    </p>
                  </div>
                  <div className="modal-button-div">
                    <Button
                      size="sm"
                      className="modal-button"
                      variant="danger"
                      onClick={() => onCloseModal()}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="modal-button"
                      variant="primary"
                      onClick={() => {
                        onAddToMeal(false);
                        onCloseModal();
                        onCloseSearchModal();
                        onCloseFoodEntryModal();
                      }}
                    >
                      Add to Meal & Close
                    </Button>
                    <Button
                      size="sm"
                      className="modal-button"
                      variant="success"
                      onClick={() => {
                        onAddToMeal(false);
                        onCloseModal();
                      }}
                    >
                      Add to Meal & Add Another Food Item
                    </Button>
                  </div>
                </div>
              </Modal.Footer>
            </>
          )}
        </Modal>
      ) : null}
    </>
  );
}
