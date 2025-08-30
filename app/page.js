"use client";
import { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoadingIndicator from "@/app/components/loading-indicator";
import Profile from "@/app/components/profile";
import WeightChart from "@/app/components/weight-chart";
import AverageMacrosChart from "@/app/components/average-macros-chart";
import DailyMacrosChart from "@/app/components/daily-macros-chart";
import DateChanger from "@/app/components/date-changer";
import UpdateUserButtons from "@/app/components/update-user-buttons";
import MealStack from "@/app/components/meal-stack";
import SearchModal from "@/app/components/search-modal";
import FoodDetailsModal from "@/app/components/food-details-modal";
import FoodEntryTypeModal from "./components/food-entry-type-modal";
import ProfileChangeButtons from "@/app/components/profile-change-buttons";
import "@/app/react-datepicker.css"; // Import default styles
import { addDays } from "date-fns";
import { signIn, signOut, useSession } from "next-auth/react";
import { Router } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "@/lib/user-context";
import NewFoodModal from "./components/new-food-modal";
import MyFoodsModal from "./components/my-foods-modal";
import MyFoodDetailsModal from "@/app/components/my-food-details-modal";

export default function Home() {
  const {
    session,
    status,
    isUnauthenticated,
    isLoading,
    updatedUser,
    initialUser,
    userChanged,
    preference,
    averageMacros,
    pieChartColors,
    screenWidth,
    handleReduceDate,
    selectedDate,
    handleDateChange,
    handleIncreaseDate,
    handleCancelChanges,
    handleSaveChanges,
    previousData,
    indexOfPreviousData,
    handleDeleteFoodItem,
    handleAddFoodItem,
    dailyMacros,
    searchModal,
    handleCloseSearchModal,
    search,
    handleInputChange,
    handleSearch,
    results,
    handlePageChange,
    handleClearSearch,
    searchLoading,
    handleFoodChoice,
    isModalOpen,
    handleCloseModal,
    foodDetailsLoading,
    foodDetails,
    updateServings,
    handleServingsInput,
    handleUpdateServings,
    inputError,
    servings,
    handleAddToMeal,
    handleCancelUserChanges,
    updating,
    weightLossPerWeekKG,
    weightLossPerWeekLBS,
    handleWeightLossPerWeekCancel,
    handleWeightLossPerWeekChange,
    handleWeightLossPerWeekSave,
    weightLossPerWeekChanged,
    activityLevel,
    handleActivityLevelCancel,
    handleActivityLevelChange,
    handleActivityLevelSave,
    activityLevelChanged,
    dailyCalorieGoal,
    bmiKG,
    bmiLBS,
    goalWeightKG,
    goalWeightLBS,
    currentWeightKG,
    currentWeightLBS,
    handleAverageMacroCalculation,
    handleUpdateDailyTotals,
    handleUpdateMealTotals,
    handleFormatDate,
    foodEntry,
    handleFoodLookUp,
    handleCloseFoodEntryModal,
    handleCustomFoodEntry,
    newFood,
    handleCloseNewFoodModal,
    handleSaveToMyFoods,
    caloriesPerServing,
    handleCaloriesInput,
    proteinPerServing,
    handleProteinInput,
    fatPerServing,
    handleFatInput,
    carbohydratesPerServing,
    handleCarbohydratesInput,
    newFoodDescription,
    handleFoodDescriptionInput,
    handleCustomFoodInputCheck,
    foodInputError,
    caloriesInputError,
    proteinInputError,
    fatInputError,
    carbohydrateInputError,
    handleMyFoodsModal,
    handleCloseMyFoodsModal,
    myFoods,
    handleMyFoodChoice,
    isMyFoodDetailsModalOpen,
    handleCloseMyFoodDetailsModal,
  } = useContext(UserContext);

  useEffect(() => {
    // if (status === "unauthenticated") {
    //   signIn();
    // }
    if (
      (session && session.expires > new Date()) ||
      isUnauthenticated ||
      (session === null && status === "unauthenticated")
    ) {
      signIn();
    }
  }, [session]);

  console.log("SESSION:");
  console.log(session);
  console.log("STATUS:");
  console.log(status);
  console.log(isUnauthenticated);

  return (
    <>
      <div className="homepage-div">
        {(session && session.expires > new Date()) || isUnauthenticated ? (
          <div style={{ display: "flex" }}>
            <Button
              variant="success"
              onClick={() => {
                signIn();
              }}
            >
              Sign In
            </Button>
          </div>
        ) : isLoading || updating ? (
          <LoadingIndicator />
        ) : updatedUser.email ? (
          <>
            <Profile
              userData={updatedUser}
              preference={preference}
              weightLossPerWeekKG={weightLossPerWeekKG}
              weightLossPerWeekLBS={weightLossPerWeekLBS}
              onWeightLossPerWeekChange={handleWeightLossPerWeekChange}
              onWeightLossPerWeekSave={handleWeightLossPerWeekSave}
              onWeightLossPerWeekCancel={handleWeightLossPerWeekCancel}
              weightLossPerWeekChanged={weightLossPerWeekChanged}
              activityLevel={activityLevel}
              onActivityLevelChange={handleActivityLevelChange}
              onActivityLevelSave={handleActivityLevelSave}
              onActivityLevelCancel={handleActivityLevelCancel}
              activityLevelChanged={activityLevelChanged}
              dailyCalorieGoal={dailyCalorieGoal}
              bmiKG={bmiKG}
              bmiLBS={bmiLBS}
              goalWeightKG={goalWeightKG}
              goalWeightLBS={goalWeightLBS}
              currentWeightKG={currentWeightKG}
              currentWeightLBS={currentWeightLBS}
            />
            <div style={{ width: "100%" }}>
              {updatedUser.days.length ? (
                <Row>
                  <Col>
                    {/* <WeightChart userData={updatedUser} /> */}
                    {averageMacros ? (
                      <div
                        style={{
                          width: "100%",
                          height:
                            screenWidth <= 275
                              ? 300
                              : screenWidth <= 366
                              ? screenWidth * 1
                              : screenWidth <= 480
                              ? screenWidth * 0.9
                              : 400,
                        }}
                      >
                        <AverageMacrosChart
                          averageMacros={averageMacros}
                          pieChartColors={pieChartColors}
                          screenWidth={screenWidth}
                        />
                      </div>
                    ) : null}
                  </Col>
                  {dailyMacros ? (
                    <Col xs={12} sm={6}>
                      {/* {averageMacros ? (
                      <div
                        style={{
                          width: "100%",
                          height:
                            screenWidth <= 275
                              ? 300
                              : screenWidth <= 366
                              ? screenWidth * 1
                              : screenWidth <= 480
                              ? screenWidth * 0.9
                              : 400,
                        }}
                      >
                        <AverageMacrosChart
                          averageMacros={averageMacros}
                          pieChartColors={pieChartColors}
                          screenWidth={screenWidth}
                        />
                      </div>
                    ) : null} */}

                      <div
                        className="flex justify-center"
                        style={{
                          width: "100%",
                          height:
                            screenWidth <= 275
                              ? 300
                              : screenWidth <= 366
                              ? screenWidth * 1
                              : screenWidth <= 480
                              ? screenWidth * 0.9
                              : 400,
                        }}
                      >
                        <DailyMacrosChart
                          dailyMacros={dailyMacros}
                          pieChartColors={pieChartColors}
                          screenWidth={screenWidth}
                        />
                      </div>
                    </Col>
                  ) : null}
                </Row>
              ) : null}
            </div>
            <div className="date-select-div">
              <DateChanger
                onReduceDate={handleReduceDate}
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                onIncreaseDate={handleIncreaseDate}
              />
            </div>
            <div className="meal-div">
              {userChanged ? (
                <UpdateUserButtons
                  onCancelChanges={handleCancelUserChanges}
                  onSaveChanges={handleSaveChanges}
                />
              ) : null}
              <MealStack
                meal="breakfast"
                previousData={previousData}
                indexOfPreviousData={indexOfPreviousData}
                userData={updatedUser}
                onDeleteFoodItem={handleDeleteFoodItem}
                onAddFoodItem={handleAddFoodItem}
              />
              <MealStack
                meal="lunch"
                previousData={previousData}
                indexOfPreviousData={indexOfPreviousData}
                userData={updatedUser}
                onDeleteFoodItem={handleDeleteFoodItem}
                onAddFoodItem={handleAddFoodItem}
              />
              <MealStack
                meal="dinner"
                previousData={previousData}
                indexOfPreviousData={indexOfPreviousData}
                userData={updatedUser}
                onDeleteFoodItem={handleDeleteFoodItem}
                onAddFoodItem={handleAddFoodItem}
              />
              <MealStack
                meal="snacks"
                previousData={previousData}
                indexOfPreviousData={indexOfPreviousData}
                userData={updatedUser}
                onDeleteFoodItem={handleDeleteFoodItem}
                onAddFoodItem={handleAddFoodItem}
              />
              <Stack direction="horizontal" gap={3}>
                <div className="p-2 me-auto meal">Totals</div>
                <div className="p-2"></div>
              </Stack>
              {previousData &&
              updatedUser.days[indexOfPreviousData].totals.calories ? (
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
                      <th>{`Protein (g)`}</th>
                      <th>{`Fat (g)`}</th>
                      <th>{`Carbohydrates (g)`}</th>
                      <th>{`Calories (kcal)`}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key="Total Protein">
                      <td className="align-middle">
                        {updatedUser.days[
                          indexOfPreviousData
                        ].totals.protein.toFixed(2)}
                      </td>
                      <td className="align-middle">
                        {updatedUser.days[
                          indexOfPreviousData
                        ].totals.fat.toFixed(2)}
                      </td>
                      <td className="align-middle">
                        {updatedUser.days[
                          indexOfPreviousData
                        ].totals.carbohydrates.toFixed(2)}
                      </td>
                      <td className="align-middle">
                        {updatedUser.days[
                          indexOfPreviousData
                        ].totals.calories.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              ) : null}
            </div>
            {/* {dailyMacros ? (
              <div
                className="flex justify-center"
                style={{
                  width: "100%",
                  height:
                    screenWidth <= 275
                      ? 300
                      : screenWidth <= 366
                      ? screenWidth * 1
                      : screenWidth <= 480
                      ? screenWidth * 0.9
                      : 400,
                }}
              >
                <DailyMacrosChart
                  dailyMacros={dailyMacros}
                  pieChartColors={pieChartColors}
                  screenWidth={screenWidth}
                />
              </div>
            ) : null} */}
            <SearchModal
              searchModal={searchModal}
              onCloseSearchModal={handleCloseSearchModal}
              search={search}
              onInputChange={handleInputChange}
              onSearch={handleSearch}
              results={results}
              onPageChange={handlePageChange}
              onClearSearch={handleClearSearch}
              searchLoading={searchLoading}
              onFoodChoice={handleFoodChoice}
            />
            <FoodDetailsModal
              isModalOpen={isModalOpen}
              onCloseModal={handleCloseModal}
              onCloseSearchModal={handleCloseSearchModal}
              onCloseFoodEntryModal={handleCloseFoodEntryModal}
              foodDetailsLoading={foodDetailsLoading}
              foodDetails={foodDetails}
              updateServings={updateServings}
              onServingsInput={handleServingsInput}
              onUpdateServings={handleUpdateServings}
              inputError={inputError}
              servings={servings}
              onAddToMeal={handleAddToMeal}
            />
            <FoodEntryTypeModal
              foodEntry={foodEntry}
              customFoods={initialUser.myFoods ? initialUser.myFoods : []}
              onCloseFoodEntryModal={handleCloseFoodEntryModal}
              onCustomFoodEntry={handleCustomFoodEntry}
              onFoodLookup={handleFoodLookUp}
              onMyFoodsModal={handleMyFoodsModal}
              onCloseMyFoodsModal={handleCloseMyFoodsModal}
            />
            <NewFoodModal
              newFood={newFood}
              onCloseNewFoodModal={handleCloseNewFoodModal}
              onCloseFoodEntryModal={handleCloseFoodEntryModal}
              updateServings={updateServings}
              onServingsInput={handleServingsInput}
              inputError={inputError}
              servings={servings}
              onAddToMeal={handleAddToMeal}
              onSaveToMyFoods={handleSaveToMyFoods}
              caloriesPerServing={caloriesPerServing}
              onCaloriesInput={handleCaloriesInput}
              proteinPerServing={proteinPerServing}
              onProteinInput={handleProteinInput}
              fatPerServing={fatPerServing}
              onFatInput={handleFatInput}
              carbohydratesPerServing={carbohydratesPerServing}
              onCarbohydratesInput={handleCarbohydratesInput}
              newFoodDescription={newFoodDescription}
              onFoodDescriptionInput={handleFoodDescriptionInput}
              onCustomFoodInputCheck={handleCustomFoodInputCheck}
              foodInputError={foodInputError}
              caloriesInputError={caloriesInputError}
              proteinInputError={proteinInputError}
              fatInputError={fatInputError}
              carbohydrateInputError={carbohydrateInputError}
            />
            <MyFoodsModal
              myFoods={myFoods}
              customFoods={initialUser.myFoods ? initialUser.myFoods : []}
              onCloseMyFoodsModal={handleCloseMyFoodsModal}
              onMyFoodChoice={handleMyFoodChoice}
            />
            <MyFoodDetailsModal
              isMyFoodDetailsModalOpen={isMyFoodDetailsModalOpen}
              onCloseMyFoodDetailsModal={handleCloseMyFoodDetailsModal}
              onCloseMyFoodsModal={handleCloseMyFoodsModal}
              onCloseFoodEntryModal={handleCloseFoodEntryModal}
              foodDetails={foodDetails}
              updateServings={updateServings}
              onServingsInput={handleServingsInput}
              onUpdateServings={handleUpdateServings}
              inputError={inputError}
              servings={servings}
              onAddToMeal={handleAddToMeal}
            />
          </>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    </>
  );
}
