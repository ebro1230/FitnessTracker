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
import ProfileChangeButtons from "@/app/components/profile-change-buttons";
import "@/app/react-datepicker.css"; // Import default styles
import { addDays } from "date-fns";
import { signIn, signOut, useSession } from "next-auth/react";
import { Router } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "@/lib/user-context";

export default function Home() {
  // const [search, setSearch] = useState("");
  // const [currentSearch, setCurrentSearch] = useState("");
  // const [page, setPage] = useState(1);
  // const [results, setResults] = useState({ foods: [] });
  // const [foodDetails, setFoodDetails] = useState([]);
  // const [searchLoading, setSearchLoading] = useState(false);
  // const [foodDetailsLoading, setFoodDetailsLoading] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [searchModal, setSearchModal] = useState(false);
  // const [servings, setServings] = useState(1);
  // const [updateServings, setUpdateServings] = useState("");
  // const [inputError, setInputError] = useState("");
  // const [selectedDate, setSelectedDate] = useState("");
  // const [selectedDateFormatted, setSelectedDateFormatted] = useState("");
  // const [previousData, setPreviousData] = useState(false);
  // const [indexOfPreviousData, setIndexOfPreviousData] = useState();
  // const [currentMeal, setCurrentMeal] = useState("");
  // const [dailyMacros, setDailyMacros] = useState("");
  // const [averageMacros, setAverageMacros] = useState("");
  // const [screenWidth, setScreenWidth] = useState(0);
  // const [userChanged, setUserChanged] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  // const [initialUser, setInitialUser] = useState("");
  // const [updatedUser, setUpdatedUser] = useState("");
  // const [given_name, setGiven_name] = useState("");
  // const [family_name, setFamily_name] = useState("");
  // const [age, setAge] = useState("");
  // const [currentWeight, setCurrentWeight] = useState("");
  // const [goalWeight, setGoalWeight] = useState("");
  // const [nameError, setNameError] = useState("");
  // const [ageError, setAgeError] = useState("");
  // const [currentWeightError, setCurrentWeightError] = useState("");
  // const [goalWeightError, setGoalWeightError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [isUnauthenticated, setIsUnauthenticated] = useState(false);
  // const { data: session, status } = useSession();

  // const numberCheck = /^(\d+(\.\d+)?|\.\d+|\d+\/\d+)$/;
  // const textCheck = /^[a-zA-Z]+$/;
  // const ageCheck = /^(1[89]|[2-9][0-9])$/;
  // const weightCheck =
  //   /^(40(?:\.\d)?|4[1-9](?:\.\d)?|[5-9]\d(?:\.\d)?|[1-4]\d{2}(?:\.\d)?|500(?:\.0)?)$/;

  // const pieChartColors = ["#0088FE", "#00C49F", "#FFBB28"];

  // const handleConfirmProfileEdit = () => {
  //   //checks to make sure each name only contains characters
  //   if (!textCheck.test(given_name) || !textCheck.test(family_name)) {
  //     setNameError("Please only use characters when entering your name");
  //   } else {
  //     setNameError("");
  //   }
  //   //checks to make sure the age is a whole number between 1 & 99
  //   if (!ageCheck.test(age)) {
  //     setAgeError(
  //       "Please enter whole numbers between 18 & 99 when entering your age"
  //     );
  //   } else {
  //     setAgeError("");
  //   }
  //   //checks to make sure the current weight is a positive number with up to 1 decimal place
  //   if (!weightCheck.test(currentWeight)) {
  //     setCurrentWeightError(
  //       "Please enter a number between 40 & 500 with up to 1 decimal place"
  //     );
  //   } else {
  //     setCurrentWeightError("");
  //   }
  //   //checks to make sure the goal weight is a positive number with up to 1 decimal place
  //   if (!weightCheck.test(goalWeight)) {
  //     setGoalWeightError(
  //       "Please enter a number between 0 & 500 with up to 1 decimal place"
  //     );
  //   } else {
  //     setGoalWeightError("");
  //   }
  //   if (
  //     textCheck.test(given_name) &&
  //     textCheck.test(family_name) &&
  //     ageCheck.test(age) &&
  //     weightCheck.test(currentWeight) &&
  //     weightCheck.test(goalWeight)
  //   ) {
  //     //checks if the date already exists in the user object
  //     if (updatedUser.days.some((day) => day.date === selectedDateFormatted)) {
  //       fetch(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getUser/${session.user.id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             ...initialUser,
  //             given_name: given_name,
  //             family_name: family_name,
  //             age: Number(age),
  //             currentWeightKG: Number(currentWeight),
  //             goalWeightKG: Number(goalWeight),
  //             days: initialUser.days.map((day) => {
  //               return day.date === selectedDateFormatted
  //                 ? { ...day, weight: currentWeight, goalWeight: goalWeight }
  //                 : day;
  //             }),
  //           }),
  //         }
  //       )
  //         .then((response) => {
  //           if (response.status === 201) {
  //             return response.json(); // Parse response if status is 201
  //           } else if (response.status === 400) {
  //             throw new Error("Editing User Data Failed, Please Try Again"); // Handle 400 error
  //           } else {
  //             throw new Error(`Unexpected status: ${response.status}`);
  //           }
  //         }) // Parse JSON response
  //         .then((data) => {
  //           setInitialUser(data);
  //           setUpdatedUser(data);
  //           setIsEditing(false);
  //         }) // Handle data
  //         .catch((error) => {
  //           console.error("Error:", error);
  //           setIsEditing(false);
  //         }); // Handle errors
  //       //adds the current weight and goalweight to the selected date
  //       // setInitialUser((initialUser) => ({
  //       //   ...initialUser,
  //       //   given_name: given_name,
  //       //   family_name: family_name,
  //       //   age: Number(age),
  //       //   currentWeightKG: Number(currentWeight),
  //       //   goalWeightKG: Number(goalWeight),
  //       //   days: initialUser.days.map((day) => {
  //       //     return day.date === selectedDateFormatted
  //       //       ? { ...day, weight: currentWeight, goalWeight: goalWeight }
  //       //       : day;
  //       //   }),
  //       // }));
  //       // setUpdatedUser((updatedUser) => ({
  //       //   ...updatedUser,
  //       //   given_name: given_name,
  //       //   family_name: family_name,
  //       //   age: Number(age),
  //       //   currentWeightKG: Number(currentWeight),
  //       //   goalWeightKG: Number(goalWeight),
  //       //   days: updatedUser.days.map((day) => {
  //       //     return day.date === selectedDateFormatted
  //       //       ? { ...day, weight: currentWeight, goalWeight: goalWeight }
  //       //       : day;
  //       //   }),
  //       // }));
  //     } else {
  //       //creates a new day and adds the current weight and goal weight to the day then sorts the array to make sure they are in date order
  //       fetch(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getUser/${session.user.id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             ...initialUser,
  //             given_name: given_name,
  //             family_name: family_name,
  //             age: Number(age),
  //             currentWeightKG: Number(currentWeight),
  //             goalWeightKG: Number(goalWeight),
  //             days: [
  //               ...initialUser.days,
  //               {
  //                 date: selectedDateFormatted,
  //                 weight: Number(currentWeight),
  //                 goalWeight: Number(goalWeight),
  //                 breakfast: {
  //                   foodItems: [],
  //                   calories: 0,
  //                   carbohydrates: 0,
  //                   protein: 0,
  //                   fat: 0,
  //                   proteinPercentage: 0,
  //                   fatPercentage: 0,
  //                   carbohydratePercentage: 0,
  //                 },
  //                 lunch: {
  //                   foodItems: [],
  //                   calories: 0,
  //                   carbohydrates: 0,
  //                   protein: 0,
  //                   fat: 0,
  //                   proteinPercentage: 0,
  //                   fatPercentage: 0,
  //                   carbohydratePercentage: 0,
  //                 },
  //                 dinner: {
  //                   foodItems: [],
  //                   calories: 0,
  //                   carbohydrates: 0,
  //                   protein: 0,
  //                   fat: 0,
  //                   proteinPercentage: 0,
  //                   fatPercentage: 0,
  //                   carbohydratePercentage: 0,
  //                 },
  //                 snacks: {
  //                   foodItems: [],
  //                   calories: 0,
  //                   carbohydrates: 0,
  //                   protein: 0,
  //                   fat: 0,
  //                   proteinPercentage: 0,
  //                   fatPercentage: 0,
  //                   carbohydratePercentage: 0,
  //                 },
  //                 totals: {
  //                   calories: 0,
  //                   carbohydrates: 0,
  //                   protein: 0,
  //                   fat: 0,
  //                   proteinPercentage: 0,
  //                   fatPercentage: 0,
  //                   carbohydratePercentage: 0,
  //                 },
  //               },
  //             ].sort((a, b) => a.date.localeCompare(b.date)),
  //           }),
  //         }
  //       )
  //         .then((response) => {
  //           if (response.status === 201) {
  //             return response.json(); // Parse response if status is 201
  //           } else if (response.status === 400) {
  //             throw new Error("Editing User Data Failed, Please Try Again"); // Handle 400 error
  //           } else {
  //             throw new Error(`Unexpected status: ${response.status}`);
  //           }
  //         }) // Parse JSON response
  //         .then((data) => {
  //           setInitialUser(data);
  //           setUpdatedUser(data);
  //           setIsEditing(false);
  //         }) // Handle data
  //         .catch((error) => {
  //           console.error("Error:", error);
  //         }); // Handle errors

  //       // setInitialUser((initialUser) => ({
  //       //   ...initialUser,
  //       //   given_name: given_name,
  //       //   family_name: family_name,
  //       //   age: Number(age),
  //       //   currentWeightKG: Number(currentWeight),
  //       //   goalWeightKG: Number(goalWeight),
  //       //   days: [
  //       //     ...initialUser.days,
  //       //     {
  //       //       date: selectedDateFormatted,
  //       //       weight: Number(currentWeight),
  //       //       goalWeight: Number(goalWeight),
  //       //       breakfast: {
  //       //         foodItems: [],
  //       //         calories: 0,
  //       //         carbohydrates: 0,
  //       //         protein: 0,
  //       //         fat: 0,
  //       //         proteinPercentage: 0,
  //       //         fatPercentage: 0,
  //       //         carbohydratePercentage: 0,
  //       //       },
  //       //       lunch: {
  //       //         foodItems: [],
  //       //         calories: 0,
  //       //         carbohydrates: 0,
  //       //         protein: 0,
  //       //         fat: 0,
  //       //         proteinPercentage: 0,
  //       //         fatPercentage: 0,
  //       //         carbohydratePercentage: 0,
  //       //       },
  //       //       dinner: {
  //       //         foodItems: [],
  //       //         calories: 0,
  //       //         carbohydrates: 0,
  //       //         protein: 0,
  //       //         fat: 0,
  //       //         proteinPercentage: 0,
  //       //         fatPercentage: 0,
  //       //         carbohydratePercentage: 0,
  //       //       },
  //       //       snacks: {
  //       //         foodItems: [],
  //       //         calories: 0,
  //       //         carbohydrates: 0,
  //       //         protein: 0,
  //       //         fat: 0,
  //       //         proteinPercentage: 0,
  //       //         fatPercentage: 0,
  //       //         carbohydratePercentage: 0,
  //       //       },
  //       //       totals: {
  //       //         calories: 0,
  //       //         carbohydrates: 0,
  //       //         protein: 0,
  //       //         fat: 0,
  //       //         proteinPercentage: 0,
  //       //         fatPercentage: 0,
  //       //         carbohydratePercentage: 0,
  //       //       },
  //       //     },
  //       //   ].sort((a, b) => a.date.localeCompare(b.date)),
  //       // }));
  //       // setUpdatedUser((updatedUser) => ({
  //       //   ...updatedUser,
  //       //   given_name: given_name,
  //       //   family_name: family_name,
  //       //   age: Number(age),
  //       //   currentWeightKG: Number(currentWeight),
  //       //   goalWeightKG: Number(goalWeight),
  //       //   days: [
  //       //     ...updatedUser.days,
  //       //     {
  //       //       date: selectedDateFormatted,
  //       //       weight: Number(currentWeight),
  //       //       goalWeight: Number(goalWeight),
  //       //       breakfast: {
  //       //         foodItems: [],
  //       //         calories: 0,
  //       //         carbohydrates: 0,
  //       //         protein: 0,
  //       //         fat: 0,
  //       //         proteinPercentage: 0,
  //       //         fatPercentage: 0,
  //       //         carbohydratePercentage: 0,
  //       //       },
  //       //       lunch: {
  //       //         foodItems: [],
  //       //         calories: 0,
  //       //         carbohydrates: 0,
  //       //         protein: 0,
  //       //         fat: 0,
  //       //         proteinPercentage: 0,
  //       //         fatPercentage: 0,
  //       //         carbohydratePercentage: 0,
  //       //       },
  //       //       dinner: {
  //       //         foodItems: [],
  //       //         calories: 0,
  //       //         carbohydrates: 0,
  //       //         protein: 0,
  //       //         fat: 0,
  //       //         proteinPercentage: 0,
  //       //         fatPercentage: 0,
  //       //         carbohydratePercentage: 0,
  //       //       },
  //       //       snacks: {
  //       //         foodItems: [],
  //       //         calories: 0,
  //       //         carbohydrates: 0,
  //       //         protein: 0,
  //       //         fat: 0,
  //       //         proteinPercentage: 0,
  //       //         fatPercentage: 0,
  //       //         carbohydratePercentage: 0,
  //       //       },
  //       //       totals: {
  //       //         calories: 0,
  //       //         carbohydrates: 0,
  //       //         protein: 0,
  //       //         fat: 0,
  //       //         proteinPercentage: 0,
  //       //         fatPercentage: 0,
  //       //         carbohydratePercentage: 0,
  //       //       },
  //       //     },
  //       //   ].sort((a, b) => a.date.localeCompare(b.date)),
  //       // }));
  //     }
  //     //setIsEditing(false);
  //   }
  // };

  // const handleProfileEdit = (e) => {
  //   if (e.target.id === "given_name") {
  //     setGiven_name(e.target.value);
  //   }
  //   if (e.target.id === "family_name") {
  //     setFamily_name(e.target.value);
  //   }
  //   if (e.target.id === "age") {
  //     setAge(e.target.value);
  //   }
  //   if (e.target.id === "currentWeight") {
  //     setCurrentWeight(e.target.value);
  //   }
  //   if (e.target.id === "goalWeight") {
  //     setGoalWeight(e.target.value);
  //   }
  // };

  // const handleCancelProfileChanges = () => {
  //   setIsEditing(false);
  //   setGiven_name(initialUser.given_name);
  //   setFamily_name(initialUser.family_name);
  //   setAge(initialUser.age);
  //   setCurrentWeight(initialUser.currentWeightKG);
  //   setGoalWeight(initialUser.goalWeightKG);
  //   setNameError("");
  //   setGoalWeightError("");
  //   setCurrentWeightError("");
  //   setAgeError("");
  // };

  // const handleProfileUpdate = () => {
  //   setIsEditing(true);
  // };

  // const handleServingsInput = (e) => {
  //   setUpdateServings(e.target.value);
  // };

  // const handleInputChange = (e) => {
  //   setSearch(e.target.value);
  // };

  // const handleAddFoodItem = (meal) => {
  //   setCurrentMeal(meal);
  //   setSearchModal(true);
  // };

  // const handleSaveChanges = () => {
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getUser/${session.user.id}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedUser),
  //     }
  //   )
  //     .then((response) => {
  //       if (response.status === 201) {
  //         return response.json(); // Parse response if status is 201
  //       } else if (response.status === 400) {
  //         throw new Error("Adding to Meal Failed, Please Try Again"); // Handle 400 error
  //       } else {
  //         throw new Error(`Unexpected status: ${response.status}`);
  //       }
  //     }) // Parse JSON response
  //     .then((data) => {
  //       setInitialUser(data);
  //       setUserChanged(false);
  //     }) // Handle data
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     }); // Handle errors
  // };

  // const handleCancelChanges = () => {
  //   setUserChanged(false);
  //   setUpdatedUser(initialUser);
  //   handleAverageMacroCalculation(initialUser);
  //   if (
  //     !initialUser.days[indexOfPreviousData] ||
  //     !initialUser.days[indexOfPreviousData].totals.calories
  //   ) {
  //     setPreviousData(false);
  //     setDailyMacros("");
  //   }
  // };

  // const handleIncreaseDate = () => {
  //   setSelectedDate(addDays(selectedDate, 1));
  //   handleFormatDate(addDays(selectedDate, 1));
  // };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   handleFormatDate(date);
  // };

  // const handleReduceDate = () => {
  //   setSelectedDate(addDays(selectedDate, -1));
  //   handleFormatDate(addDays(selectedDate, -1));
  // };

  // const handleAverageMacroCalculation = (user) => {
  //   let protein = 0;
  //   let carbohydrates = 0;
  //   let fat = 0;
  //   let calories = 0;
  //   if (user.days.length) {
  //     user.days.forEach((day) => {
  //       protein = day.totals.protein ? protein + day.totals.protein : protein;
  //       carbohydrates = day.totals.carbohydrates
  //         ? carbohydrates + day.totals.carbohydrates
  //         : carbohydrates;
  //       fat = day.totals.fat ? fat + day.totals.fat : fat;
  //     });

  //     calories = protein * 4 + carbohydrates * 4 + fat * 9;
  //     let foodEaten = 0;
  //     user.days.forEach((day) => {
  //       foodEaten = foodEaten + day.totals.calories ? day.totals.calories : 0;
  //     });
  //     if (foodEaten) {
  //       setAverageMacros([
  //         {
  //           name: "Protein",
  //           value: Number((((protein * 4) / calories) * 100).toFixed(2)),
  //         },
  //         {
  //           name: "Carbohydrates",
  //           value: Number((((carbohydrates * 4) / calories) * 100).toFixed(2)),
  //         },
  //         {
  //           name: "Fat",
  //           value: Number((((fat * 9) / calories) * 100).toFixed(2)),
  //         },
  //       ]);
  //     } else {
  //       setAverageMacros("");
  //     }
  //   } else {
  //     setAverageMacros("");
  //   }
  // };

  // const handleUpdateDailyTotals = (user, index) => {
  //   let updatedDailyTotals = {
  //     calories: 0,
  //     protein: 0,
  //     carbohydrates: 0,
  //     fat: 0,
  //     proteinPercentage: 0,
  //     carbohydratePercentage: 0,
  //     fatPercentage: 0,
  //   };
  //   //checks if the user had any food during each of the meal options and returns a truthy or a falsy response
  //   const hadBreakfast = user.days[index].breakfast.foodItems.length;
  //   const hadLunch = user.days[index].lunch.foodItems.length;
  //   const hadDinner = user.days[index].dinner.foodItems.length;
  //   const hadSnacks = user.days[index].snacks.foodItems.length;

  //   //creates a breakfast.calories, breakfast.protein, breakfast.carbohydrates, & breakfast.fat overall amount
  //   if (hadBreakfast) {
  //     user.days[index].breakfast.calories = 0;
  //     user.days[index].breakfast.protein = 0;
  //     user.days[index].breakfast.carbohydrates = 0;
  //     user.days[index].breakfast.fat = 0;
  //     user.days[index].breakfast.foodItems.forEach((foodItem) => {
  //       user.days[index].breakfast.calories =
  //         user.days[index].breakfast.calories + foodItem.calories.amountEaten;
  //       user.days[index].breakfast.protein =
  //         user.days[index].breakfast.protein + foodItem.protein.amountEaten;
  //       user.days[index].breakfast.carbohydrates =
  //         user.days[index].breakfast.carbohydrates +
  //         foodItem.carbohydrates.amountEaten;
  //       user.days[index].breakfast.fat =
  //         user.days[index].breakfast.fat + foodItem.fat.amountEaten;
  //     });
  //   } else {
  //     user.days[index].breakfast.calories = 0;
  //     user.days[index].breakfast.protein = 0;
  //     user.days[index].breakfast.carbohydrates = 0;
  //     user.days[index].breakfast.fat = 0;
  //   }
  //   //creates a lunch.calories, lunch.protein, lunch.carbohydrates, & lunch.fat overall amount
  //   if (hadLunch) {
  //     user.days[index].lunch.calories = 0;
  //     user.days[index].lunch.protein = 0;
  //     user.days[index].lunch.carbohydrates = 0;
  //     user.days[index].lunch.fat = 0;
  //     user.days[index].lunch.foodItems.forEach((foodItem) => {
  //       user.days[index].lunch.calories =
  //         user.days[index].lunch.calories + foodItem.calories.amountEaten;
  //       user.days[index].lunch.protein =
  //         user.days[index].lunch.protein + foodItem.protein.amountEaten;
  //       user.days[index].lunch.carbohydrates =
  //         user.days[index].lunch.carbohydrates +
  //         foodItem.carbohydrates.amountEaten;
  //       user.days[index].lunch.fat =
  //         user.days[index].lunch.fat + foodItem.fat.amountEaten;
  //     });
  //   } else {
  //     user.days[index].lunch.calories = 0;
  //     user.days[index].lunch.protein = 0;
  //     user.days[index].lunch.carbohydrates = 0;
  //     user.days[index].lunch.fat = 0;
  //   }
  //   //creates a dinner.calories, dinner.protein, dinner.carbohydrates, & dinner.fat overall amount
  //   if (hadDinner) {
  //     user.days[index].dinner.calories = 0;
  //     user.days[index].dinner.protein = 0;
  //     user.days[index].dinner.carbohydrates = 0;
  //     user.days[index].dinner.fat = 0;
  //     user.days[index].dinner.foodItems.forEach((foodItem) => {
  //       user.days[index].dinner.calories =
  //         user.days[index].dinner.calories + foodItem.calories.amountEaten;
  //       user.days[index].dinner.protein =
  //         user.days[index].dinner.protein + foodItem.protein.amountEaten;
  //       user.days[index].dinner.carbohydrates =
  //         user.days[index].dinner.carbohydrates +
  //         foodItem.carbohydrates.amountEaten;
  //       user.days[index].dinner.fat =
  //         user.days[index].dinner.fat + foodItem.fat.amountEaten;
  //     });
  //   } else {
  //     user.days[index].dinner.calories = 0;
  //     user.days[index].dinner.protein = 0;
  //     user.days[index].dinner.carbohydrates = 0;
  //     user.days[index].dinner.fat = 0;
  //   }
  //   //creates a snacks.calories, snacks.protein, snacks.carbohydrates, & snacks.fat overall amount
  //   if (hadSnacks) {
  //     user.days[index].snacks.calories = 0;
  //     user.days[index].snacks.protein = 0;
  //     user.days[index].snacks.carbohydrates = 0;
  //     user.days[index].snacks.fat = 0;
  //     user.days[index].snacks.foodItems.forEach((foodItem) => {
  //       user.days[index].snacks.calories =
  //         user.days[index].snacks.calories + foodItem.calories.amountEaten;
  //       user.days[index].snacks.protein =
  //         user.days[index].snacks.protein + foodItem.protein.amountEaten;
  //       user.days[index].snacks.carbohydrates =
  //         user.days[index].snacks.carbohydrates +
  //         foodItem.carbohydrates.amountEaten;
  //       user.days[index].snacks.fat =
  //         user.days[index].snacks.fat + foodItem.fat.amountEaten;
  //     });
  //   } else {
  //     user.days[index].snacks.calories = 0;
  //     user.days[index].snacks.protein = 0;
  //     user.days[index].snacks.carbohydrates = 0;
  //     user.days[index].snacks.fat = 0;
  //   }

  //   //adds up all the calories from each meal
  //   updatedDailyTotals.calories =
  //     user.days[index].breakfast.calories +
  //     user.days[index].lunch.calories +
  //     user.days[index].dinner.calories +
  //     user.days[index].snacks.calories;

  //   //adds up all the protein from each meal
  //   updatedDailyTotals.protein =
  //     user.days[index].breakfast.protein +
  //     user.days[index].lunch.protein +
  //     user.days[index].dinner.protein +
  //     user.days[index].snacks.protein;

  //   //adds up all the carbohydrates from each meal
  //   updatedDailyTotals.carbohydrates =
  //     user.days[index].breakfast.carbohydrates +
  //     user.days[index].lunch.carbohydrates +
  //     user.days[index].dinner.carbohydrates +
  //     user.days[index].snacks.carbohydrates;

  //   //adds up all the fat from each meal
  //   updatedDailyTotals.fat =
  //     user.days[index].breakfast.fat +
  //     user.days[index].lunch.fat +
  //     user.days[index].dinner.fat +
  //     user.days[index].snacks.fat;

  //   //calculates the total calories based on the grams of fat, carbs, & protein eaten based on 9cal/1g fat, 4cal/1g carbs, & 4cal/1g protein (not identical to calories provided in database)
  //   const totalDailyCalculatedCaloriesEaten =
  //     updatedDailyTotals.fat * 9 +
  //     updatedDailyTotals.carbohydrates * 4 +
  //     updatedDailyTotals.protein * 4;

  //   //calculates protein, carb, & fat percentages based on the calculated calories eaten (not the one given in the database)
  //   updatedDailyTotals.proteinPercentage = Number(
  //     (
  //       ((updatedDailyTotals.protein * 4) / totalDailyCalculatedCaloriesEaten) *
  //       100
  //     ).toFixed(2)
  //   );
  //   updatedDailyTotals.carbohydratePercentage = Number(
  //     (
  //       ((updatedDailyTotals.carbohydrates * 4) /
  //         totalDailyCalculatedCaloriesEaten) *
  //       100
  //     ).toFixed(2)
  //   );
  //   updatedDailyTotals.fatPercentage = Number(
  //     (
  //       ((updatedDailyTotals.fat * 9) / totalDailyCalculatedCaloriesEaten) *
  //       100
  //     ).toFixed(2)
  //   );
  //   //updates the daily totals in the user object
  //   user.days[index].totals = updatedDailyTotals;
  //   if (!user.days[index].totals.calories) {
  //     setDailyMacros("");
  //   } else {
  //     setDailyMacros([
  //       {
  //         name: "Protein",
  //         value: user.days[index].totals.proteinPercentage * 100,
  //       },
  //       {
  //         name: "Carbohydrate",
  //         value: user.days[index].totals.carbohydratePercentage * 100,
  //       },
  //       {
  //         name: "Fat",
  //         value: Number(
  //           (user.days[index].totals.fatPercentage * 100).toFixed(2)
  //         ),
  //       },
  //     ]);
  //   }
  //   handleAverageMacroCalculation(user);
  //   setUpdatedUser(user);
  // };

  // const handleUpdateMealTotals = (user, meal, index) => {
  //   let updatedMealTotals = {};
  //   let totalCalculatedCaloriesEaten = 0;
  //   updatedMealTotals[meal] = {
  //     foodItems: [],
  //     calories: 0,
  //     protein: 0,
  //     carbohydrates: 0,
  //     fat: 0,
  //     proteinPercentage: 0,
  //     fatPercentage: 0,
  //     carbohydratePercentage: 0,
  //   };
  //   if (user.days[index][meal].foodItems.length) {
  //     user.days[index][meal].foodItems.forEach((foodItem) => {
  //       //calculates total number of calories eaten
  //       updatedMealTotals[meal].calories =
  //         updatedMealTotals[meal].calories + foodItem.calories.amountEaten;
  //       //calculates total number of protein eaten
  //       updatedMealTotals[meal].protein =
  //         updatedMealTotals[meal].protein + foodItem.protein.amountEaten;
  //       //calculates total number of carbs eaten
  //       updatedMealTotals[meal].carbohydrates =
  //         updatedMealTotals[meal].carbohydrates +
  //         foodItem.carbohydrates.amountEaten;
  //       //calculates total number of fat eaten
  //       updatedMealTotals[meal].fat =
  //         updatedMealTotals[meal].fat + foodItem.fat.amountEaten;
  //       //calculates the total calories based on the grams of fat, carbs, & protein eaten based on 9cal/1g fat, 4cal/1g carbs, & 4cal/1g protein (not identical to calories provided in database)
  //       totalCalculatedCaloriesEaten =
  //         totalCalculatedCaloriesEaten +
  //         (foodItem.fat.amountEaten * 9 +
  //           foodItem.carbohydrates.amountEaten * 4 +
  //           foodItem.protein.amountEaten * 4);
  //     });
  //     //calculates protein, carb, & fat percentages based on the calculated calories eaten (not the one given in the database)
  //     updatedMealTotals[meal].proteinPercentage = Number(
  //       (
  //         ((updatedMealTotals[meal].protein * 4) /
  //           totalCalculatedCaloriesEaten) *
  //         100
  //       ).toFixed(2)
  //     );
  //     updatedMealTotals[meal].carbohydratePercentage = Number(
  //       (
  //         ((updatedMealTotals[meal].carbohydrates * 4) /
  //           totalCalculatedCaloriesEaten) *
  //         100
  //       ).toFixed(2)
  //     );
  //     updatedMealTotals[meal].fatPercentage = Number(
  //       (
  //         ((updatedMealTotals[meal].fat * 9) / totalCalculatedCaloriesEaten) *
  //         100
  //       ).toFixed(2)
  //     );
  //     //adds the food items back into the updated meals
  //     updatedMealTotals[meal].foodItems = user.days[index][meal].foodItems;
  //   }
  //   user.days[index][meal] = updatedMealTotals[meal];
  //   handleUpdateDailyTotals(user, index);
  // };

  // const handleDeleteFoodItem = (e) => {
  //   let user = structuredClone(updatedUser);
  //   user.days[indexOfPreviousData][e.target.title].foodItems.splice(
  //     e.target.id,
  //     1
  //   );
  //   handleUpdateMealTotals(user, e.target.title, indexOfPreviousData);
  //   setUserChanged(true);
  // };

  // const handleAddToMeal = () => {
  //   let user = structuredClone(updatedUser);
  //   //checks if the date already exists in the user object
  //   if (user.days.some((day) => day.date === selectedDateFormatted)) {
  //     //finds the index of the day that already exists in the user.days object
  //     const index = user.days.findIndex(
  //       (day) => day.date === selectedDateFormatted
  //     );
  //     //Creates the food item with the specific amount eaten of that food
  //     const foodItem = {
  //       brandOwner: foodDetails.brandOwner,
  //       calories: {
  //         name: foodDetails.calories.name,
  //         amount: foodDetails.calories.amount,
  //         amountPerServing: foodDetails.calories.amountPerServing,
  //         id: foodDetails.calories.id,
  //         number: foodDetails.calories.number,
  //         unit: foodDetails.calories.unit,
  //         amountEaten: foodDetails.calories.amountPerServing * servings,
  //         servings: servings,
  //       },
  //       protein: {
  //         name: foodDetails.protein.name,
  //         amount: foodDetails.protein.amount,
  //         amountPerServing: foodDetails.protein.amountPerServing,
  //         id: foodDetails.protein.id,
  //         number: foodDetails.protein.number,
  //         unit: foodDetails.protein.unit,
  //         amountEaten: foodDetails.protein.amountPerServing * servings,
  //         servings: servings,
  //       },
  //       fat: {
  //         name: foodDetails.fat.name,
  //         amount: foodDetails.fat.amount,
  //         amountPerServing: foodDetails.fat.amountPerServing,
  //         id: foodDetails.fat.id,
  //         number: foodDetails.fat.number,
  //         unit: foodDetails.fat.unit,
  //         amountEaten: foodDetails.fat.amountPerServing * servings,
  //         servings: servings,
  //       },
  //       carbohydrates: {
  //         name: foodDetails.carbohydrates.name,
  //         amount: foodDetails.carbohydrates.amount,
  //         amountPerServing: foodDetails.carbohydrates.amountPerServing,
  //         id: foodDetails.carbohydrates.id,
  //         number: foodDetails.carbohydrates.number,
  //         unit: foodDetails.carbohydrates.unit,
  //         amountEaten: foodDetails.carbohydrates.amountPerServing * servings,
  //         servings: servings,
  //       },
  //       description: foodDetails.description,
  //       fdcId: foodDetails.fdcId,
  //       ingredients: foodDetails.ingredients,
  //       nutrients: foodDetails.nutrients.map((nutrient) => {
  //         return {
  //           name: nutrient.name,
  //           number: nutrient.number,
  //           unit: nutrient.unit,
  //           amountPerServing: nutrient.amountPerServing,
  //           amount: nutrient.amount,
  //           servingsEaten: servings,
  //           amountEaten: nutrient.amountPerServing * servings,
  //         };
  //       }),
  //     };
  //     //adds the food item to the specific date and meal of the user
  //     user.days[index][currentMeal].foodItems.push(foodItem);
  //     handleUpdateMealTotals(user, currentMeal, index);
  //     setPreviousData(true);
  //     setIndexOfPreviousData(index);
  //     setUserChanged(true);
  //     setResults({ foods: [] });
  //     setSearch("");
  //     setCurrentSearch("");
  //     setIsModalOpen(false);
  //     setServings(1);
  //   } else {
  //     //creates a blank day for the user for the new date
  //     user.days.push({
  //       date: selectedDateFormatted,
  //       weight: user.days.length
  //         ? user.days[user.days.length - 1].weight
  //         : user.currentWeightKG,
  //       goalWeight: user.days.length
  //         ? user.days[user.days.length - 1].goalWeight
  //         : user.goalWeightKG,
  //       breakfast: {
  //         foodItems: [],
  //         calories: 0,
  //         carbohydrates: 0,
  //         protein: 0,
  //         fat: 0,
  //         proteinPercentage: 0,
  //         fatPercentage: 0,
  //         carbohydratePercentage: 0,
  //       },
  //       lunch: {
  //         foodItems: [],
  //         calories: 0,
  //         carbohydrates: 0,
  //         protein: 0,
  //         fat: 0,
  //         proteinPercentage: 0,
  //         fatPercentage: 0,
  //         carbohydratePercentage: 0,
  //       },
  //       dinner: {
  //         foodItems: [],
  //         calories: 0,
  //         carbohydrates: 0,
  //         protein: 0,
  //         fat: 0,
  //         proteinPercentage: 0,
  //         fatPercentage: 0,
  //         carbohydratePercentage: 0,
  //       },
  //       snacks: {
  //         foodItems: [],
  //         calories: 0,
  //         carbohydrates: 0,
  //         protein: 0,
  //         fat: 0,
  //         proteinPercentage: 0,
  //         fatPercentage: 0,
  //         carbohydratePercentage: 0,
  //       },
  //       totals: {
  //         calories: 0,
  //         carbohydrates: 0,
  //         protein: 0,
  //         fat: 0,
  //         proteinPercentage: 0,
  //         fatPercentage: 0,
  //         carbohydratePercentage: 0,
  //       },
  //     });
  //     //Creates the food item with the specific amount eaten of that food
  //     const foodItem = {
  //       brandOwner: foodDetails.brandOwner,
  //       calories: {
  //         name: foodDetails.calories.name,
  //         amount: foodDetails.calories.amount,
  //         amountPerServing: foodDetails.calories.amountPerServing,
  //         id: foodDetails.calories.id,
  //         number: foodDetails.calories.number,
  //         unit: foodDetails.calories.unit,
  //         amountEaten: foodDetails.calories.amountPerServing * servings,
  //         servings: servings,
  //       },
  //       protein: {
  //         name: foodDetails.protein.name,
  //         amount: foodDetails.protein.amount,
  //         amountPerServing: foodDetails.protein.amountPerServing,
  //         id: foodDetails.protein.id,
  //         number: foodDetails.protein.number,
  //         unit: foodDetails.protein.unit,
  //         amountEaten: foodDetails.protein.amountPerServing * servings,
  //         servings: servings,
  //       },
  //       fat: {
  //         name: foodDetails.fat.name,
  //         amount: foodDetails.fat.amount,
  //         amountPerServing: foodDetails.fat.amountPerServing,
  //         id: foodDetails.fat.id,
  //         number: foodDetails.fat.number,
  //         unit: foodDetails.fat.unit,
  //         amountEaten: foodDetails.fat.amountPerServing * servings,
  //         servings: servings,
  //       },
  //       carbohydrates: {
  //         name: foodDetails.carbohydrates.name,
  //         amount: foodDetails.carbohydrates.amount,
  //         amountPerServing: foodDetails.carbohydrates.amountPerServing,
  //         id: foodDetails.carbohydrates.id,
  //         number: foodDetails.carbohydrates.number,
  //         unit: foodDetails.carbohydrates.unit,
  //         amountEaten: foodDetails.carbohydrates.amountPerServing * servings,
  //         servings: servings,
  //       },
  //       description: foodDetails.description,
  //       fdcId: foodDetails.fdcId,
  //       ingredients: foodDetails.ingredients,
  //       nutrients: foodDetails.nutrients.map((nutrient) => {
  //         return {
  //           name: nutrient.name,
  //           number: nutrient.number,
  //           unit: nutrient.unit,
  //           amountPerServing: nutrient.amountPerServing,
  //           amount: nutrient.amount,
  //           servingsEaten: servings,
  //           amountEaten: nutrient.amountPerServing * servings,
  //         };
  //       }),
  //     };
  //     //finds the index of the day that already exists in the user.days object
  //     const index = user.days.findIndex(
  //       (day) => day.date === selectedDateFormatted
  //     );
  //     //adds the food item to the specific date and meal of the user
  //     user.days[index][currentMeal].foodItems.push(foodItem);
  //     handleUpdateMealTotals(user, currentMeal, index);
  //     setPreviousData(true);
  //     setIndexOfPreviousData(index);
  //     setUserChanged(true);
  //     setResults({ foods: [] });
  //     setSearch("");
  //     setCurrentSearch("");
  //     setIsModalOpen(false);
  //     setServings(1);
  //   }
  // };

  // const handleFormatDate = (date) => {
  //   setSelectedDateFormatted(
  //     `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
  //       2,
  //       "0"
  //     )}-${String(date.getDate()).padStart(2, "0")}`
  //   );
  // };

  // const handleUpdateServings = () => {
  //   //Using a regex, checks if the text put into the update servings input is a number, decimal, or fraction
  //   if (numberCheck.test(updateServings)) {
  //     //checks if the input is a fraction
  //     if (!Number(updateServings) && updateServings != "0") {
  //       //splits the fraction into a numerator and a denominator
  //       const [numerator, denominator] = updateServings.split("/").map(Number);
  //       //checks if the fraction is a positive number
  //       if (numerator / denominator < 0) {
  //         setInputError("Please Enter A Valid Number");
  //       } else {
  //         setServings(Number((numerator / denominator).toFixed(2)));
  //         setInputError("");
  //       }
  //     }
  //     //checks if the number is less than zero or equal to zero
  //     else if (Number(updateServings) < 0 || updateServings === "0") {
  //       setInputError("Please Enter A Valid Number");
  //     }
  //     //updates the number of servings
  //     else {
  //       setServings(Number(updateServings));
  //       setUpdateServings("");
  //       setInputError("");
  //     }
  //   } else {
  //     setInputError("Please Enter A Valid Number");
  //   }
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setSearchModal(true);
  //   setServings(1);
  // };

  // const handleCloseSearchModal = () => {
  //   setSearchModal(false);
  //   setResults({ foods: [] });
  //   setSearch("");
  //   setCurrentSearch("");
  // };

  // const handleFoodChoice = (e) => {
  //   setSearchModal(false);
  //   setIsModalOpen(true);
  //   setFoodDetailsLoading(true);
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/usdaDatabase/food-details`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         fdcId: e.target.accessKey,
  //       }),
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((foodDetails) => {
  //       setFoodDetails(foodDetails);
  //     })
  //     .finally(() => setFoodDetailsLoading(false));
  // };

  // const handlePageChange = (e) => {
  //   setPage(e.target.value);
  //   handleSearch(currentSearch, e.target.value);
  // };

  // const handleClearSearch = () => {
  //   setResults({ foods: [] });
  //   setSearch("");
  //   setCurrentSearch("");
  // };

  // const handleSearch = (search, page) => {
  //   setSearchLoading(true);
  //   setCurrentSearch(search);
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/usdaDatabase/food-search`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         search: search,
  //         page: page ? page : 1,
  //       }),
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((foodData) => {
  //       setResults(foodData);
  //     })
  //     .finally(() => setSearchLoading(false));
  // };

  // useEffect(() => {
  //   //Tries to avoid hydration issues with server and react due to date creation
  //   if (selectedDate === "") {
  //     const date = new Date();
  //     setSelectedDate(date);
  //     setSelectedDateFormatted(
  //       `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
  //         2,
  //         "0"
  //       )}-${String(date.getDate()).padStart(2, "0")}`
  //     );
  //   }

  //   //calculates screen size changes so that the outer radius of the pie chart can be updated accordingly
  //   const handleResize = () => {
  //     setScreenWidth(window.innerWidth);
  //   };

  //   async function fetchUser(userId) {
  //     try {
  //       const res = await fetch(`/api/getUser/${userId}`);
  //       if (!res.ok) throw new Error("User not found");
  //       const data = await res.json();
  //       setInitialUser(data);
  //       setUpdatedUser(data);
  //       setFamily_name(data.family_name);
  //       setGiven_name(data.given_name);
  //       setAge(data.age ? data.age : "");
  //       setGoalWeight(data.goalWeightKG ? data.goalWeightKG : "");
  //       setCurrentWeight(data.currentWeightKG ? data.currentWeightKG : "");
  //       if (data.days.length) {
  //         if (!averageMacros) {
  //           handleAverageMacroCalculation(data);
  //         }
  //         if (data.days.some((day) => day.date === selectedDateFormatted)) {
  //           setPreviousData(true);
  //           const previousDataIndex = data.days.findIndex(
  //             (day) => day.date === selectedDateFormatted
  //           );
  //           setIndexOfPreviousData(previousDataIndex);
  //           setDailyMacros([
  //             {
  //               name: "Protein",
  //               value:
  //                 data.days[previousDataIndex].totals.proteinPercentage * 100,
  //             },
  //             {
  //               name: "Carbohydrate",
  //               value:
  //                 data.days[previousDataIndex].totals.carbohydratePercentage *
  //                 100,
  //             },
  //             {
  //               name: "Fat",
  //               value: Number(
  //                 (
  //                   data.days[previousDataIndex].totals.fatPercentage * 100
  //                 ).toFixed(2)
  //               ),
  //             },
  //           ]);
  //         } else {
  //           setPreviousData(false);
  //           setIndexOfPreviousData(-1);
  //           setDailyMacros("");
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   if (session && initialUser === "") {
  //     fetchUser(session.user.id);
  //     setIsLoading(false);
  //     setIsUnauthenticated(false);
  //   } else if (session && initialUser != "") {
  //     if (updatedUser.days.length) {
  //       if (!averageMacros) {
  //         handleAverageMacroCalculation(updatedUser);
  //       }
  //       if (
  //         updatedUser.days.some((day) => day.date === selectedDateFormatted)
  //       ) {
  //         setPreviousData(true);
  //         const previousDataIndex = updatedUser.days.findIndex(
  //           (day) => day.date === selectedDateFormatted
  //         );
  //         setIndexOfPreviousData(previousDataIndex);
  //         if (updatedUser.days[previousDataIndex].totals.calories) {
  //           setDailyMacros([
  //             {
  //               name: "Protein",
  //               value:
  //                 updatedUser.days[previousDataIndex].totals.proteinPercentage *
  //                 100,
  //             },
  //             {
  //               name: "Carbohydrate",
  //               value:
  //                 updatedUser.days[previousDataIndex].totals
  //                   .carbohydratePercentage * 100,
  //             },
  //             {
  //               name: "Fat",
  //               value: Number(
  //                 (
  //                   updatedUser.days[previousDataIndex].totals.fatPercentage *
  //                   100
  //                 ).toFixed(2)
  //               ),
  //             },
  //           ]);
  //         } else {
  //           setDailyMacros("");
  //         }
  //       } else {
  //         setPreviousData(false);
  //         setIndexOfPreviousData(-1);
  //         setDailyMacros("");
  //       }
  //     }
  //   } else if (status === "loading") {
  //     setIsLoading(true);
  //     setIsUnauthenticated(false);
  //   } else if (status === "unauthenticated") {
  //     signIn();
  //   }

  //   window.addEventListener("resize", handleResize);
  //   handleResize(); // initial call

  //   return () => window.removeEventListener("resize", handleResize);
  // }, [selectedDateFormatted, session]);

  const {
    session,
    status,
    isUnauthenticated,
    isLoading,
    updatedUser,
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
  } = useContext(UserContext);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [session]);

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
              foodDetailsLoading={foodDetailsLoading}
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
