import { Stack, Button, Table } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function MealStack({
  meal,
  previousData,
  indexOfPreviousData,
  userData,
  onDeleteFoodItem,
  onAddFoodItem,
}) {
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2 me-auto meal">
          {meal.charAt(0).toUpperCase() + meal.slice(1)}
        </div>
        <div className="add-food-button">
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              onAddFoodItem(meal);
            }}
          >
            <i className="bi bi-plus"></i>
          </Button>
        </div>
      </Stack>
      {previousData &&
      userData.days[indexOfPreviousData][meal].foodItems.length ? (
        <Stack direction="horizontal" gap={3}>
          <Table
            striped
            bordered
            hover
            size="sm"
            variant="dark"
            responsive
            className="meal-table"
          >
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Servings Eaten</th>
                <th>{`Protein (g)`}</th>
                <th>{`Fat (g)`}</th>
                <th>{`Carbohydrates (g)`}</th>
                <th>{`Calories (kcal)`}</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {userData.days[indexOfPreviousData][meal].foodItems.map(
                (foodItem, index) => {
                  return (
                    <>
                      <tr key={`${foodItem.fdcId} + ${index}`}>
                        <td className="align-middle">{foodItem.description}</td>
                        <td className="align-middle">
                          {foodItem.calories.servings}
                        </td>
                        <td className="align-middle">
                          {foodItem.protein.amountEaten.toFixed(2)}
                        </td>
                        <td className="align-middle">
                          {foodItem.fat.amountEaten.toFixed(2)}
                        </td>
                        <td className="align-middle">
                          {foodItem.carbohydrates.amountEaten.toFixed(2)}
                        </td>
                        <td className="align-middle">
                          {foodItem.calories.amountEaten.toFixed(2)}
                        </td>
                        {/* <td className="align-middle">
                        <Button
                        size="sm"
                        variant="danger"
                        id={index}
                        title={meal}
                        onClick={(e) => onDeleteFoodItem(e)}
                      >
                        <i id={index} title={meal} className="bi bi-trash"></i>
                      </Button>
                      </td> */}
                      </tr>
                    </>
                  );
                }
              )}
            </tbody>
            {userData.days[indexOfPreviousData][meal].foodItems.map(
              (foodItem, index) => {
                return (
                  <Button
                    size="sm"
                    variant="danger"
                    id={`delete-button-${index}`}
                    title={meal}
                    onClick={(e) => onDeleteFoodItem(e)}
                  >
                    <i title={meal} className="bi bi-trash"></i>
                  </Button>
                );
              }
            )}
          </Table>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {userData.days[indexOfPreviousData][meal].foodItems.map(
              (foodItem, index) => {
                return (
                  <Button
                    size="sm"
                    variant="danger"
                    id={`delete-button-${index}`}
                    title={meal}
                    onClick={(e) => onDeleteFoodItem(e)}
                  >
                    <i title={meal} className="bi bi-trash"></i>
                  </Button>
                );
              }
            )}
          </div>
        </Stack>
      ) : null}
    </>
  );
}
