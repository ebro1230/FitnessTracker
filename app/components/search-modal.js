import { Modal, Table, Button } from "react-bootstrap";
import LoadingIndicator from "@/app/components/loading-indicator";

export default function SearchModal({
  searchModal,
  onCloseSearchModal,
  search,
  onInputChange,
  onSearch,
  results,
  onPageChange,
  onClearSearch,
  searchLoading,
  onFoodChoice,
}) {
  console.log("RESULTS");
  console.log(results);
  return (
    <Modal
      show={searchModal}
      onHide={() => onCloseSearchModal()}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="search-modal-title">Food Lookup</Modal.Title>
        <div className="search-div">
          <input
            value={search}
            onChange={(e) => {
              onInputChange(e);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch(search);
              }
            }}
            className="food-search-input"
          />
          <div className="search-buttons-div">
            <Button
              variant="primary"
              onClick={() => {
                onSearch(search);
              }}
              className="search-button"
            >
              Search
            </Button>
          </div>
        </div>
      </Modal.Header>
      {searchLoading ? (
        <>
          <Modal.Body>
            <div className="blank-results-table-div">
              <LoadingIndicator />
            </div>
          </Modal.Body>
        </>
      ) : results.foods.length ? (
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
                  {results.foods.map((foodItem, index) => {
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
              <div className="page-list-div">
                {results.pageList.includes(1) ? null : (
                  <>
                    <Button
                      variant="secondary"
                      key={1}
                      value={1}
                      onClick={(e) => onPageChange(e)}
                      disabled={results.currentPage === 1}
                    >
                      1
                    </Button>
                    <p
                      style={{
                        color: "white",
                        margin: "0rem",
                        marginTop: "1rem",
                      }}
                    >
                      <i className="bi bi-three-dots"></i>
                    </p>
                  </>
                )}

                {results.pageList.map((page) => {
                  return (
                    <Button
                      variant="secondary"
                      key={page}
                      value={page}
                      onClick={(e) => onPageChange(e)}
                      disabled={results.currentPage === page}
                    >
                      {page}
                    </Button>
                  );
                })}
                {results.pageList.includes(results.totalPages) ? null : (
                  <>
                    <p
                      style={{
                        color: "white",
                        margin: "0rem",
                        marginTop: "1rem",
                      }}
                    >
                      <i className="bi bi-three-dots"></i>
                    </p>
                    <Button
                      variant="secondary"
                      key={results.totalPages}
                      value={results.totalPages}
                      onClick={(e) => onPageChange(e)}
                    >
                      {results.totalPages}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => onClearSearch()}
              className="clear-search-button"
            >
              Clear Results
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <Modal.Body>
          <div className="blank-results-table-div">
            <h1>PLEASE LOOKUP A FOOD ITEM</h1>
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
}
