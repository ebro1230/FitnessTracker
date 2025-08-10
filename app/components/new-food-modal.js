import { Modal, Table, Button } from "react-bootstrap";

export default function NewFoodModal({
  newFood,
  onCloseNewFoodModal,
  onCloseFoodEntryModal,
  updateServings,
  onServingsInput,
  inputError,
  servings,
  onAddToMeal,
  onSaveToMyFoods,
  caloriesPerServing,
  onCaloriesInput,
  proteinPerServing,
  onProteinInput,
  fatPerServing,
  onFatInput,
  carbohydratesPerServing,
  onCarbohydratesInput,
}) {
  return (
    <>
      {newFood ? (
        <Modal
          show={newFood}
          onHide={() => onCloseNewFoodModal()}
          centered
          size="lg"
        >
          <>
            <Modal.Header closeButton>
              <Modal.Title className="food-details-header-text">
                New Food
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
                  <p className="number-of-servings-input-error">{inputError}</p>
                ) : null}
              </div>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover size="sm" variant="dark" responsive>
                <thead>
                  <tr>
                    <th>Nutrient</th>
                    <th>Amount Per Serving</th>
                    <th>{`Total Amount for ${servings} Serving(s)`}</th>
                  </tr>
                </thead>
                <tbody className="scrollable-table-body">
                  <tr key={208}>
                    <td>Calories {`(kcal)`}</td>
                    <td>
                      <input
                        value={caloriesPerServing}
                        placeholder="# of Calories per Serving"
                        onChange={(e) => {
                          onCaloriesInput(e);
                        }}
                        className="number-of-servings-input"
                      />
                      {inputError.length ? (
                        <p className="number-of-servings-input-error">
                          {inputError}
                        </p>
                      ) : null}
                    </td>
                    <td>
                      {caloriesPerServing * servings > 0
                        ? (caloriesPerServing * servings).toFixed(2)
                        : "TBD"}
                    </td>
                  </tr>
                  <tr key={203}>
                    <td>Protein {`(g)`}</td>
                    <td>
                      <input
                        value={proteinPerServing}
                        placeholder="grams of Protein per Serving"
                        onChange={(e) => {
                          onProteinInput(e);
                        }}
                        className="number-of-servings-input"
                      />
                      {inputError.length ? (
                        <p className="number-of-servings-input-error">
                          {inputError}
                        </p>
                      ) : null}
                    </td>
                    <td>
                      {proteinPerServing * servings > 0
                        ? (proteinPerServing * servings).toFixed(2)
                        : "TBD"}
                    </td>
                  </tr>
                  <tr key={204}>
                    <td>Fat {`(g)`}</td>
                    <td>
                      <input
                        value={fatPerServing}
                        placeholder="grams of Fat per Serving"
                        onChange={(e) => {
                          onFatInput(e);
                        }}
                        className="number-of-servings-input"
                      />
                      {inputError.length ? (
                        <p className="number-of-servings-input-error">
                          {inputError}
                        </p>
                      ) : null}
                    </td>
                    <td>
                      {fatPerServing * servings > 0
                        ? (fatPerServing * servings).toFixed(2)
                        : "TBD"}
                    </td>
                  </tr>
                  <tr key={205}>
                    <td>Carbohydrates {`(g)`}</td>
                    <td>
                      <input
                        value={carbohydratesPerServing}
                        placeholder="grams of Carbohydrates per Serving"
                        onChange={(e) => {
                          onCarbohydratesInput(e);
                        }}
                        className="number-of-servings-input"
                      />
                      {inputError.length ? (
                        <p className="number-of-servings-input-error">
                          {inputError}
                        </p>
                      ) : null}
                    </td>
                    <td>
                      {carbohydratesPerServing * servings > 0
                        ? (carbohydratesPerServing * servings).toFixed(2)
                        : "TBD"}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <div className="modal-footer-div">
                <div className="modal-button-div">
                  <Button
                    size="sm"
                    className="modal-button"
                    variant="danger"
                    onClick={() => {
                      onCloseNewFoodModal();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="modal-button"
                    variant="primary"
                    onClick={() => {
                      onAddToMeal();
                      onCloseNewFoodModal();
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
                      onAddToMeal();
                      onSaveToMyFoods();
                      onCloseNewFoodModal();
                      onCloseFoodEntryModal();
                    }}
                  >
                    Add to Meal & Save to My Foods
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </>
        </Modal>
      ) : null}
    </>
  );
}
