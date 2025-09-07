"use client"; // Required for context providers in App Router
import { useSession } from "next-auth/react";
import NavBar from "@/app/components/navbar";
import { useState, useEffect } from "react";
import { UserContext } from "@/lib/user-context";
import "bootstrap-icons/font/bootstrap-icons.css";
import { signIn } from "next-auth/react";
import { addDays } from "date-fns";
import { uploadFileToS3 } from "@/lib/s3";
export default function AppWrapper({ children }) {
  const [show, setShow] = useState(false);
  const [initialUser, setInitialUser] = useState("");
  const [updatedUser, setUpdatedUser] = useState("");
  const [family_name, setFamily_name] = useState("");
  const [given_name, setGiven_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [preference, setPreference] = useState("Metric");
  const [profilePicture, setProfilePicture] = useState("");
  const [preview, setPreview] = useState(null);
  const [age, setAge] = useState("");
  const [currentWeightKG, setCurrentWeightKG] = useState("");
  const [goalWeightKG, setGoalWeightKG] = useState("");
  const [currentWeightLBS, setCurrentWeightLBS] = useState("");
  const [goalWeightLBS, setGoalWeightLBS] = useState("");
  const [heightMetric, setHeightMetric] = useState("");
  const [heightImperial, setHeightImperial] = useState(["", ""]);
  const [userChanged, setUserChanged] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [americanDate, setAmericanDate] = useState("");

  const [search, setSearch] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState({ foods: [] });
  const [foodDetails, setFoodDetails] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [foodDetailsLoading, setFoodDetailsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [foodEntry, setFoodEntry] = useState(false);
  const [servings, setServings] = useState(1);
  const [updateServings, setUpdateServings] = useState("");
  const [inputError, setInputError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateFormatted, setSelectedDateFormatted] = useState("");
  const [previousData, setPreviousData] = useState(false);
  const [indexOfPreviousData, setIndexOfPreviousData] = useState("");
  const [currentMeal, setCurrentMeal] = useState("");
  const [dailyMacros, setDailyMacros] = useState("");
  const [dailyMacrosGrams, setDailyMacrosGrams] = useState("");
  const [averageMacros, setAverageMacros] = useState("");
  const [averageMacrosGrams, setAverageMacrosGrams] = useState("");
  const [screenWidth, setScreenWidth] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [currentWeightError, setCurrentWeightError] = useState("");
  const [goalWeightError, setGoalWeightError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUnauthenticated, setIsUnauthenticated] = useState(false);
  const [profilePictureError, setProfilePictureError] = useState("");
  const [gender, setGender] = useState("");
  const [bmiKG, setBMIKG] = useState("");
  const [bmiLBS, setBMILBS] = useState("");
  const [weightLossPerWeekKG, setWeightLossPerWeekKG] = useState("");
  const [weightLossPerWeekLBS, setWeightLossPerWeekLBS] = useState("");
  const [weightLossPerWeekChanged, setWeightLossPerWeekChanged] =
    useState(false);
  const [activityLevel, setActivityLevel] = useState("");
  const [activityLevelChanged, setActivityLevelChanged] = useState(false);
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState("");
  const [caloriesPerServing, setCaloriesPerServing] = useState("");
  const [proteinPerServing, setProteinPerServing] = useState("");
  const [fatPerServing, setFatPerServing] = useState("");
  const [carbohydratesPerServing, setCarbohydratesPerServing] = useState("");
  const [newFood, setNewFood] = useState(false);
  const [newFoodDescription, setNewFoodDescription] = useState("");
  const [newFoodBrandName, setFoodBrandName] = useState("");
  const [newFoodBrandOwner, setFoodBrandOwner] = useState("");
  const [newFoodID, setFoodID] = useState("");
  const [newFoodIngredients, setNewFoodIngredients] = useState("");
  const [newFoodServingSize, setNewFoodServingSize] = useState("");
  const [newFoodServingSizeUnit, setNewFoodServingSizeUnit] = useState("");
  const [foodInputError, setFoodInputError] = useState("");
  const [caloriesInputError, setCaloriesInputError] = useState("");
  const [proteinInputError, setProteinInputError] = useState("");
  const [fatInputError, setFatInputError] = useState("");
  const [carbohydrateInputError, setCarbohydrateInputError] = useState("");
  const [myFoods, setMyFoods] = useState(false);
  const [isMyFoodDetailsModalOpen, setisMyFoodDetailsModalOpen] =
    useState(false);
  const [tabActiveKey, setTabActiveKey] = useState("averageMacros");
  const [success, setSuccess] = useState(false);

  const numberCheck =
    /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:\/(?:\d+(?:\.\d*)?|\.\d+))?$/;
  const textCheck = /^[a-zA-Z]+$/;
  const ageCheck = /^(1[89]|[2-9][0-9])$/;
  const lbsCheck =
    /^(70(\.\d{1,2})?|7[1-9](\.\d{1,2})?|[89][0-9](\.\d{1,2})?|[1-9][0-9]{2}(\.\d{1,2})?|400(\.0{1,2})?)$/;
  const kgCheck =
    /^(32(\.\d{1,2})?|3[3-9](\.\d{1,2})?|[4-9][0-9](\.\d{1,2})?|1[0-6][0-9](\.\d{1,2})?|17[0-9](\.\d{1,2})?|180(\.\d{1,2})?|181(\.0{1,2})?)$/;
  const feetCheck = /^[2-9]$/;
  const inchesCheck = /^([0-9]|10|11)$/;
  const cmCheck = /^(6[1-9]|[7-9][0-9]|1[0-9]{2}|2[0-6][0-9]|27[0-4])$/;
  const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordCheck =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{8,}$/;

  const pieChartColors = ["#0088FE", "#00C49F", "#FFBB28"];

  const { data: session, status } = useSession();

  const handleCloseAfterUpdate = () => {
    setShow(false);
  };
  const handleClose = () => {
    setShow(false);
    if (userChanged) {
      setUpdatedUser(initialUser);
      setUserChanged(false);
      setFamily_name(initialUser.family_name);
      setGiven_name(initialUser.given_name);
      setAge(initialUser.age ? initialUser.age : "");
      setEmail(initialUser.email ? initialUser.email : "");
      setGoalWeightKG(initialUser.goalWeightKG ? initialUser.goalWeightKG : "");
      setCurrentWeightKG(
        initialUser.currentWeightKG ? initialUser.currentWeightKG : ""
      );
      setGoalWeightLBS(
        initialUser.goalWeightLBS ? initialUser.goalWeightLBS : ""
      );
      setCurrentWeightLBS(
        initialUser.currentWeightLBS ? initialUser.currentWeightLBS : ""
      );
      setPreference(initialUser.preference ? initialUser.preference : "Metric");
      setGender(initialUser.gender ? initialUser.gender : "Male");
      setHeightImperial(
        initialUser.heightImperial[0]
          ? [initialUser.heightImperial[0], initialUser.heightImperial[1]]
          : ["", ""]
      );
      setHeightMetric(initialUser.heightMetric ? initialUser.heightMetric : "");
      setProfilePicture(
        initialUser.profilePicture ? initialUser.profilePicture : ""
      );
      setPreview(null);
    }
  };
  const handleShow = () => {
    setShow(true);
    if (userChanged) {
      setUpdatedUser(initialUser);
      setUserChanged(false);
    }
  };

  const handleUserComparison = (user, newUser) => {
    if (
      (newUser.currentWeightKG && !user.currentWeightKG) ||
      (newUser.currentWeightLBS && !user.currentWeightLBS) ||
      (newUser.goalWeightKG && !user.goalWeightKG) ||
      (newUser.goalWeightLBS && !user.goalWeightLBS) ||
      (newUser.heightMetric && !user.heightMetric) ||
      (newUser.heightImperial && !user.heightImperial) ||
      newPassword
    ) {
      setUserChanged(true);
    } else if (
      newUser.family_name === user.family_name &&
      newUser.given_name === user.given_name &&
      newUser.preference === user.preference &&
      newUser.age === user.age &&
      newUser.gender === user.gender &&
      newUser.email === user.email &&
      !newUser.currentWeightKG &&
      typeof user.currentWeightKG === "undefined" &&
      !newUser.currentWeightLBS &&
      typeof user.currentWeightLBS === "undefined" &&
      !newUser.goalWeightKG &&
      typeof user.goalWeightKG === "undefined" &&
      !newUser.goalWeightLBS &&
      typeof user.goalWeightLBS === "undefined" &&
      !newUser.heightMetric &&
      typeof user.heightMetric === "undefined" &&
      Array.isArray(newUser.heightImperial) &&
      newUser.heightImperial.length === 2 &&
      newUser.heightImperial[0] === "" &&
      newUser.heightImperial[1] === "" &&
      Array.isArray(user.heightImperial) &&
      user.heightImperial.length === 0 &&
      !newPassword
    ) {
      setUserChanged(false);
    } else if (
      newUser.family_name != user.family_name ||
      newUser.given_name != user.given_name ||
      newUser.preference != user.preference ||
      newUser.age != user.age ||
      newUser.gender != user.gender ||
      newUser.email != user.email ||
      newUser.currentWeightKG != user.currentWeightKG ||
      newUser.currentWeightLBS != user.currentWeightLBS ||
      newUser.goalWeightKG != user.goalWeightKG ||
      newUser.goalWeightLBS != user.goalWeightLBS ||
      newUser.heightMetric != user.heightMetric ||
      newUser.heightImperial != user.heightImperial ||
      newPassword
    ) {
      setUserChanged(true);
    } else {
      setUserChanged(false);
    }
  };

  const handleServingsInput = (e) => {
    setUpdateServings(e.target.value);
    handleUpdateServings(e.target.value);
  };

  const handleFoodDescriptionInput = (e) => {
    setNewFoodDescription(e.target.value);
    setFoodID(e.target.value);
    setFoodInputError("");
    setFoodDetails({
      description: e.target.value,
      brandName: newFoodBrandName,
      brandOwner: newFoodBrandOwner,
      fdcId: newFoodID,
      ingredients: newFoodIngredients,
      servingSize: newFoodServingSize,
      servingSizeUnit: newFoodServingSizeUnit,
      nutrients: [],
      calories: {
        name: "Energy",
        id: 1008,
        amount: foodDetails.calories
          ? foodDetails.calories.amount
            ? foodDetails.calories.amount
            : 0
          : 0,
        amountPerServing: foodDetails.calories
          ? foodDetails.calories.amountPerServing
            ? foodDetails.calories.amountPerServing
            : 0
          : 0,
        unit: "kcal",
        number: 208,
      },
      protein: {
        name: "Protein",
        id: 1003,
        amount: foodDetails.protein
          ? foodDetails.protein.amountPerServing
            ? foodDetails.protein.amountPerServing
            : 0
          : 0,
        amountPerServing: foodDetails.protein
          ? foodDetails.protein.amountPerServing
            ? foodDetails.protein.amountPerServing
            : 0
          : 0,
        unit: "g",
        number: 203,
      },
      fat: {
        name: "Total lipid (fat)",
        id: 1004,
        amount: foodDetails.fat
          ? foodDetails.fat.amount
            ? foodDetails.fat.amount
            : 0
          : 0,
        amountPerServing: foodDetails.fat
          ? foodDetails.fat.amountPerServing
            ? foodDetails.fat.amountPerServing
            : 0
          : 0,
        unit: "g",
        number: 204,
      },
      carbohydrates: {
        name: "Carbohydrate, by difference",
        id: 1005,
        amount: foodDetails.carbohydrates
          ? foodDetails.carbohydrates.amount
            ? foodDetails.carbohydrates.amount
            : 0
          : 0,
        amountPerServing: foodDetails.carbohydrates
          ? foodDetails.carbohydrates.amountPerServing
            ? foodDetails.carbohydrates.amountPerServing
            : 0
          : 0,
        unit: "g",
        number: 205,
      },
    });
  };

  const handleCustomFoodInputCheck = () => {
    if (
      newFoodDescription &&
      (caloriesPerServing > 0 ||
        proteinPerServing > 0 ||
        fatPerServing > 0 ||
        carbohydratesPerServing > 0)
    ) {
      if (initialUser.myFoods.length) {
        if (
          initialUser.myFoods.some((food) => {
            return food.description === newFoodDescription;
          })
        ) {
          setFoodInputError(
            `Your "My Foods" already contain a food with that name.\nPlease enter a unique name.`
          );
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      setFoodInputError(
        "Custom Foods must have a description\n&\nat least one of the nutrients must be > 0"
      );
      return false;
    }
  };

  const handleCaloriesInput = (e) => {
    setFoodInputError("");
    //Using a regex, checks if the text put into the update servings input is a number, decimal, or fraction
    if (numberCheck.test(e.target.value) || e.target.value === "") {
      //checks if the input is a fraction
      if (!Number(e.target.value) && e.target.value != "0") {
        //splits the fraction into a numerator and a denominator
        const [numerator, denominator] = e.target.value.split("/").map(Number);
        //checks if the fraction is a positive number
        if (numerator / denominator < 0) {
          setCaloriesInputError("Please Enter A Valid Number");
          setCaloriesPerServing("");
        } else {
          setCaloriesPerServing(e.target.value);
          setFoodDetails({
            description: newFoodDescription,
            brandName: newFoodBrandName,
            brandOwner: newFoodBrandOwner,
            fdcId: newFoodID,
            ingredients: newFoodIngredients,
            servingSize: newFoodServingSize,
            servingSizeUnit: newFoodServingSizeUnit,
            nutrients: [],
            calories: {
              name: "Energy",
              id: 1008,
              amount:
                e.target.value === ""
                  ? 0
                  : (Number((numerator / denominator).toFixed(2)) /
                      newFoodServingSize) *
                    100,
              amountPerServing:
                e.target.value === ""
                  ? 0
                  : Number((numerator / denominator).toFixed(2)),
              unit: "kcal",
              number: 208,
            },
            protein: {
              name: "Protein",
              id: 1003,
              amount: foodDetails.protein
                ? foodDetails.protein.amount
                  ? foodDetails.protein.amount
                  : 0
                : 0,
              amountPerServing: foodDetails.protein
                ? foodDetails.protein.amountPerServing
                  ? foodDetails.protein.amountPerServing
                  : 0
                : 0,
              unit: "g",
              number: 203,
            },
            fat: {
              name: "Total lipid (fat)",
              id: 1004,
              amount: foodDetails.fat
                ? foodDetails.fat.amount
                  ? foodDetails.fat.amount
                  : 0
                : 0,
              amountPerServing: foodDetails.fat
                ? foodDetails.fat.amountPerServing
                  ? foodDetails.fat.amountPerServing
                  : 0
                : 0,
              unit: "g",
              number: 204,
            },
            carbohydrates: {
              name: "Carbohydrate, by difference",
              id: 1005,
              amount: foodDetails.carbohydrates
                ? foodDetails.carbohydrates.amount
                  ? foodDetails.carbohydrates.amount
                  : 0
                : 0,
              amountPerServing: foodDetails.carbohydrates
                ? foodDetails.carbohydrates.amountPerServing
                  ? foodDetails.carbohydrates.amountPerServing
                  : 0
                : 0,
              unit: "g",
              number: 205,
            },
          });
          setCaloriesInputError("");
        }
      }
      //checks if the number is less than zero
      else if (Number(e.target.value) < 0) {
        setCaloriesInputError("Please Enter A Valid Number");
        setCaloriesPerServing("");
      }
      //updates the number of CaloriesPerServing
      else {
        setCaloriesPerServing(e.target.value);
        setFoodDetails({
          description: newFoodDescription,
          brandName: newFoodBrandName,
          brandOwner: newFoodBrandOwner,
          fdcId: newFoodID,
          ingredients: newFoodIngredients,
          servingSize: newFoodServingSize,
          servingSizeUnit: newFoodServingSizeUnit,
          nutrients: [],
          calories: {
            name: "Energy",
            id: 1008,
            amount:
              e.target.value === ""
                ? 0
                : (Number(Number(e.target.value).toFixed(2)) /
                    newFoodServingSize) *
                  100,
            amountPerServing:
              e.target.value === ""
                ? 0
                : Number(Number(e.target.value).toFixed(2)),
            unit: "kcal",
            number: 208,
          },
          protein: {
            name: "Protein",
            id: 1003,
            amount: foodDetails.protein
              ? foodDetails.protein.amount
                ? foodDetails.protein.amount
                : 0
              : 0,
            amountPerServing: foodDetails.protein
              ? foodDetails.protein.amountPerServing
                ? foodDetails.protein.amountPerServing
                : 0
              : 0,
            unit: "g",
            number: 203,
          },
          fat: {
            name: "Total lipid (fat)",
            id: 1004,
            amount: foodDetails.fat
              ? foodDetails.fat.amount
                ? foodDetails.fat.amount
                : 0
              : 0,
            amountPerServing: foodDetails.fat
              ? foodDetails.fat.amountPerServing
                ? foodDetails.fat.amountPerServing
                : 0
              : 0,
            unit: "g",
            number: 204,
          },
          carbohydrates: {
            name: "Carbohydrate, by difference",
            id: 1005,
            amount: foodDetails.carbohydrates
              ? foodDetails.carbohydrates.amount
                ? foodDetails.carbohydrates.amount
                : 0
              : 0,
            amountPerServing: foodDetails.carbohydrates
              ? foodDetails.carbohydrates.amountPerServing
                ? foodDetails.carbohydrates.amountPerServing
                : 0
              : 0,
            unit: "g",
            number: 205,
          },
        });
        setCaloriesInputError("");
      }
    } else {
      setCaloriesInputError("Please Enter A Valid Number");
      setCaloriesPerServing("");
    }
  };
  const handleProteinInput = (e) => {
    setFoodInputError("");
    //Using a regex, checks if the text put into the update servings input is a number, decimal, or fraction
    if (numberCheck.test(e.target.value) || e.target.value === "") {
      //checks if the input is a fraction
      if (!Number(e.target.value) && e.target.value != "0") {
        //splits the fraction into a numerator and a denominator
        const [numerator, denominator] = e.target.value.split("/").map(Number);
        //checks if the fraction is a positive number
        if (numerator / denominator < 0) {
          setProteinInputError("Please Enter A Valid Number");
          setProteinPerServing("");
        } else {
          setProteinPerServing(e.target.value);
          setFoodDetails({
            description: newFoodDescription,
            brandName: newFoodBrandName,
            brandOwner: newFoodBrandOwner,
            fdcId: newFoodID,
            ingredients: newFoodIngredients,
            servingSize: newFoodServingSize,
            servingSizeUnit: newFoodServingSizeUnit,
            nutrients: [],
            calories: {
              name: "Energy",
              id: 1008,
              amount: foodDetails.calories
                ? foodDetails.calories.amount
                  ? foodDetails.calories.amount
                  : 0
                : 0,
              amountPerServing: foodDetails.calories
                ? foodDetails.calories.amountPerServing
                  ? foodDetails.calories.amountPerServing
                  : 0
                : 0,
              unit: "kcal",
              number: 208,
            },
            protein: {
              name: "Protein",
              id: 1003,
              amount:
                e.target.value === ""
                  ? 0
                  : (Number((numerator / denominator).toFixed(2)) /
                      newFoodServingSize) *
                    100,
              amountPerServing:
                e.target.value === ""
                  ? 0
                  : Number((numerator / denominator).toFixed(2)),
              unit: "g",
              number: 203,
            },
            fat: {
              name: "Total lipid (fat)",
              id: 1004,
              amount: foodDetails.fat
                ? foodDetails.fat.amount
                  ? foodDetails.fat.amount
                  : 0
                : 0,
              amountPerServing: foodDetails.fat
                ? foodDetails.fat.amountPerServing
                  ? foodDetails.fat.amountPerServing
                  : 0
                : 0,
              unit: "g",
              number: 204,
            },
            carbohydrates: {
              name: "Carbohydrate, by difference",
              id: 1005,
              amount: foodDetails.carbohydrates
                ? foodDetails.carbohydrates.amount
                  ? foodDetails.carbohydrates.amount
                  : 0
                : 0,
              amountPerServing: foodDetails.carbohydrates
                ? foodDetails.carbohydrates.amountPerServing
                  ? foodDetails.carbohydrates.amountPerServing
                  : 0
                : 0,
              unit: "g",
              number: 205,
            },
          });
          setProteinInputError("");
        }
      }
      //checks if the number is less than zero
      else if (Number(e.target.value) < 0) {
        setProteinInputError("Please Enter A Valid Number");
        setProteinPerServing("");
      }
      //updates the number of ProteinPerServing
      else {
        setProteinPerServing(e.target.value);
        setFoodDetails({
          description: newFoodDescription,
          brandName: newFoodBrandName,
          brandOwner: newFoodBrandOwner,
          fdcId: newFoodID,
          ingredients: newFoodIngredients,
          servingSize: newFoodServingSize,
          servingSizeUnit: newFoodServingSizeUnit,
          nutrients: [],
          calories: {
            name: "Energy",
            id: 1008,
            amount: foodDetails.calories
              ? foodDetails.calories.amount
                ? foodDetails.calories.amount
                : 0
              : 0,
            amountPerServing: foodDetails.calories
              ? foodDetails.calories.amountPerServing
                ? foodDetails.calories.amountPerServing
                : 0
              : 0,
            unit: "kcal",
            number: 208,
          },
          protein: {
            name: "Protein",
            id: 1003,
            amount:
              e.target.value === ""
                ? 0
                : (Number(Number(e.target.value).toFixed(2)) /
                    newFoodServingSize) *
                  100,
            amountPerServing:
              e.target.value === ""
                ? 0
                : Number(Number(e.target.value).toFixed(2)),
            unit: "g",
            number: 203,
          },
          fat: {
            name: "Total lipid (fat)",
            id: 1004,
            amount: foodDetails.fat
              ? foodDetails.fat.amount
                ? foodDetails.fat.amount
                : 0
              : 0,
            amountPerServing: foodDetails.fat
              ? foodDetails.fat.amountPerServing
                ? foodDetails.fat.amountPerServing
                : 0
              : 0,
            unit: "g",
            number: 204,
          },
          carbohydrates: {
            name: "Carbohydrate, by difference",
            id: 1005,
            amount: foodDetails.carbohydrates
              ? foodDetails.carbohydrates.amount
                ? foodDetails.carbohydrates.amount
                : 0
              : 0,
            amountPerServing: foodDetails.carbohydrates
              ? foodDetails.carbohydrates.amountPerServing
                ? foodDetails.carbohydrates.amountPerServing
                : 0
              : 0,
            unit: "g",
            number: 205,
          },
        });
        setProteinInputError("");
      }
    } else {
      setProteinInputError("Please Enter A Valid Number");
      setProteinPerServing("");
    }
  };
  const handleFatInput = (e) => {
    setFoodInputError("");
    //Using a regex, checks if the text put into the update servings input is a number, decimal, or fraction
    if (numberCheck.test(e.target.value) || e.target.value === "") {
      //checks if the input is a fraction
      if (!Number(e.target.value) && e.target.value != "0") {
        //splits the fraction into a numerator and a denominator
        const [numerator, denominator] = e.target.value.split("/").map(Number);
        //checks if the fraction is a positive number
        if (numerator / denominator < 0) {
          setFatInputError("Please Enter A Valid Number");
          setFatPerServing("");
        } else {
          setFatPerServing(e.target.value);
          setFoodDetails({
            description: newFoodDescription,
            brandName: newFoodBrandName,
            brandOwner: newFoodBrandOwner,
            fdcId: newFoodID,
            ingredients: newFoodIngredients,
            servingSize: newFoodServingSize,
            servingSizeUnit: newFoodServingSizeUnit,
            nutrients: [],
            calories: {
              name: "Energy",
              id: 1008,
              amount: foodDetails.calories
                ? foodDetails.calories.amount
                  ? foodDetails.calories.amount
                  : 0
                : 0,
              amountPerServing: foodDetails.calories
                ? foodDetails.calories.amountPerServing
                  ? foodDetails.calories.amountPerServing
                  : 0
                : 0,
              unit: "kcal",
              number: 208,
            },
            protein: {
              name: "Protein",
              id: 1003,
              amount: foodDetails.protein
                ? foodDetails.protein.amount
                  ? foodDetails.protein.amount
                  : 0
                : 0,
              amountPerServing: foodDetails.protein
                ? foodDetails.protein.amountPerServing
                  ? foodDetails.protein.amountPerServing
                  : 0
                : 0,

              unit: "g",
              number: 203,
            },
            fat: {
              name: "Total lipid (fat)",
              id: 1004,
              amount:
                e.target.value === ""
                  ? 0
                  : (Number((numerator / denominator).toFixed(2)) /
                      newFoodServingSize) *
                    100,
              amountPerServing:
                e.target.value === ""
                  ? 0
                  : Number((numerator / denominator).toFixed(2)),
              unit: "g",
              number: 204,
            },
            carbohydrates: {
              name: "Carbohydrate, by difference",
              id: 1005,
              amount: foodDetails.carbohydrates
                ? foodDetails.carbohydrates.amount
                  ? foodDetails.carbohydrates.amount
                  : 0
                : 0,
              amountPerServing: foodDetails.carbohydrates
                ? foodDetails.carbohydrates.amountPerServing
                  ? foodDetails.carbohydrates.amountPerServing
                  : 0
                : 0,
              unit: "g",
              number: 205,
            },
          });
          setFatInputError("");
        }
      }
      //checks if the number is less than zero
      else if (Number(e.target.value) < 0) {
        setFatInputError("Please Enter A Valid Number");
        setFatPerServing("");
      }
      //updates the number of FatPerServing
      else {
        setFatPerServing(e.target.value);
        setFoodDetails({
          description: newFoodDescription,
          brandName: newFoodBrandName,
          brandOwner: newFoodBrandOwner,
          fdcId: newFoodID,
          ingredients: newFoodIngredients,
          servingSize: newFoodServingSize,
          servingSizeUnit: newFoodServingSizeUnit,
          nutrients: [],
          calories: {
            name: "Energy",
            id: 1008,
            amount: foodDetails.calories
              ? foodDetails.calories.amount
                ? foodDetails.calories.amount
                : 0
              : 0,
            amountPerServing: foodDetails.calories
              ? foodDetails.calories.amountPerServing
                ? foodDetails.calories.amountPerServing
                : 0
              : 0,
            unit: "kcal",
            number: 208,
          },
          protein: {
            name: "Protein",
            id: 1003,
            amount: foodDetails.protein
              ? foodDetails.protein.amount
                ? foodDetails.protein.amount
                : 0
              : 0,
            amountPerServing: foodDetails.protein
              ? foodDetails.protein.amountPerServing
                ? foodDetails.protein.amountPerServing
                : 0
              : 0,

            unit: "g",
            number: 203,
          },
          fat: {
            name: "Total lipid (fat)",
            id: 1004,
            amount:
              e.target.value === ""
                ? 0
                : (Number(Number(e.target.value).toFixed(2)) /
                    newFoodServingSize) *
                  100,
            amountPerServing:
              e.target.value === ""
                ? 0
                : Number(Number(e.target.value).toFixed(2)),
            unit: "g",
            number: 204,
          },
          carbohydrates: {
            name: "Carbohydrate, by difference",
            id: 1005,
            amount: foodDetails.carbohydrates
              ? foodDetails.carbohydrates.amount
                ? foodDetails.carbohydrates.amount
                : 0
              : 0,
            amountPerServing: foodDetails.carbohydrates
              ? foodDetails.carbohydrates.amountPerServing
                ? foodDetails.carbohydrates.amountPerServing
                : 0
              : 0,
            unit: "g",
            number: 205,
          },
        });
        setFatInputError("");
      }
    } else {
      setFatInputError("Please Enter A Valid Number");
      setFatPerServing("");
    }
  };
  const handleCarbohydratesInput = (e) => {
    setFoodInputError("");
    //Using a regex, checks if the text put into the update servings input is a number, decimal, or fraction
    if (numberCheck.test(e.target.value) || e.target.value === "") {
      //checks if the input is a fraction
      if (!Number(e.target.value) && e.target.value != "0") {
        //splits the fraction into a numerator and a denominator
        const [numerator, denominator] = e.target.value.split("/").map(Number);
        //checks if the fraction is a positive number
        if (numerator / denominator < 0) {
          setCarbohydrateInputError("Please Enter A Valid Number");
          setCarbohydratesPerServing("");
        } else {
          setCarbohydratesPerServing(e.target.value);
          setFoodDetails({
            description: newFoodDescription,
            brandName: newFoodBrandName,
            brandOwner: newFoodBrandOwner,
            fdcId: newFoodID,
            ingredients: newFoodIngredients,
            servingSize: newFoodServingSize,
            servingSizeUnit: newFoodServingSizeUnit,
            nutrients: [],
            calories: {
              name: "Energy",
              id: 1008,
              amount: foodDetails.calories
                ? foodDetails.calories.amount
                  ? foodDetails.calories.amount
                  : 0
                : 0,
              amountPerServing: foodDetails.calories
                ? foodDetails.calories.amountPerServing
                  ? foodDetails.calories.amountPerServing
                  : 0
                : 0,
              unit: "kcal",
              number: 208,
            },
            protein: {
              name: "Protein",
              id: 1003,
              amount: foodDetails.protein
                ? foodDetails.protein.amount
                  ? foodDetails.protein.amount
                  : 0
                : 0,
              amountPerServing: foodDetails.protein
                ? foodDetails.protein.amountPerServing
                  ? foodDetails.protein.amountPerServing
                  : 0
                : 0,

              unit: "g",
              number: 203,
            },
            fat: {
              name: "Total lipid (fat)",
              id: 1004,
              amount: foodDetails.fat
                ? foodDetails.fat.amount
                  ? foodDetails.fat.amount
                  : 0
                : 0,
              amountPerServing: foodDetails.fat
                ? foodDetails.fat.amountPerServing
                  ? foodDetails.fat.amountPerServing
                  : 0
                : 0,

              unit: "g",
              number: 204,
            },
            carbohydrates: {
              name: "Carbohydrate, by difference",
              id: 1005,
              amount:
                e.target.value === ""
                  ? 0
                  : (Number((numerator / denominator).toFixed(2)) /
                      newFoodServingSize) *
                    100,
              amountPerServing:
                e.target.value === ""
                  ? 0
                  : Number((numerator / denominator).toFixed(2)),
              unit: "g",
              number: 205,
            },
          });
          setCarbohydrateInputError("");
        }
      }
      //checks if the number is less than zero
      else if (Number(e.target.value) < 0) {
        setCarbohydrateInputError("Please Enter A Valid Number");
        setCarbohydratesPerServing("");
      }
      //updates the number of CarbohydratesPerServing
      else {
        setCarbohydratesPerServing(e.target.value);
        setFoodDetails({
          description: newFoodDescription,
          brandName: newFoodBrandName,
          brandOwner: newFoodBrandOwner,
          fdcId: newFoodID,
          ingredients: newFoodIngredients,
          servingSize: newFoodServingSize,
          servingSizeUnit: newFoodServingSizeUnit,
          nutrients: [],
          calories: {
            name: "Energy",
            id: 1008,
            amount: foodDetails.calories
              ? foodDetails.calories.amount
                ? foodDetails.calories.amount
                : 0
              : 0,
            amountPerServing: foodDetails.calories
              ? foodDetails.calories.amountPerServing
                ? foodDetails.calories.amountPerServing
                : 0
              : 0,
            unit: "kcal",
            number: 208,
          },
          protein: {
            name: "Protein",
            id: 1003,
            amount: foodDetails.protein
              ? foodDetails.protein.amount
                ? foodDetails.protein.amount
                : 0
              : 0,
            amountPerServing: foodDetails.protein
              ? foodDetails.protein.amountPerServing
                ? foodDetails.protein.amountPerServing
                : 0
              : 0,

            unit: "g",
            number: 203,
          },
          fat: {
            name: "Total lipid (fat)",
            id: 1004,
            amount: foodDetails.fat
              ? foodDetails.fat.amount
                ? foodDetails.fat.amount
                : 0
              : 0,
            amountPerServing: foodDetails.fat
              ? foodDetails.fat.amountPerServing
                ? foodDetails.fat.amountPerServing
                : 0
              : 0,
            unit: "g",
            number: 204,
          },
          carbohydrates: {
            name: "Carbohydrate, by difference",
            id: 1005,
            amount:
              e.target.value === ""
                ? 0
                : (Number(Number(e.target.value).toFixed(2)) /
                    newFoodServingSize) *
                  100,
            amountPerServing:
              e.target.value === ""
                ? 0
                : Number(Number(e.target.value).toFixed(2)),
            unit: "g",
            number: 205,
          },
        });
        setCarbohydrateInputError("");
      }
    } else {
      setCarbohydrateInputError("Please Enter A Valid Number");
      setCarbohydratesPerServing("");
    }
  };
  const handleSaveToMyFoods = (user) => {
    setUpdating(true);
    if (user.myFoods.length) {
      if (
        user.myFoods.some((food) => {
          return food.description === foodDetails.description;
        })
      ) {
        console.log("ERROR");
      } else {
        user.myFoods.push(foodDetails);
      }
    } else {
      user.myFoods = [foodDetails];
    }
    fetch(`/api/getUser/${session.user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json(); // Parse response if status is 201
        } else if (response.status === 400) {
          throw new Error("Adding to Meal Failed, Please Try Again"); // Handle 400 error
        } else {
          throw new Error(`Unexpected status: ${response.status}`);
        }
      }) // Parse JSON response
      .then((data) => {
        setInitialUser({ ...data });
        setUpdatedUser({ ...data });
        setFamily_name(data.family_name);
        setGiven_name(data.given_name);
        setAge(data.age ? data.age : "");
        setEmail(data.email ? data.email : "");
        setGoalWeightKG(data.goalWeightKG ? data.goalWeightKG : "");
        setCurrentWeightKG(data.currentWeightKG ? data.currentWeightKG : "");
        setGoalWeightLBS(data.goalWeightLBS ? data.goalWeightLBS : "");
        setCurrentWeightLBS(data.currentWeightLBS ? data.currentWeightLBS : "");
        setPreference(data.preference ? data.preference : "Metric");
        setGender(data.gender ? data.gender : "Male");
        setHeightImperial(
          data.heightImperial[0]
            ? [data.heightImperial[0], data.heightImperial[1]]
            : ["", ""]
        );
        setHeightMetric(data.heightMetric ? data.heightMetric : "");
        if (
          data.heightMetric &&
          data.heightImperial[0] &&
          data.currentWeightLBS &&
          data.currentWeightKG &&
          (data.heightImperial[1] === 0 || data.heightImperial[1])
        ) {
          setBMIKG(
            data.bmiKG
              ? typeof data.bmiKG === "number"
                ? Number(data.bmiKG)
                : "TBD"
              : Number(data.currentWeightKG) /
                  (Number(data.heightMetric) / 100) ** 2
          );
          setBMILBS(
            data.bmiLBS
              ? typeof data.bmiLBS === "number"
                ? data.bmiLBS
                : "TBD"
              : (Number(data.currentWeightLBS) * 703) /
                  Math.pow(
                    Number(data.heightImperial[0]) * 12 +
                      Number(data.heightImperial[1]),
                    2
                  )
          );
        }
        setWeightLossPerWeekKG(
          data.weightLossPerWeekKG ? data.weightLossPerWeekKG : 0
        );
        setWeightLossPerWeekLBS(
          data.weightLossPerWeekLBS ? data.weightLossPerWeekLBS : 0
        );
        setActivityLevel(data.activityLevel ? data.activityLevel : 1.2);
        setDailyCalorieGoal(
          data.dailyCalorieGoal
            ? data.dailyCalorieGoal
            : data.weightLossPerWeekLBS &&
              data.gender === "Male" &&
              data.currentWeightKG &&
              data.heightMetric &&
              data.age &&
              data.activityLevel
            ? Number(
                (10 * data.currentWeightKG +
                  6.25 * data.heightMetric -
                  5 * data.age +
                  5) *
                  data.activityLevel -
                  (data.weightLossPerWeekLBS * 3500) / 7
              )
            : data.weightLossPerWeekLBS &&
              data.gender === "Female" &&
              data.currentWeightKG &&
              data.heightMetric &&
              data.age &&
              data.activityLevel
            ? Number(
                (10 * data.currentWeightKG +
                  6.25 * data.heightMetric -
                  5 * data.age -
                  161) *
                  data.activityLevel -
                  (data.weightLossPerWeekLBS * 3500) / 7
              )
            : "TBD"
        );

        setProfilePicture(data.profilePicture ? data.profilePicture : "");
        if (data.days.length) {
          if (!averageMacros) {
            handleAverageMacroCalculation(data);
          }
          if (data.days.some((day) => day.date === selectedDateFormatted)) {
            setPreviousData(true);
            const previousDataIndex = data.days.findIndex(
              (day) => day.date === selectedDateFormatted
            );
            setIndexOfPreviousData(previousDataIndex);
            if (data.days[previousDataIndex].totals.calories) {
              setDailyMacros([
                {
                  name: "Protein",
                  value:
                    data.days[previousDataIndex].totals.proteinPercentage * 100,
                },
                {
                  name: "Carbohydrate",
                  value:
                    data.days[previousDataIndex].totals.carbohydratePercentage *
                    100,
                },
                {
                  name: "Fat",
                  value: Number(
                    (
                      data.days[previousDataIndex].totals.fatPercentage * 100
                    ).toFixed(2)
                  ),
                },
              ]);
              setDailyMacrosGrams([
                {
                  name: "Protein",
                  value: data.days[previousDataIndex].totals.protein,
                },
                {
                  name: "Carbohydrate",
                  value: data.days[previousDataIndex].totals.carbohydrates,
                },
                {
                  name: "Fat",
                  value: data.days[previousDataIndex].totals.fat,
                },
              ]);
            }
          } else {
            setPreviousData(false);
            setIndexOfPreviousData(-1);
            setDailyMacros("");
            setDailyMacrosGrams("");
            setTabActiveKey("averageMacros");
          }
        }
        setUserChanged(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
        setUpdating(false);
      }) // Handle data
      .catch((error) => {
        console.error("Error:", error);
        setInitialUser(initialUser);
        setUpdatedUser(initialUser);
        setUserChanged(false);
        setUpdating(false);
      }) // Handle errors
      .finally(() => {
        setUpdating(false);
      });
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddFoodItem = (meal) => {
    setCurrentMeal(meal);
    setFoodEntry(true);
  };

  const handleFoodLookUp = () => {
    setSearchModal(true);
    setFoodEntry(false);
  };

  const handleSaveChanges = (user) => {
    setIsLoading(true);
    fetch(`/api/getUser/${session.user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: user ? JSON.stringify(user) : JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json(); // Parse response if status is 201
        } else if (response.status === 400) {
          throw new Error("Adding to Meal Failed, Please Try Again"); // Handle 400 error
        } else {
          throw new Error(`Unexpected status: ${response.status}`);
        }
      }) // Parse JSON response
      .then((data) => {
        setInitialUser({ ...data });
        setUpdatedUser({ ...data });
        setFamily_name(data.family_name);
        setGiven_name(data.given_name);
        setAge(data.age ? data.age : "");
        setEmail(data.email ? data.email : "");
        setGoalWeightKG(data.goalWeightKG ? data.goalWeightKG : "");
        setCurrentWeightKG(data.currentWeightKG ? data.currentWeightKG : "");
        setGoalWeightLBS(data.goalWeightLBS ? data.goalWeightLBS : "");
        setCurrentWeightLBS(data.currentWeightLBS ? data.currentWeightLBS : "");
        setPreference(data.preference ? data.preference : "Metric");
        setGender(data.gender ? data.gender : "Male");
        setHeightImperial(
          data.heightImperial[0]
            ? [data.heightImperial[0], data.heightImperial[1]]
            : ["", ""]
        );
        setHeightMetric(data.heightMetric ? data.heightMetric : "");
        if (
          data.heightMetric &&
          data.heightImperial[0] &&
          data.currentWeightLBS &&
          data.currentWeightKG &&
          (data.heightImperial[1] === 0 || data.heightImperial[1])
        ) {
          setBMIKG(
            data.bmiKG
              ? typeof data.bmiKG === "number"
                ? Number(data.bmiKG)
                : "TBD"
              : Number(data.currentWeightKG) /
                  (Number(data.heightMetric) / 100) ** 2
          );
          setBMILBS(
            data.bmiLBS
              ? typeof data.bmiLBS === "number"
                ? data.bmiLBS
                : "TBD"
              : (Number(data.currentWeightLBS) * 703) /
                  Math.pow(
                    Number(data.heightImperial[0]) * 12 +
                      Number(data.heightImperial[1]),
                    2
                  )
          );
        }
        setWeightLossPerWeekKG(
          data.weightLossPerWeekKG ? data.weightLossPerWeekKG : 0
        );
        setWeightLossPerWeekLBS(
          data.weightLossPerWeekLBS ? data.weightLossPerWeekLBS : 0
        );
        setActivityLevel(data.activityLevel ? data.activityLevel : 1.2);
        setDailyCalorieGoal(
          data.dailyCalorieGoal
            ? data.dailyCalorieGoal
            : data.weightLossPerWeekLBS &&
              data.gender === "Male" &&
              data.currentWeightKG &&
              data.heightMetric &&
              data.age &&
              data.activityLevel
            ? Number(
                (10 * data.currentWeightKG +
                  6.25 * data.heightMetric -
                  5 * data.age +
                  5) *
                  data.activityLevel -
                  (data.weightLossPerWeekLBS * 3500) / 7
              )
            : data.weightLossPerWeekLBS &&
              data.gender === "Female" &&
              data.currentWeightKG &&
              data.heightMetric &&
              data.age &&
              data.activityLevel
            ? Number(
                (10 * data.currentWeightKG +
                  6.25 * data.heightMetric -
                  5 * data.age -
                  161) *
                  data.activityLevel -
                  (data.weightLossPerWeekLBS * 3500) / 7
              )
            : "TBD"
        );

        setProfilePicture(data.profilePicture ? data.profilePicture : "");
        if (data.days.length) {
          if (!averageMacros) {
            handleAverageMacroCalculation(data);
          }
          if (data.days.some((day) => day.date === selectedDateFormatted)) {
            setPreviousData(true);
            const previousDataIndex = data.days.findIndex(
              (day) => day.date === selectedDateFormatted
            );
            setIndexOfPreviousData(previousDataIndex);
            if (data.days[previousDataIndex].totals.calories) {
              setDailyMacros([
                {
                  name: "Protein",
                  value:
                    data.days[previousDataIndex].totals.proteinPercentage * 100,
                },
                {
                  name: "Carbohydrate",
                  value:
                    data.days[previousDataIndex].totals.carbohydratePercentage *
                    100,
                },
                {
                  name: "Fat",
                  value: Number(
                    (
                      data.days[previousDataIndex].totals.fatPercentage * 100
                    ).toFixed(2)
                  ),
                },
              ]);
              setDailyMacrosGrams([
                {
                  name: "Protein",
                  value: data.days[previousDataIndex].totals.protein,
                },
                {
                  name: "Carbohydrate",
                  value: data.days[previousDataIndex].totals.carbohydrates,
                },
                {
                  name: "Fat",
                  value: data.days[previousDataIndex].totals.fat,
                },
              ]);
            }
          } else {
            setPreviousData(false);
            setIndexOfPreviousData(-1);
            setDailyMacros("");
            setDailyMacrosGrams("");
            setTabActiveKey("averageMacros");
          }
        }
        setUserChanged(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
        setIsLoading(false);
      }) // Handle data
      .catch((error) => {
        console.error("Error:", error);
        setInitialUser(initialUser);
        setUpdatedUser(initialUser);
        setUserChanged(false);
        setIsLoading(false);
      }); // Handle errors
  };

  const handleCancelUserChanges = () => {
    setUserChanged(false);
    setUpdatedUser(initialUser);
    handleAverageMacroCalculation(initialUser);
    if (
      !initialUser.days[indexOfPreviousData] ||
      !initialUser.days[indexOfPreviousData].totals.calories
    ) {
      setPreviousData(false);
      setDailyMacros("");
      setDailyMacrosGrams("");
      setTabActiveKey("averageMacros");
    }
  };

  const handleIncreaseDate = () => {
    setSelectedDate(addDays(selectedDate, 1));
    handleFormatDate(addDays(selectedDate, 1));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleFormatDate(date);
  };

  const handleReduceDate = () => {
    setSelectedDate(addDays(selectedDate, -1));
    handleFormatDate(addDays(selectedDate, -1));
  };

  const handleAverageMacroCalculation = (user) => {
    let protein = 0;
    let carbohydrates = 0;
    let fat = 0;
    let calories = 0;
    if (user.days.length) {
      user.days.forEach((day) => {
        protein = day.totals.protein ? protein + day.totals.protein : protein;
        carbohydrates = day.totals.carbohydrates
          ? carbohydrates + day.totals.carbohydrates
          : carbohydrates;
        fat = day.totals.fat ? fat + day.totals.fat : fat;
      });

      calories = protein * 4 + carbohydrates * 4 + fat * 9;
      let foodEaten = 0;
      user.days.forEach((day) => {
        foodEaten = day.totals.calories
          ? foodEaten + day.totals.calories
          : foodEaten;
      });
      if (foodEaten) {
        setAverageMacros([
          {
            name: "Protein",
            value: Number((((protein * 4) / calories) * 100).toFixed(2)),
          },
          {
            name: "Carbohydrates",
            value: Number((((carbohydrates * 4) / calories) * 100).toFixed(2)),
          },
          {
            name: "Fat",
            value: Number((((fat * 9) / calories) * 100).toFixed(2)),
          },
        ]);
        setAverageMacrosGrams([
          {
            name: "Protein",
            value: Number((protein / (user.days.length - 1)).toFixed(2)),
          },
          {
            name: "Carbohydrates",
            value: Number((carbohydrates / (user.days.length - 1)).toFixed(2)),
          },
          {
            name: "Fat",
            value: Number((fat / (user.days.length - 1)).toFixed(2)),
          },
        ]);
      } else {
        setAverageMacros("");
        setAverageMacrosGrams("");
      }
    } else {
      setAverageMacros("");
      setAverageMacrosGrams("");
    }
  };

  const handleUpdateDailyTotals = (user, index, customFood) => {
    let updatedDailyTotals = {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      proteinPercentage: 0,
      carbohydratePercentage: 0,
      fatPercentage: 0,
    };
    //checks if the user had any food during each of the meal options and returns a truthy or a falsy response
    const hadBreakfast = user.days[index].breakfast.foodItems.length;
    const hadLunch = user.days[index].lunch.foodItems.length;
    const hadDinner = user.days[index].dinner.foodItems.length;
    const hadSnacks = user.days[index].snacks.foodItems.length;

    //creates a breakfast.calories, breakfast.protein, breakfast.carbohydrates, & breakfast.fat overall amount
    if (hadBreakfast) {
      user.days[index].breakfast.calories = 0;
      user.days[index].breakfast.protein = 0;
      user.days[index].breakfast.carbohydrates = 0;
      user.days[index].breakfast.fat = 0;
      user.days[index].breakfast.foodItems.forEach((foodItem) => {
        user.days[index].breakfast.calories =
          user.days[index].breakfast.calories + foodItem.calories.amountEaten;
        user.days[index].breakfast.protein =
          user.days[index].breakfast.protein + foodItem.protein.amountEaten;
        user.days[index].breakfast.carbohydrates =
          user.days[index].breakfast.carbohydrates +
          foodItem.carbohydrates.amountEaten;
        user.days[index].breakfast.fat =
          user.days[index].breakfast.fat + foodItem.fat.amountEaten;
      });
    } else {
      user.days[index].breakfast.calories = 0;
      user.days[index].breakfast.protein = 0;
      user.days[index].breakfast.carbohydrates = 0;
      user.days[index].breakfast.fat = 0;
    }
    //creates a lunch.calories, lunch.protein, lunch.carbohydrates, & lunch.fat overall amount
    if (hadLunch) {
      user.days[index].lunch.calories = 0;
      user.days[index].lunch.protein = 0;
      user.days[index].lunch.carbohydrates = 0;
      user.days[index].lunch.fat = 0;
      user.days[index].lunch.foodItems.forEach((foodItem) => {
        user.days[index].lunch.calories =
          user.days[index].lunch.calories + foodItem.calories.amountEaten;
        user.days[index].lunch.protein =
          user.days[index].lunch.protein + foodItem.protein.amountEaten;
        user.days[index].lunch.carbohydrates =
          user.days[index].lunch.carbohydrates +
          foodItem.carbohydrates.amountEaten;
        user.days[index].lunch.fat =
          user.days[index].lunch.fat + foodItem.fat.amountEaten;
      });
    } else {
      user.days[index].lunch.calories = 0;
      user.days[index].lunch.protein = 0;
      user.days[index].lunch.carbohydrates = 0;
      user.days[index].lunch.fat = 0;
    }
    //creates a dinner.calories, dinner.protein, dinner.carbohydrates, & dinner.fat overall amount
    if (hadDinner) {
      user.days[index].dinner.calories = 0;
      user.days[index].dinner.protein = 0;
      user.days[index].dinner.carbohydrates = 0;
      user.days[index].dinner.fat = 0;
      user.days[index].dinner.foodItems.forEach((foodItem) => {
        user.days[index].dinner.calories =
          user.days[index].dinner.calories + foodItem.calories.amountEaten;
        user.days[index].dinner.protein =
          user.days[index].dinner.protein + foodItem.protein.amountEaten;
        user.days[index].dinner.carbohydrates =
          user.days[index].dinner.carbohydrates +
          foodItem.carbohydrates.amountEaten;
        user.days[index].dinner.fat =
          user.days[index].dinner.fat + foodItem.fat.amountEaten;
      });
    } else {
      user.days[index].dinner.calories = 0;
      user.days[index].dinner.protein = 0;
      user.days[index].dinner.carbohydrates = 0;
      user.days[index].dinner.fat = 0;
    }
    //creates a snacks.calories, snacks.protein, snacks.carbohydrates, & snacks.fat overall amount
    if (hadSnacks) {
      user.days[index].snacks.calories = 0;
      user.days[index].snacks.protein = 0;
      user.days[index].snacks.carbohydrates = 0;
      user.days[index].snacks.fat = 0;
      user.days[index].snacks.foodItems.forEach((foodItem) => {
        user.days[index].snacks.calories =
          user.days[index].snacks.calories + foodItem.calories.amountEaten;
        user.days[index].snacks.protein =
          user.days[index].snacks.protein + foodItem.protein.amountEaten;
        user.days[index].snacks.carbohydrates =
          user.days[index].snacks.carbohydrates +
          foodItem.carbohydrates.amountEaten;
        user.days[index].snacks.fat =
          user.days[index].snacks.fat + foodItem.fat.amountEaten;
      });
    } else {
      user.days[index].snacks.calories = 0;
      user.days[index].snacks.protein = 0;
      user.days[index].snacks.carbohydrates = 0;
      user.days[index].snacks.fat = 0;
    }

    //adds up all the calories from each meal
    updatedDailyTotals.calories =
      user.days[index].breakfast.calories +
      user.days[index].lunch.calories +
      user.days[index].dinner.calories +
      user.days[index].snacks.calories;

    //adds up all the protein from each meal
    updatedDailyTotals.protein =
      user.days[index].breakfast.protein +
      user.days[index].lunch.protein +
      user.days[index].dinner.protein +
      user.days[index].snacks.protein;

    //adds up all the carbohydrates from each meal
    updatedDailyTotals.carbohydrates =
      user.days[index].breakfast.carbohydrates +
      user.days[index].lunch.carbohydrates +
      user.days[index].dinner.carbohydrates +
      user.days[index].snacks.carbohydrates;

    //adds up all the fat from each meal
    updatedDailyTotals.fat =
      user.days[index].breakfast.fat +
      user.days[index].lunch.fat +
      user.days[index].dinner.fat +
      user.days[index].snacks.fat;

    //calculates the total calories based on the grams of fat, carbs, & protein eaten based on 9cal/1g fat, 4cal/1g carbs, & 4cal/1g protein (not identical to calories provided in database)
    const totalDailyCalculatedCaloriesEaten =
      updatedDailyTotals.fat * 9 +
      updatedDailyTotals.carbohydrates * 4 +
      updatedDailyTotals.protein * 4;

    //calculates protein, carb, & fat percentages based on the calculated calories eaten (not the one given in the database)
    updatedDailyTotals.proteinPercentage = Number(
      (
        ((updatedDailyTotals.protein * 4) / totalDailyCalculatedCaloriesEaten) *
        100
      ).toFixed(2)
    );
    updatedDailyTotals.carbohydratePercentage = Number(
      (
        ((updatedDailyTotals.carbohydrates * 4) /
          totalDailyCalculatedCaloriesEaten) *
        100
      ).toFixed(2)
    );
    updatedDailyTotals.fatPercentage = Number(
      (
        ((updatedDailyTotals.fat * 9) / totalDailyCalculatedCaloriesEaten) *
        100
      ).toFixed(2)
    );
    //updates the daily totals in the user object
    user.days[index].totals = updatedDailyTotals;
    if (!user.days[index].totals.calories) {
      setDailyMacros("");
      setDailyMacrosGrams("");
      setTabActiveKey("averageMacros");
    } else {
      setDailyMacros([
        {
          name: "Protein",
          value: user.days[index].totals.proteinPercentage * 100,
        },
        {
          name: "Carbohydrate",
          value: user.days[index].totals.carbohydratePercentage * 100,
        },
        {
          name: "Fat",
          value: Number(
            (user.days[index].totals.fatPercentage * 100).toFixed(2)
          ),
        },
      ]);
      setDailyMacrosGrams([
        { name: "Protein", value: user.days[index].totals.protein },
        { name: "Fat", value: user.days[index].totals.fat },
        { name: "Carbohydrates", value: user.days[index].totals.carbohydrates },
      ]);
    }
    handleAverageMacroCalculation(user);

    if (customFood === "My Foods") {
      handleSaveToMyFoods(user);
    } else if (customFood === "Close") {
      handleSaveChanges(user);
    } else {
      setUpdatedUser(user);
    }
  };

  const handleUpdateMealTotals = (user, meal, index, customFood) => {
    let updatedMealTotals = {};
    let totalCalculatedCaloriesEaten = 0;
    updatedMealTotals[meal] = {
      foodItems: [],
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      proteinPercentage: 0,
      fatPercentage: 0,
      carbohydratePercentage: 0,
    };
    if (user.days[index][meal].foodItems.length) {
      user.days[index][meal].foodItems.forEach((foodItem) => {
        //calculates total number of calories eaten
        updatedMealTotals[meal].calories =
          updatedMealTotals[meal].calories + foodItem.calories.amountEaten;
        //calculates total number of protein eaten
        updatedMealTotals[meal].protein =
          updatedMealTotals[meal].protein + foodItem.protein.amountEaten;
        //calculates total number of carbs eaten
        updatedMealTotals[meal].carbohydrates =
          updatedMealTotals[meal].carbohydrates +
          foodItem.carbohydrates.amountEaten;
        //calculates total number of fat eaten
        updatedMealTotals[meal].fat =
          updatedMealTotals[meal].fat + foodItem.fat.amountEaten;
        //calculates the total calories based on the grams of fat, carbs, & protein eaten based on 9cal/1g fat, 4cal/1g carbs, & 4cal/1g protein (not identical to calories provided in database)
        totalCalculatedCaloriesEaten =
          totalCalculatedCaloriesEaten +
          (foodItem.fat.amountEaten * 9 +
            foodItem.carbohydrates.amountEaten * 4 +
            foodItem.protein.amountEaten * 4);
      });
      //calculates protein, carb, & fat percentages based on the calculated calories eaten (not the one given in the database)
      updatedMealTotals[meal].proteinPercentage = Number(
        (
          ((updatedMealTotals[meal].protein * 4) /
            totalCalculatedCaloriesEaten) *
          100
        ).toFixed(2)
      );
      updatedMealTotals[meal].carbohydratePercentage = Number(
        (
          ((updatedMealTotals[meal].carbohydrates * 4) /
            totalCalculatedCaloriesEaten) *
          100
        ).toFixed(2)
      );
      updatedMealTotals[meal].fatPercentage = Number(
        (
          ((updatedMealTotals[meal].fat * 9) / totalCalculatedCaloriesEaten) *
          100
        ).toFixed(2)
      );
      //adds the food items back into the updated meals
      updatedMealTotals[meal].foodItems = user.days[index][meal].foodItems;
    }
    user.days[index][meal] = updatedMealTotals[meal];
    handleUpdateDailyTotals(user, index, customFood);
  };

  const handleDeleteFoodItem = (e) => {
    let user = structuredClone(updatedUser);
    user.days[indexOfPreviousData][e.target.title].foodItems.splice(
      e.target.id,
      1
    );
    handleUpdateMealTotals(user, e.target.title, indexOfPreviousData);
    setUserChanged(true);
  };

  const handleAddToMeal = (customFood) => {
    let user = structuredClone(updatedUser);
    //checks if the date already exists in the user object
    if (user.days.some((day) => day.date === selectedDateFormatted)) {
      //finds the index of the day that already exists in the user.days object
      const index = user.days.findIndex(
        (day) => day.date === selectedDateFormatted
      );
      //Creates the food item with the specific amount eaten of that food
      const foodItem = {
        brandOwner: foodDetails.brandOwner,
        calories: {
          name: foodDetails.calories.name,
          amount: foodDetails.calories.amount,
          amountPerServing: foodDetails.calories.amountPerServing,
          id: foodDetails.calories.id,
          number: foodDetails.calories.number,
          unit: foodDetails.calories.unit,
          amountEaten: foodDetails.calories.amountPerServing * servings,
          servings: servings,
        },
        protein: {
          name: foodDetails.protein.name,
          amount: foodDetails.protein.amount,
          amountPerServing: foodDetails.protein.amountPerServing,
          id: foodDetails.protein.id,
          number: foodDetails.protein.number,
          unit: foodDetails.protein.unit,
          amountEaten: foodDetails.protein.amountPerServing * servings,
          servings: servings,
        },
        fat: {
          name: foodDetails.fat.name,
          amount: foodDetails.fat.amount,
          amountPerServing: foodDetails.fat.amountPerServing,
          id: foodDetails.fat.id,
          number: foodDetails.fat.number,
          unit: foodDetails.fat.unit,
          amountEaten: foodDetails.fat.amountPerServing * servings,
          servings: servings,
        },
        carbohydrates: {
          name: foodDetails.carbohydrates.name,
          amount: foodDetails.carbohydrates.amount,
          amountPerServing: foodDetails.carbohydrates.amountPerServing,
          id: foodDetails.carbohydrates.id,
          number: foodDetails.carbohydrates.number,
          unit: foodDetails.carbohydrates.unit,
          amountEaten: foodDetails.carbohydrates.amountPerServing * servings,
          servings: servings,
        },
        description: foodDetails.description,
        fdcId: foodDetails.fdcId,
        ingredients: foodDetails.ingredients,
        nutrients: foodDetails.nutrients.length
          ? foodDetails.nutrients.map((nutrient) => {
              return {
                name: nutrient.name,
                number: nutrient.number,
                unit: nutrient.unit,
                amountPerServing: nutrient.amountPerServing,
                amount: nutrient.amount,
                servingsEaten: servings,
                amountEaten: nutrient.amountPerServing * servings,
              };
            })
          : null,
      };
      //adds the food item to the specific date and meal of the user
      user.days[index][currentMeal].foodItems.push(foodItem);
      handleUpdateMealTotals(user, currentMeal, index, customFood);
      setPreviousData(true);
      setIndexOfPreviousData(index);
      setUserChanged(true);
      setResults({ foods: [] });
      setSearch("");
      setCurrentSearch("");
      setUpdateServings("");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
      setIsModalOpen(false);

      setServings(1);
    } else {
      //creates a blank day for the user for the new date
      user.days.push({
        date: selectedDateFormatted,
        americanDate: americanDate,
        weightKG: user.currentWeightKG,
        goalWeightKG: user.goalWeightKG,
        weightLBS: user.currentWeightLBS,
        goalWeightLBS: user.goalWeightLBS,
        breakfast: {
          foodItems: [],
          calories: 0,
          carbohydrates: 0,
          protein: 0,
          fat: 0,
          proteinPercentage: 0,
          fatPercentage: 0,
          carbohydratePercentage: 0,
        },
        lunch: {
          foodItems: [],
          calories: 0,
          carbohydrates: 0,
          protein: 0,
          fat: 0,
          proteinPercentage: 0,
          fatPercentage: 0,
          carbohydratePercentage: 0,
        },
        dinner: {
          foodItems: [],
          calories: 0,
          carbohydrates: 0,
          protein: 0,
          fat: 0,
          proteinPercentage: 0,
          fatPercentage: 0,
          carbohydratePercentage: 0,
        },
        snacks: {
          foodItems: [],
          calories: 0,
          carbohydrates: 0,
          protein: 0,
          fat: 0,
          proteinPercentage: 0,
          fatPercentage: 0,
          carbohydratePercentage: 0,
        },
        totals: {
          calories: 0,
          carbohydrates: 0,
          protein: 0,
          fat: 0,
          proteinPercentage: 0,
          fatPercentage: 0,
          carbohydratePercentage: 0,
        },
      });
      user.days.sort((a, b) => a.date.localeCompare(b.date));
      //Creates the food item with the specific amount eaten of that food
      const foodItem = {
        brandOwner: foodDetails.brandOwner,
        calories: {
          name: foodDetails.calories.name,
          amount: foodDetails.calories.amount,
          amountPerServing: foodDetails.calories.amountPerServing,
          id: foodDetails.calories.id,
          number: foodDetails.calories.number,
          unit: foodDetails.calories.unit,
          amountEaten: foodDetails.calories.amountPerServing * servings,
          servings: servings,
        },
        protein: {
          name: foodDetails.protein.name,
          amount: foodDetails.protein.amount,
          amountPerServing: foodDetails.protein.amountPerServing,
          id: foodDetails.protein.id,
          number: foodDetails.protein.number,
          unit: foodDetails.protein.unit,
          amountEaten: foodDetails.protein.amountPerServing * servings,
          servings: servings,
        },
        fat: {
          name: foodDetails.fat.name,
          amount: foodDetails.fat.amount,
          amountPerServing: foodDetails.fat.amountPerServing,
          id: foodDetails.fat.id,
          number: foodDetails.fat.number,
          unit: foodDetails.fat.unit,
          amountEaten: foodDetails.fat.amountPerServing * servings,
          servings: servings,
        },
        carbohydrates: {
          name: foodDetails.carbohydrates.name,
          amount: foodDetails.carbohydrates.amount,
          amountPerServing: foodDetails.carbohydrates.amountPerServing,
          id: foodDetails.carbohydrates.id,
          number: foodDetails.carbohydrates.number,
          unit: foodDetails.carbohydrates.unit,
          amountEaten: foodDetails.carbohydrates.amountPerServing * servings,
          servings: servings,
        },
        description: foodDetails.description,
        fdcId: foodDetails.fdcId,
        ingredients: foodDetails.ingredients,
        nutrients: foodDetails.nutrients.map((nutrient) => {
          return {
            name: nutrient.name,
            number: nutrient.number,
            unit: nutrient.unit,
            amountPerServing: nutrient.amountPerServing,
            amount: nutrient.amount,
            servingsEaten: servings,
            amountEaten: nutrient.amountPerServing * servings,
          };
        }),
      };
      //finds the index of the day that already exists in the user.days object
      const index = user.days.findIndex(
        (day) => day.date === selectedDateFormatted
      );
      //adds the food item to the specific date and meal of the user
      user.days[index][currentMeal].foodItems.push(foodItem);
      handleUpdateMealTotals(user, currentMeal, index, customFood);
      setPreviousData(true);
      setIndexOfPreviousData(index);
      setUserChanged(true);
      setResults({ foods: [] });
      setSearch("");
      setCurrentSearch("");
      setUpdateServings("");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
      setIsModalOpen(false);
      setServings(1);
    }
  };
  const handleFormatDate = (date) => {
    setSelectedDateFormatted(
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`
    );
    setAmericanDate(
      `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
        date.getDate()
      ).padStart(2, "0")}-${date.getFullYear()}`
    );
  };

  const handleUpdateServings = (updateServings) => {
    //Using a regex, checks if the text put into the update servings input is a number, decimal, or fraction
    if (numberCheck.test(updateServings)) {
      //checks if the input is a fraction
      if (!Number(updateServings) && updateServings != "0") {
        //splits the fraction into a numerator and a denominator
        const [numerator, denominator] = updateServings.split("/").map(Number);
        //checks if the fraction is a positive number
        if (numerator / denominator < 0) {
          setInputError("Please Enter A Valid Number");
          setServings(1);
        } else {
          setServings(Number((numerator / denominator).toFixed(2)));
          setInputError("");
        }
      }
      //checks if the number is less than zero or equal to zero
      else if (Number(updateServings) < 0 || updateServings === "0") {
        setInputError("Please Enter A Valid Number");
        setServings(1);
      }
      //updates the number of servings
      else {
        setServings(Number(updateServings));
        //setUpdateServings("");
        setInputError("");
      }
    } else if (updateServings === "") {
      setServings(1);
    } else {
      setInputError("Please Enter A Valid Number");
      setServings(1);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchModal(true);
    setInputError("");
    setUpdateServings("");
    setServings(1);
  };

  const handleCloseFoodEntryModal = () => {
    setFoodEntry(false);
    setFoodDetails([]);
  };

  const handleCustomFoodEntry = () => {
    setNewFood(true);
    setFoodEntry(false);
  };
  const handleCloseNewFoodModal = () => {
    setNewFood(false);
    setNewFoodDescription("");
    setCaloriesPerServing("");
    setProteinPerServing("");
    setFatPerServing("");
    setCarbohydratesPerServing("");
    setFoodEntry(true);
    setFoodInputError("");
    setCaloriesInputError("");
    setCarbohydrateInputError("");
    setProteinInputError("");
    setFatInputError("");
    setUpdateServings("");
    setFoodDetails([]);
  };
  const handleMyFoodsModal = () => {
    setMyFoods(true);
    setFoodEntry(false);
  };
  const handleCloseMyFoodsModal = () => {
    setFoodEntry(true);
    setMyFoods(false);
  };
  const handleCloseSearchModal = () => {
    setSearchModal(false);
    setFoodEntry(true);
    setResults({ foods: [] });
    setSearch("");
    setCurrentSearch("");
  };

  const handleFoodChoice = (e) => {
    setSearchModal(false);
    setIsModalOpen(true);
    setFoodDetailsLoading(true);
    fetch(`/api/usdaDatabase/food-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fdcId: e.target.accessKey,
      }),
    })
      .then((response) => response.json())
      .then((foodDetails) => {
        setFoodDetails(foodDetails);
      })
      .finally(() => setFoodDetailsLoading(false));
  };

  const handleMyFoodChoice = (e) => {
    setMyFoods(false);
    setisMyFoodDetailsModalOpen(true);
    setFoodDetailsLoading(true);
    setFoodDetails(
      initialUser.myFoods.find((food) => {
        return food.fdcId === e.target.accessKey;
      })
    );
    setFoodDetailsLoading(false);
  };

  const handleCloseMyFoodDetailsModal = () => {
    setMyFoods(true);
    setisMyFoodDetailsModalOpen(false);
  };

  const handlePageChange = (e) => {
    setPage(e.target.value);
    handleSearch(currentSearch, e.target.value);
  };

  const handleClearSearch = () => {
    setResults({ foods: [] });
    setSearch("");
    setCurrentSearch("");
  };

  const handleSearch = (search, page) => {
    setSearchLoading(true);
    setCurrentSearch(search);
    fetch(`/api/usdaDatabase/food-search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: search,
        page: page ? page : 1,
      }),
    })
      .then((response) => response.json())
      .then((foodData) => {
        setResults(foodData);
      })
      .finally(() => setSearchLoading(false));
  };

  const handleCancelChanges = () => {
    setFamily_name(initialUser.family_name);
    setGiven_name(initialUser.given_name);
    setAge(initialUser.age);
    setEmail(initialUser.email);
    setGoalWeightKG(initialUser.goalWeightKG ? initialUser.goalWeightKG : "");
    setCurrentWeightKG(
      initialUser.currentWeightKG ? initialUser.currentWeightKG : ""
    );
    setGoalWeightLBS(
      initialUser.goalWeightLBS ? initialUser.goalWeightLBS : ""
    );
    setCurrentWeightLBS(
      initialUser.currentWeightLBS ? initialUser.currentWeightLBS : ""
    );
    setPreference(initialUser.preference ? initialUser.preference : "Metric");
    setHeightImperial(
      initialUser.heightImperial ? initialUser.heightImperial : ["", ""]
    );
    setHeightMetric(initialUser.heightMetric ? initialUser.heightMetric : "");
    setPreview(null);
    setProfilePicture(
      initialUser.profilePicture || initialUser.image
        ? initialUser.profilePicture || initialUser.image
        : ""
    );
    setNewPassword("");
    setConfirmNewPassword("");
    setPassword("");
    setNameError("");
    setAgeError("");
    setCurrentWeightError("");
    setGoalWeightError("");
    setHeightError("");
    setPasswordError("");
    setEmailError("");
    setGender(initialUser.gender ? initialUser.gender : "Male");
    setBMIKG(
      initialUser.bmiKG
        ? typeof initialUser.bmiKG === "number"
          ? Number(initialUser.bmiKG)
          : "TBD"
        : initialUser.currentWeightKG && initialUser.heightMetric
        ? Number(initialUser.currentWeightKG) /
          (Number(initialUser.heightMetric) / 100) ** 2
        : "TBD"
    );
    setBMILBS(
      initialUser.bmiLBS
        ? typeof initialUser.bmiLBS === "number"
          ? initialUser.bmiLBS
          : "TBD"
        : initialUser.currentWeightLBS &&
          initialUser.heightImperial[1] &&
          initialUser.heightImperial[0]
        ? (Number(initialUser.currentWeightLBS) * 703) /
          Math.pow(
            Number(initialUser.heightImperial[0]) * 12 +
              Number(initialUser.heightImperial[1]),
            2
          )
        : initialUser.currentWeightLBS && initialUser.heightImperial[0]
        ? (Number(initialUser.currentWeightLBS) * 703) /
          Math.pow(Number(initialUser.heightImperial[0]) * 12, 2)
        : "TBD"
    );
    setUserChanged(false);
  };

  const handleUpdateUser = async () => {
    if (
      password.length &&
      (!passwordCheck.test(password) ||
        !passwordCheck.test(newPassword) ||
        !passwordCheck.test(confirmNewPassword))
    ) {
      setPasswordError(
        "Password must contain:\n- 8 characters,\n- at least 1 capital letter,\n- at least 1 special character, &\n- at least 1 number"
      );
      if (newPassword != confirmNewPassword) {
        setPasswordError(
          "Password must contain:\n- 8 characters,\n- at least 1 capital letter,\n- at least 1 special character, &\n- at least 1 number\nNew Password & Confirm New Password do not match"
        );
      }
    }
    if (email.length && !emailCheck.test(email)) {
      setEmailError("Please Enter A Valid Email");
    }
    if (
      (currentWeightKG.length && !kgCheck.test(Number(currentWeightKG))) ||
      (currentWeightLBS.length && !lbsCheck.test(Number(currentWeightLBS)))
    ) {
      if (initialUser.preference === "Metric") {
        setCurrentWeightError("Please enter a weight between 32kg & 181kg");
      } else {
        setCurrentWeightError("Please enter a weight between 70lbs & 400lbs");
      }
    }
    if (
      (goalWeightKG.length && !kgCheck.test(Number(goalWeightKG))) ||
      (goalWeightLBS.length && !lbsCheck.test(Number(goalWeightLBS)))
    ) {
      if (initialUser.preference === "Metric") {
        setGoalWeightError("Please enter a weight between 32kg & 181kg");
      } else {
        setGoalWeightError("Please enter a weight between 70lbs & 400lbs");
      }
    }
    if (
      (heightMetric && !cmCheck.test(Number(heightMetric))) ||
      (heightImperial[0] && !feetCheck.test(Number(heightImperial[0]))) ||
      (Number(heightImperial[0]) === 9 && Number(heightImperial[1]) !== 0) ||
      (heightImperial[1] && !inchesCheck.test(Number(heightImperial[1]))) ||
      (Number(heightImperial[0]) < 2 && Number(heightImperial[0] > 0))
    ) {
      if (preference === "Metric") {
        setHeightError("Please enter a height between 61cm & 274cm");
      } else {
        setHeightError("Please enter a height between 2ft & 9ft");
      }
    }
    if (!ageCheck.test(Number(age))) {
      setAgeError("Please enter an age between 18 & 99");
    }
    if (!textCheck.test(given_name) || !textCheck.test(family_name)) {
      setNameError("Please only use characters when entering your name");
    }
    if (newPassword != confirmNewPassword) {
      setPasswordError("New Password & Confirm New Password do not match");
    }
    if (
      !(newPassword != confirmNewPassword) &&
      !(!textCheck.test(given_name) || !textCheck.test(family_name)) &&
      !!ageCheck.test(Number(age)) &&
      !(
        (heightMetric && !cmCheck.test(Number(heightMetric))) ||
        (heightImperial[0] && !feetCheck.test(Number(heightImperial[0]))) ||
        (Number(heightImperial[0]) === 9 && Number(heightImperial[1]) !== 0) ||
        (heightImperial[1] &&
          (!inchesCheck.test(Number(heightImperial[1])) ||
            Number(heightImperial[0]) < 2))
      ) &&
      !(
        (goalWeightKG.length && !kgCheck.test(Number(goalWeightKG))) ||
        (goalWeightLBS.length && !lbsCheck.test(Number(goalWeightLBS)))
      ) &&
      !(
        (currentWeightKG.length && !kgCheck.test(Number(currentWeightKG))) ||
        (currentWeightLBS.length && !lbsCheck.test(Number(currentWeightLBS)))
      ) &&
      !(email.length && !emailCheck.test(email)) &&
      !(
        password.length &&
        (!passwordCheck.test(password) ||
          !passwordCheck.test(newPassword) ||
          !passwordCheck.test(confirmNewPassword))
      )
    ) {
      setUpdating(true);
      const formData = new FormData();
      if (
        (!initialUser.image && !initialUser.profilePicture && profilePicture) ||
        (initialUser.profilePicture && typeof profilePicture != "string") ||
        (initialUser.image && typeof profilePicture != "string")
      ) {
        formData.append("profilePicture", profilePicture);
      } // File upload
      if (family_name != initialUser.family_name && family_name !== "") {
        formData.append("family_name", family_name);
      }
      if (given_name != initialUser.given_name && given_name !== "") {
        formData.append("given_name", given_name);
      }
      if (preference != initialUser.preference) {
        formData.append("preference", preference);
      }
      if (email != initialUser.email && email !== "") {
        formData.append("email", email);
      }
      if (password && newPassword === confirmNewPassword) {
        formData.append("password", password);
        formData.append("newPassword", newPassword);
        formData.append("confirmNewPassword", confirmNewPassword);
      }
      if (Number(age) != initialUser.age && age !== "" && age !== 0) {
        formData.append("age", Number(age));
      }
      if (
        Number(currentWeightKG) != initialUser.currentWeightKG &&
        currentWeightKG !== "" &&
        currentWeightKG !== 0
      ) {
        formData.append("currentWeightKG", Number(currentWeightKG));
        handleBMIUpdate();
      }
      if (
        Number(currentWeightLBS) != initialUser.currentWeightLBS &&
        currentWeightLBS !== "" &&
        currentWeightLBS !== 0
      ) {
        formData.append("currentWeightLBS", Number(currentWeightLBS));
        handleBMIUpdate();
      }
      if (
        Number(goalWeightKG) != initialUser.goalWeightKG &&
        goalWeightKG !== "" &&
        goalWeightKG !== 0
      ) {
        formData.append("goalWeightKG", Number(goalWeightKG));
      }
      if (
        Number(goalWeightLBS) != initialUser.goalWeightLBS &&
        goalWeightLBS !== "" &&
        goalWeightLBS !== 0
      ) {
        formData.append("goalWeightLBS", Number(goalWeightLBS));
      }
      if (
        Number(heightImperial[0]) != initialUser.heightImperial[0] &&
        heightImperial[0] !== ""
      ) {
        formData.append("heightImperialFeet", Number(heightImperial[0]));
      }
      if (
        Number(heightImperial[1]) != initialUser.heightImperial[1] &&
        heightImperial[0] !== ""
      ) {
        if (heightImperial[1] !== "") {
          formData.append("heightImperialInches", Number(heightImperial[1]));
        } else {
          formData.append("heightImperialInches", 0);
        }
      }
      if (
        Number(heightMetric) != initialUser.heightMetric &&
        heightMetric !== "" &&
        heightMetric !== 0
      ) {
        formData.append("heightMetric", Number(heightMetric));
      }
      if (gender != initialUser.gender) {
        formData.append("gender", gender);
      }
      let days = structuredClone(initialUser.days);

      if (days.some((day) => day.date === selectedDateFormatted)) {
        //adds the updated weight info to the day
        days = days.map((day) => {
          if (day.date === selectedDateFormatted) {
            return {
              ...day,
              weightKG: Number(currentWeightKG),
              weightLBS: Number(currentWeightLBS),
              goalWeightKG: Number(goalWeightKG),
              goalWeightLBS: Number(goalWeightLBS),
            };
          } else {
            return day;
          }
        });
        days = days.sort((a, b) => a.date.localeCompare(b.date));
        formData.append("days", JSON.stringify(days));
        //setDays()
        // setPreviousData(true);
        // setIndexOfPreviousData(index);
      } else {
        //creates a blank day for the user for the new date
        days.push({
          date: selectedDateFormatted,
          americanDate: americanDate,
          weightKG: Number(currentWeightKG),
          goalWeightKG: Number(goalWeightKG),
          weightLBS: Number(currentWeightLBS),
          goalWeightLBS: Number(goalWeightLBS),
          breakfast: {
            foodItems: [],
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fat: 0,
            proteinPercentage: 0,
            fatPercentage: 0,
            carbohydratePercentage: 0,
          },
          lunch: {
            foodItems: [],
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fat: 0,
            proteinPercentage: 0,
            fatPercentage: 0,
            carbohydratePercentage: 0,
          },
          dinner: {
            foodItems: [],
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fat: 0,
            proteinPercentage: 0,
            fatPercentage: 0,
            carbohydratePercentage: 0,
          },
          snacks: {
            foodItems: [],
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fat: 0,
            proteinPercentage: 0,
            fatPercentage: 0,
            carbohydratePercentage: 0,
          },
          totals: {
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fat: 0,
            proteinPercentage: 0,
            fatPercentage: 0,
            carbohydratePercentage: 0,
          },
        });

        days = days.sort((a, b) => a.date.localeCompare(b.date));

        formData.append("days", JSON.stringify(days));

        //setDays();

        // setPreviousData(true);
        // setIndexOfPreviousData(index);
      }
      if (
        Number(bmiKG) != initialUser.bmiKG &&
        bmiKG !== "" &&
        bmiKG !== 0 &&
        bmiKG !== "TBD"
      ) {
        formData.append("bmiKG", Number(bmiKG));
      }
      if (
        Number(bmiLBS) != initialUser.bmiLBS &&
        bmiLBS !== "" &&
        bmiLBS !== 0 &&
        bmiLBS !== "TBD"
      ) {
        formData.append("bmiLBS", Number(bmiLBS));
      }
      fetch(`/api/updateUser/${session.user.id}`, {
        method: "PUT",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        //body: JSON.stringify(body),
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setInitialUser({ ...data });
          setUpdatedUser({ ...data });
          setFamily_name(data.family_name);
          setGiven_name(data.given_name);
          setAge(data.age ? data.age : "");
          setEmail(data.email ? data.email : "");
          setGoalWeightKG(data.goalWeightKG ? data.goalWeightKG : "");
          setCurrentWeightKG(data.currentWeightKG ? data.currentWeightKG : "");
          setGoalWeightLBS(data.goalWeightLBS ? data.goalWeightLBS : "");
          setCurrentWeightLBS(
            data.currentWeightLBS ? data.currentWeightLBS : ""
          );
          setPreference(data.preference ? data.preference : "Metric");
          setGender(data.gender ? data.gender : "Male");
          setHeightImperial(
            data.heightImperial[0]
              ? [data.heightImperial[0], data.heightImperial[1]]
              : ["", ""]
          );
          setHeightMetric(data.heightMetric ? data.heightMetric : "");
          if (
            data.heightMetric &&
            data.heightImperial[0] &&
            data.currentWeightLBS &&
            data.currentWeightKG &&
            (data.heightImperial[1] === 0 || data.heightImperial[1])
          ) {
            setBMIKG(
              data.bmiKG
                ? typeof data.bmiKG === "number"
                  ? Number(data.bmiKG)
                  : "TBD"
                : Number(data.currentWeightKG) /
                    (Number(data.heightMetric) / 100) ** 2
            );
            setBMILBS(
              data.bmiLBS
                ? typeof data.bmiLBS === "number"
                  ? data.bmiLBS
                  : "TBD"
                : (Number(data.currentWeightLBS) * 703) /
                    Math.pow(
                      Number(data.heightImperial[0]) * 12 +
                        Number(data.heightImperial[1]),
                      2
                    )
            );
          }
          setWeightLossPerWeekKG(
            data.weightLossPerWeekKG ? data.weightLossPerWeekKG : 0
          );
          setWeightLossPerWeekLBS(
            data.weightLossPerWeekLBS ? data.weightLossPerWeekLBS : 0
          );
          setActivityLevel(data.activityLevel ? data.activityLevel : 1.2);
          setDailyCalorieGoal(
            data.dailyCalorieGoal
              ? data.dailyCalorieGoal
              : data.weightLossPerWeekLBS &&
                data.gender === "Male" &&
                data.currentWeightKG &&
                data.heightMetric &&
                data.age &&
                data.activityLevel
              ? Number(
                  (10 * data.currentWeightKG +
                    6.25 * data.heightMetric -
                    5 * data.age +
                    5) *
                    data.activityLevel -
                    (data.weightLossPerWeekLBS * 3500) / 7
                )
              : data.weightLossPerWeekLBS &&
                data.gender === "Female" &&
                data.currentWeightKG &&
                data.heightMetric &&
                data.age &&
                data.activityLevel
              ? Number(
                  (10 * data.currentWeightKG +
                    6.25 * data.heightMetric -
                    5 * data.age -
                    161) *
                    data.activityLevel -
                    (data.weightLossPerWeekLBS * 3500) / 7
                )
              : "TBD"
          );

          setProfilePicture(data.profilePicture ? data.profilePicture : "");
          if (data.days.length) {
            if (!averageMacros) {
              handleAverageMacroCalculation(data);
            }
            if (data.days.some((day) => day.date === selectedDateFormatted)) {
              setPreviousData(true);
              const previousDataIndex = data.days.findIndex(
                (day) => day.date === selectedDateFormatted
              );
              setIndexOfPreviousData(previousDataIndex);
              if (data.days[previousDataIndex].totals.calories) {
                setDailyMacros([
                  {
                    name: "Protein",
                    value:
                      data.days[previousDataIndex].totals.proteinPercentage *
                      100,
                  },
                  {
                    name: "Carbohydrate",
                    value:
                      data.days[previousDataIndex].totals
                        .carbohydratePercentage * 100,
                  },
                  {
                    name: "Fat",
                    value: Number(
                      (
                        data.days[previousDataIndex].totals.fatPercentage * 100
                      ).toFixed(2)
                    ),
                  },
                ]);
                setDailyMacrosGrams([
                  {
                    name: "Protein",
                    value: data.days[previousDataIndex].totals.protein,
                  },
                  {
                    name: "Carbohydrate",
                    value: data.days[previousDataIndex].totals.carbohydrates,
                  },
                  {
                    name: "Fat",
                    value: data.days[previousDataIndex].totals.fat,
                  },
                ]);
              }
            } else {
              setPreviousData(false);
              setIndexOfPreviousData(-1);
              setDailyMacros("");
              setDailyMacrosGrams("");
              setTabActiveKey("averageMacros");
            }
          }
          setUserChanged(false);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 1000);
          setUpdating(false);
          handleCloseAfterUpdate();
        })
        .catch((error) => {
          console.error("Error:", error);
          setUpdating(false);
        });
    }
  };

  const handleBMIUpdate = () => {
    if (currentWeightKG && heightMetric) {
      setBMIKG(Number(currentWeightKG) / (Number(heightMetric) / 100) ** 2);
      setBMILBS(
        (Number(currentWeightLBS) * 703) /
          Math.pow(
            Number(heightImperial[0]) * 12 + Number(heightImperial[1]),
            2
          )
      );
    }
  };

  const handleFamilyNameChange = (e) => {
    setFamily_name(e.target.value);
    setNameError("");
    let newUser = structuredClone(initialUser);
    newUser.family_name = e.target.value;
    newUser.given_name = given_name;
    newUser.preference = preference;
    newUser.age = age;
    newUser.gender = gender;
    newUser.email = email;
    newUser.currentWeightKG = currentWeightKG;
    newUser.currentWeightLBS = currentWeightLBS;
    newUser.goalWeightKG = goalWeightKG;
    newUser.goalWeightLBS = goalWeightLBS;
    newUser.heightMetric = heightMetric;
    newUser.heightImperial = heightImperial;

    handleUserComparison(initialUser, newUser);
    // if (e.target.value != initialUser.family_name) {
    //   setUserChanged(true);
    // }
  };

  const handleGivenNameChange = (e) => {
    setGiven_name(e.target.value);
    setNameError("");
    let newUser = structuredClone(initialUser);
    newUser.family_name = family_name;
    newUser.given_name = e.target.value;
    newUser.preference = preference;
    newUser.age = age;
    newUser.gender = gender;
    newUser.email = email;
    newUser.currentWeightKG = currentWeightKG;
    newUser.currentWeightLBS = currentWeightLBS;
    newUser.goalWeightKG = goalWeightKG;
    newUser.goalWeightLBS = goalWeightLBS;
    newUser.heightMetric = heightMetric;
    newUser.heightImperial = heightImperial;

    handleUserComparison(initialUser, newUser);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    setAgeError("");
    let newUser = structuredClone(initialUser);
    newUser.family_name = family_name;
    newUser.given_name = given_name;
    newUser.preference = preference;
    newUser.age = e.target.value;
    newUser.gender = gender;
    newUser.email = email;
    newUser.currentWeightKG = currentWeightKG;
    newUser.currentWeightLBS = currentWeightLBS;
    newUser.goalWeightKG = goalWeightKG;
    newUser.goalWeightLBS = goalWeightLBS;
    newUser.heightMetric = heightMetric;
    newUser.heightImperial = heightImperial;

    handleUserComparison(initialUser, newUser);
  };

  const handlePreferenceChange = (e) => {
    setPreference(e.target.value);
    let newUser = structuredClone(initialUser);
    newUser.family_name = family_name;
    newUser.given_name = given_name;
    newUser.preference = e.target.value;
    newUser.age = age;
    newUser.gender = gender;
    newUser.email = email;
    newUser.currentWeightKG = currentWeightKG;
    newUser.currentWeightLBS = currentWeightLBS;
    newUser.goalWeightKG = goalWeightKG;
    newUser.goalWeightLBS = goalWeightLBS;
    newUser.heightMetric = heightMetric;
    newUser.heightImperial = heightImperial;

    handleUserComparison(initialUser, newUser);
    if (e.target.value === "Metric" && heightError) {
      setHeightError("Please enter a height between 61cm & 274cm");
    }
    if (e.target.value === "Imperial" && heightError) {
      setHeightError("Please enter a height between 2ft & 9ft");
    }
    if (e.target.value === "Metric" && currentWeightError) {
      setCurrentWeightError("Please enter a weight between 32kg & 181kg");
    }
    if (e.target.value === "Imperial" && currentWeightError) {
      setCurrentWeightError("Please enter a weight between 70lbs & 400lbs");
    }
    if (e.target.value === "Metric" && goalWeightError) {
      setGoalWeightError("Please enter a weight between 32kg & 181kg");
    }
    if (e.target.value === "Imperial" && goalWeightError) {
      setGoalWeightError("Please enter a weight between 70lbs & 400lbs");
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    let newUser = structuredClone(initialUser);
    newUser.family_name = family_name;
    newUser.given_name = given_name;
    newUser.preference = preference;
    newUser.age = age;
    newUser.gender = e.target.value;
    newUser.email = email;
    newUser.currentWeightKG = currentWeightKG;
    newUser.currentWeightLBS = currentWeightLBS;
    newUser.goalWeightKG = goalWeightKG;
    newUser.goalWeightLBS = goalWeightLBS;
    newUser.heightMetric = heightMetric;
    newUser.heightImperial = heightImperial;

    handleUserComparison(initialUser, newUser);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    let newUser = structuredClone(initialUser);
    newUser.family_name = family_name;
    newUser.given_name = given_name;
    newUser.preference = preference;
    newUser.age = age;
    newUser.gender = gender;
    newUser.email = e.target.value;
    newUser.currentWeightKG = currentWeightKG;
    newUser.currentWeightLBS = currentWeightLBS;
    newUser.goalWeightKG = goalWeightKG;
    newUser.goalWeightLBS = goalWeightLBS;
    newUser.heightMetric = heightMetric;
    newUser.heightImperial = heightImperial;

    handleUserComparison(initialUser, newUser);
  };

  const handleCurrentPasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordError("");
    if (e.target.value != "") {
      setUserChanged(true);
    } else {
      setConfirmNewPassword("");
      setPassword("");
    }
    let newUser = structuredClone(initialUser);
    newUser.family_name = family_name;
    newUser.given_name = given_name;
    newUser.preference = preference;
    newUser.age = age;
    newUser.gender = gender;
    newUser.email = email;
    newUser.currentWeightKG = currentWeightKG;
    newUser.currentWeightLBS = currentWeightLBS;
    newUser.goalWeightKG = goalWeightKG;
    newUser.goalWeightLBS = goalWeightLBS;
    newUser.heightMetric = heightMetric;
    newUser.heightImperial = heightImperial;

    handleUserComparison(initialUser, newUser);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    setPasswordError("");
  };

  const handleCurrentWeightChange = (e) => {
    if (preference === "Metric") {
      setCurrentWeightKG(e.target.value);
      let newUser = structuredClone(initialUser);
      newUser.family_name = family_name;
      newUser.given_name = given_name;
      newUser.preference = preference;
      newUser.age = age;
      newUser.gender = gender;
      newUser.email = email;
      newUser.currentWeightKG = e.target.value;
      newUser.currentWeightLBS = Number((e.target.value * 2.2).toFixed(2));
      newUser.goalWeightKG = goalWeightKG;
      newUser.goalWeightLBS = goalWeightLBS;
      newUser.heightMetric = heightMetric;
      newUser.heightImperial = heightImperial;

      handleUserComparison(initialUser, newUser);
      setCurrentWeightLBS(Number((e.target.value * 2.2).toFixed(2)));
      if (heightMetric) {
        setBMIKG(Number(e.target.value) / (Number(heightMetric) / 100) ** 2);
        setBMILBS(
          (Number(e.target.value * 2.2) * 703) /
            Math.pow(
              Number(heightImperial[0]) * 12 + Number(heightImperial[1]),
              2
            )
        );
      } else {
        setBMIKG("TBD");
        setBMILBS("TBD");
      }
    } else {
      setCurrentWeightLBS(e.target.value);
      let newUser = structuredClone(initialUser);
      newUser.family_name = family_name;
      newUser.given_name = given_name;
      newUser.preference = preference;
      newUser.age = age;
      newUser.gender = gender;
      newUser.email = email;
      newUser.currentWeightKG = Number((e.target.value / 2.2).toFixed(2));
      newUser.currentWeightLBS = e.target.value;
      newUser.goalWeightKG = goalWeightKG;
      newUser.goalWeightLBS = goalWeightLBS;
      newUser.heightMetric = heightMetric;
      newUser.heightImperial = heightImperial;

      handleUserComparison(initialUser, newUser);
      setCurrentWeightKG(Number((e.target.value / 2.2).toFixed(2)));
      if (heightMetric) {
        setBMIKG(
          Number(Number(e.target.value) / 2.2) /
            (Number(heightMetric) / 100) ** 2
        );
        setBMILBS(
          (Number(e.target.value) * 703) /
            Math.pow(
              Number(heightImperial[0]) * 12 + Number(heightImperial[1]),
              2
            )
        );
      } else {
        setBMIKG("TBD");
        setBMILBS("TBD");
      }
    }
    setCurrentWeightError("");
  };

  const handleGoalWeightChange = (e) => {
    if (preference === "Metric") {
      setGoalWeightKG(e.target.value);
      let newUser = structuredClone(initialUser);
      newUser.family_name = family_name;
      newUser.given_name = given_name;
      newUser.preference = preference;
      newUser.age = age;
      newUser.gender = gender;
      newUser.email = email;
      newUser.currentWeightKG = currentWeightKG;
      newUser.currentWeightLBS = currentWeightLBS;
      newUser.goalWeightKG = e.target.value;
      newUser.goalWeightLBS = Number((e.target.value * 2.2).toFixed(2));
      newUser.heightMetric = heightMetric;
      newUser.heightImperial = heightImperial;

      handleUserComparison(initialUser, newUser);
      setGoalWeightLBS(Number((e.target.value * 2.2).toFixed(2)));
    } else {
      setGoalWeightLBS(e.target.value);
      let newUser = structuredClone(initialUser);
      newUser.family_name = family_name;
      newUser.given_name = given_name;
      newUser.preference = preference;
      newUser.age = age;
      newUser.gender = gender;
      newUser.email = email;
      newUser.currentWeightKG = currentWeightKG;
      newUser.currentWeightLBS = currentWeightLBS;
      newUser.goalWeightKG = Number((e.target.value / 2.2).toFixed(2));
      newUser.goalWeightLBS = e.target.value;
      newUser.heightMetric = heightMetric;
      newUser.heightImperial = heightImperial;

      handleUserComparison(initialUser, newUser);
      setGoalWeightKG(Number((e.target.value / 2.2).toFixed(2)));
    }
    setGoalWeightError("");
  };

  const handleMetricHeightChange = (e) => {
    setHeightMetric(e.target.value ? Number(e.target.value) : "");
    let newUser = structuredClone(initialUser);
    newUser.family_name = family_name;
    newUser.given_name = given_name;
    newUser.preference = preference;
    newUser.age = age;
    newUser.gender = gender;
    newUser.email = email;
    newUser.currentWeightKG = currentWeightKG;
    newUser.currentWeightLBS = currentWeightLBS;
    newUser.goalWeightKG = goalWeightKG;
    newUser.goalWeightLBS = goalWeightLBS;
    newUser.heightMetric = e.target.value ? Number(e.target.value) : "";
    newUser.heightImperial = e.target.value
      ? [
          Math.floor(Number(e.target.value) / 30.48),
          Math.floor(
            12 *
              (Number(e.target.value) / 30.48 -
                Math.floor(Number(e.target.value) / 30.48))
          ),
        ]
      : ["", ""];

    handleUserComparison(initialUser, newUser);
    setHeightImperial(
      e.target.value
        ? [
            Math.floor(Number(e.target.value) / 30.48),
            Math.floor(
              12 *
                (Number(e.target.value) / 30.48 -
                  Math.floor(Number(e.target.value) / 30.48))
            ),
          ]
        : ["", ""]
    );
    setHeightError("");
    if (currentWeightKG) {
      setBMIKG(Number(currentWeightKG) / (Number(e.target.value) / 100) ** 2);
      setBMILBS(
        (Number(currentWeightLBS) * 703) /
          Math.pow(
            Math.floor(Number(e.target.value) / 30.48) * 12 +
              Math.floor(
                12 *
                  (Number(e.target.value) / 30.48 -
                    Math.floor(Number(e.target.value) / 30.48))
              ),
            2
          )
      );
    } else {
      setBMIKG("TBD");
      setBMILBS("TBD");
    }
  };

  const handleImperialFeetHeightChange = (e) => {
    let newUser = structuredClone(initialUser);
    newUser.family_name = family_name;
    newUser.given_name = given_name;
    newUser.preference = preference;
    newUser.age = e.target.value;
    newUser.gender = gender;
    newUser.email = email;
    newUser.currentWeightKG = currentWeightKG;
    newUser.currentWeightLBS = currentWeightLBS;
    newUser.goalWeightKG = goalWeightKG;
    newUser.goalWeightLBS = goalWeightLBS;
    if (heightImperial[1] || Number(heightImperial[1]) === 0) {
      newUser.heightImperial = [e.target.value, heightImperial[1]];
      newUser.heightMetric = Number(
        (e.target.value * 12 + heightImperial[1]) * 2.54
      );
    } else {
      newUser.heightImperial = [e.target.value, ""];
      newUser.heightMetric = Math.round(Number(e.target.value * 12 * 2.54));
    }
    handleUserComparison(initialUser, newUser);
    if (heightImperial[0] === "" && heightImperial[1] === "") {
      setHeightImperial([e.target.value, ""]);
      setHeightMetric(Math.round(Number(e.target.value * 12 * 2.54)));
      if (currentWeightKG) {
        setBMIKG(
          (Number(currentWeightKG) /
            Math.round(Number(e.target.value * 12 * 2.54)) /
            100) **
            2
        );
        setBMILBS(
          (Number(currentWeightLBS) * 703) /
            Math.pow(Number(e.target.value) * 12, 2)
        );
      } else {
        setBMIKG("TBD");
        setBMILBS("TBD");
      }
    } else {
      setHeightImperial((prevHeights) =>
        prevHeights.map((h, index) =>
          index === 0 ? (e.target.value ? Number(e.target.value) : "") : h
        )
      );
      setHeightMetric(
        Math.round(Number((e.target.value * 12 + heightImperial[1]) * 2.54))
      );
      if (currentWeightKG) {
        setBMIKG(
          (Number(currentWeightKG) /
            Math.round(
              Number((e.target.value * 12 + heightImperial[1]) * 2.54)
            ) /
            100) **
            2
        );
        setBMILBS(
          (Number(currentWeightLBS) * 703) /
            Math.pow(Number(e.target.value) * 12 + Number(heightImperial[1]), 2)
        );
      } else {
        setBMIKG("TBD");
        setBMILBS("TBD");
      }
    }
    if (!heightImperial[1] && !e.target.value) {
      setHeightMetric("");
    }
    setHeightError("");
  };

  const handleImperialInchesHeightChange = (e) => {
    let newUser = structuredClone(initialUser);
    newUser.family_name = family_name;
    newUser.given_name = given_name;
    newUser.preference = preference;
    newUser.age = e.target.value;
    newUser.gender = gender;
    newUser.email = email;
    newUser.currentWeightKG = currentWeightKG;
    newUser.currentWeightLBS = currentWeightLBS;
    newUser.goalWeightKG = goalWeightKG;
    newUser.goalWeightLBS = goalWeightLBS;
    newUser.heightMetric = heightMetric;
    if (heightImperial[0] || Number(heightImperial[0]) === 0) {
      newUser.heightImperial = [
        Number(heightImperial[0]),
        Number(e.target.value),
      ];
      const feet2Inches = Number(heightImperial[0]) * 12;
      const totalInches = Number(e.target.value) + feet2Inches;
      newUser.heightMetric = Math.round(Number(totalInches * 2.54));
    } else {
      newUser.heightImperial = ["", e.target.value];
      newUser.heightMetric = Math.round(Number(e.target.value) * 2.54);
    }
    handleUserComparison(initialUser, newUser);
    if (heightImperial.length === 0) {
      setHeightImperial(["", Number(e.target.value)]);
      setHeightMetric(Math.round(Number(e.target.value * 2.54)));
      if (currentWeightKG) {
        setBMIKG(
          (Number(currentWeightKG) /
            Math.round(Number(e.target.value * 2.54)) /
            100) **
            2
        );
        setBMILBS(
          (Number(currentWeightLBS) * 703) / Math.pow(Number(e.target.value), 2)
        );
      } else {
        setBMIKG("TBD");
        setBMILBS("TBD");
      }
    } else {
      setHeightImperial((prevHeights) =>
        prevHeights.map((h, index) =>
          index === 1 ? (e.target.value ? Number(e.target.value) : "") : h
        )
      );
      setHeightMetric(
        Math.round(
          Number(
            (Number(heightImperial[0]) * 12 + Number(e.target.value)) * 2.54
          )
        )
      );
      if (currentWeightKG) {
        setBMIKG(
          (Number(currentWeightKG) /
            Math.round(
              Number((e.target.value + heightImperial[0] * 12) * 2.54)
            ) /
            100) **
            2
        );
        setBMILBS(
          (Number(currentWeightLBS) * 703) /
            Math.pow(Number(e.target.value) + Number(heightImperial[0] * 12), 2)
        );
      } else {
        setBMIKG("TBD");
        setBMILBS("TBD");
      }
    }
    if (!heightImperial[0] && !e.target.value) {
      setHeightMetric("");
    }
    setHeightError("");
  };

  const handleProfilePictureChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        //setProfilePicture(await uploadFileToS3(selectedFile));
        setProfilePicture(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setUserChanged(true);
        setProfilePictureError("");
      } else {
        setProfilePictureError("Only image files are allowed!");
        event.target.value = ""; // Reset file input
      }
    }
  };

  const handleDailyCalorieGoalUpdate = (
    weightLossPerWeekLBS,
    activityLevel
  ) => {
    const calorieDeficit = (weightLossPerWeekLBS * 3500) / 7;
    if (initialUser.gender === "Male") {
      setDailyCalorieGoal(
        Number(
          (10 * currentWeightKG + 6.25 * heightMetric - 5 * age + 5) *
            activityLevel -
            calorieDeficit
        )
      );
    } else {
      setDailyCalorieGoal(
        Number(
          (10 * currentWeightKG + 6.25 * heightMetric - 5 * age - 161) *
            activityLevel -
            calorieDeficit
        )
      );
    }
  };

  const handleActivityLevelChange = (e) => {
    setActivityLevel(Number(e.target.value));
    if (Number(e.target.value != initialUser.activityLevel)) {
      setActivityLevelChanged(true);
    } else {
      setActivityLevelChanged(false);
    }
    if (currentWeightKG && goalWeightKG) {
      handleDailyCalorieGoalUpdate(
        weightLossPerWeekLBS,
        Number(e.target.value)
      );
    }
  };

  const handleActivityLevelCancel = () => {
    setActivityLevelChanged(false);
    setActivityLevel(
      initialUser.activityLevel ? initialUser.activityLevel : 1.2
    );
  };

  const handleActivityLevelSave = () => {
    setUpdating(true);
    fetch(`/api/getUser/${session.user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...initialUser,
        activityLevel: activityLevel,
        dailyCalorieGoal: dailyCalorieGoal,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInitialUser({ ...data });
        setUpdatedUser({ ...data });
        setFamily_name(data.family_name);
        setGiven_name(data.given_name);
        setAge(data.age ? data.age : "");
        setEmail(data.email ? data.email : "");
        setGoalWeightKG(data.goalWeightKG ? data.goalWeightKG : "");
        setCurrentWeightKG(data.currentWeightKG ? data.currentWeightKG : "");
        setGoalWeightLBS(data.goalWeightLBS ? data.goalWeightLBS : "");
        setCurrentWeightLBS(data.currentWeightLBS ? data.currentWeightLBS : "");
        setPreference(data.preference ? data.preference : "Metric");
        setGender(data.gender ? data.gender : "Male");
        setHeightImperial(
          data.heightImperial[0]
            ? [data.heightImperial[0], data.heightImperial[1]]
            : ["", ""]
        );
        setHeightMetric(data.heightMetric ? data.heightMetric : "");
        if (
          data.heightMetric &&
          data.heightImperial[0] &&
          data.currentWeightLBS &&
          data.currentWeightKG &&
          (data.heightImperial[1] === 0 || data.heightImperial[1])
        ) {
          setBMIKG(
            data.bmiKG
              ? typeof data.bmiKG === "number"
                ? Number(data.bmiKG)
                : "TBD"
              : Number(data.currentWeightKG) /
                  (Number(data.heightMetric) / 100) ** 2
          );
          setBMILBS(
            data.bmiLBS
              ? typeof data.bmiLBS === "number"
                ? data.bmiLBS
                : "TBD"
              : (Number(data.currentWeightLBS) * 703) /
                  Math.pow(
                    Number(data.heightImperial[0]) * 12 +
                      Number(data.heightImperial[1]),
                    2
                  )
          );
        }
        setWeightLossPerWeekKG(
          data.weightLossPerWeekKG ? data.weightLossPerWeekKG : 0
        );
        setWeightLossPerWeekLBS(
          data.weightLossPerWeekLBS ? data.weightLossPerWeekLBS : 0
        );
        setActivityLevel(data.activityLevel ? data.activityLevel : 1.2);
        setDailyCalorieGoal(
          data.dailyCalorieGoal
            ? data.dailyCalorieGoal
            : data.weightLossPerWeekLBS &&
              data.gender === "Male" &&
              data.currentWeightKG &&
              data.heightMetric &&
              data.age &&
              data.activityLevel
            ? Number(
                (10 * data.currentWeightKG +
                  6.25 * data.heightMetric -
                  5 * data.age +
                  5) *
                  data.activityLevel -
                  (data.weightLossPerWeekLBS * 3500) / 7
              )
            : data.weightLossPerWeekLBS &&
              data.gender === "Female" &&
              data.currentWeightKG &&
              data.heightMetric &&
              data.age &&
              data.activityLevel
            ? Number(
                (10 * data.currentWeightKG +
                  6.25 * data.heightMetric -
                  5 * data.age -
                  161) *
                  data.activityLevel -
                  (data.weightLossPerWeekLBS * 3500) / 7
              )
            : "TBD"
        );

        setProfilePicture(data.profilePicture ? data.profilePicture : "");
        if (data.days.length) {
          if (!averageMacros) {
            handleAverageMacroCalculation(data);
          }
          if (data.days.some((day) => day.date === selectedDateFormatted)) {
            setPreviousData(true);
            const previousDataIndex = data.days.findIndex(
              (day) => day.date === selectedDateFormatted
            );
            setIndexOfPreviousData(previousDataIndex);
            if (data.days[previousDataIndex].totals.calories) {
              setDailyMacros([
                {
                  name: "Protein",
                  value:
                    data.days[previousDataIndex].totals.proteinPercentage * 100,
                },
                {
                  name: "Carbohydrate",
                  value:
                    data.days[previousDataIndex].totals.carbohydratePercentage *
                    100,
                },
                {
                  name: "Fat",
                  value: Number(
                    (
                      data.days[previousDataIndex].totals.fatPercentage * 100
                    ).toFixed(2)
                  ),
                },
              ]);
              setDailyMacrosGrams([
                {
                  name: "Protein",
                  value: data.days[previousDataIndex].totals.protein,
                },
                {
                  name: "Carbohydrate",
                  value: data.days[previousDataIndex].totals.carbohydrates,
                },
                {
                  name: "Fat",
                  value: data.days[previousDataIndex].totals.fat,
                },
              ]);
            }
          } else {
            setPreviousData(false);
            setIndexOfPreviousData(-1);
            setDailyMacros("");
            setDailyMacrosGrams("");
            setTabActiveKey("averageMacros");
          }
        }
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
        setActivityLevelChanged(false);
        setUpdating(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to Save Weight Loss Per Week Goal");
        setUpdating(false);
      });
  };

  const handleWeightLossPerWeekChange = (e) => {
    if (preference === "Metric") {
      setWeightLossPerWeekKG(Number(e.target.value));
      if (Number(e.target.value) === 0.1) {
        setWeightLossPerWeekLBS(0.25);
      } else if (Number(e.target.value) === 0.2) {
        setWeightLossPerWeekLBS(0.5);
      } else if (Number(e.target.value) === 0.3) {
        setWeightLossPerWeekLBS(0.75);
      } else if (Number(e.target.value) === 0.4) {
        setWeightLossPerWeekLBS(0.75);
      } else if (Number(e.target.value) === 0.5) {
        setWeightLossPerWeekLBS(1);
      } else if (Number(e.target.value) === 0.6) {
        setWeightLossPerWeekLBS(1.25);
      } else if (Number(e.target.value) === 0.7) {
        setWeightLossPerWeekLBS(1.5);
      } else if (Number(e.target.value) === 0.8) {
        setWeightLossPerWeekLBS(1.75);
      } else if (Number(e.target.value) === 0.9) {
        setWeightLossPerWeekLBS(2);
      } else if (Number(e.target.value) === 1) {
        setWeightLossPerWeekLBS(2);
      }

      if (Number(e.target.value != initialUser.weightLossPerWeekKG)) {
        setWeightLossPerWeekChanged(true);
      } else {
        setWeightLossPerWeekChanged(false);
      }
      if (currentWeightKG && goalWeightKG) {
        handleDailyCalorieGoalUpdate(
          Number(e.target.value * 2.2),
          activityLevel
        );
      }
    } else {
      setWeightLossPerWeekLBS(Number(e.target.value));
      if (Number(e.target.value) === 0.25) {
        setWeightLossPerWeekKG(0.1);
      } else if (Number(e.target.value) === 0.5) {
        setWeightLossPerWeekKG(0.2);
      } else if (Number(e.target.value) === 0.75) {
        setWeightLossPerWeekKG(0.3);
      } else if (Number(e.target.value) === 1) {
        setWeightLossPerWeekKG(0.5);
      } else if (Number(e.target.value) === 1.25) {
        setWeightLossPerWeekKG(0.6);
      } else if (Number(e.target.value) === 1.5) {
        setWeightLossPerWeekKG(0.7);
      } else if (Number(e.target.value) === 1.75) {
        setWeightLossPerWeekKG(0.8);
      } else if (Number(e.target.value) === 2) {
        setWeightLossPerWeekKG(1);
      }
      if (Number(e.target.value != initialUser.weightLossPerWeekLBS)) {
        setWeightLossPerWeekChanged(true);
      } else {
        setWeightLossPerWeekChanged(false);
      }
      if (currentWeightKG && goalWeightKG) {
        handleDailyCalorieGoalUpdate(Number(e.target.value), activityLevel);
      }
    }
  };

  const handleWeightLossPerWeekCancel = () => {
    setWeightLossPerWeekChanged(false);
    setWeightLossPerWeekLBS(
      initialUser.weightLossPerWeekLBS ? initialUser.weightLossPerWeekLBS : 0
    );
    setWeightLossPerWeekKG(
      initialUser.weightLossPerWeekKG ? initialUser.weightLossPerWeekKG : 0
    );
  };

  const handleWeightLossPerWeekSave = () => {
    setUpdating(true);
    fetch(`/api/getUser/${session.user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...initialUser,
        weightLossPerWeekKG: weightLossPerWeekKG,
        weightLossPerWeekLBS: weightLossPerWeekLBS,
        dailyCalorieGoal: dailyCalorieGoal,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInitialUser({ ...data });
        setUpdatedUser({ ...data });
        setFamily_name(data.family_name);
        setGiven_name(data.given_name);
        setAge(data.age ? data.age : "");
        setEmail(data.email ? data.email : "");
        setGoalWeightKG(data.goalWeightKG ? data.goalWeightKG : "");
        setCurrentWeightKG(data.currentWeightKG ? data.currentWeightKG : "");
        setGoalWeightLBS(data.goalWeightLBS ? data.goalWeightLBS : "");
        setCurrentWeightLBS(data.currentWeightLBS ? data.currentWeightLBS : "");
        setPreference(data.preference ? data.preference : "Metric");
        setGender(data.gender ? data.gender : "Male");
        setHeightImperial(
          data.heightImperial[0]
            ? [data.heightImperial[0], data.heightImperial[1]]
            : ["", ""]
        );
        setHeightMetric(data.heightMetric ? data.heightMetric : "");
        if (
          data.heightMetric &&
          data.heightImperial[0] &&
          data.currentWeightLBS &&
          data.currentWeightKG &&
          (data.heightImperial[1] === 0 || data.heightImperial[1])
        ) {
          setBMIKG(
            data.bmiKG
              ? typeof data.bmiKG === "number"
                ? Number(data.bmiKG)
                : "TBD"
              : Number(data.currentWeightKG) /
                  (Number(data.heightMetric) / 100) ** 2
          );
          setBMILBS(
            data.bmiLBS
              ? typeof data.bmiLBS === "number"
                ? data.bmiLBS
                : "TBD"
              : (Number(data.currentWeightLBS) * 703) /
                  Math.pow(
                    Number(data.heightImperial[0]) * 12 +
                      Number(data.heightImperial[1]),
                    2
                  )
          );
        }
        setWeightLossPerWeekKG(
          data.weightLossPerWeekKG ? data.weightLossPerWeekKG : 0
        );
        setWeightLossPerWeekLBS(
          data.weightLossPerWeekLBS ? data.weightLossPerWeekLBS : 0
        );
        setActivityLevel(data.activityLevel ? data.activityLevel : 1.2);
        setDailyCalorieGoal(
          data.dailyCalorieGoal
            ? data.dailyCalorieGoal
            : data.weightLossPerWeekLBS &&
              data.gender === "Male" &&
              data.currentWeightKG &&
              data.heightMetric &&
              data.age &&
              data.activityLevel
            ? Number(
                (10 * data.currentWeightKG +
                  6.25 * data.heightMetric -
                  5 * data.age +
                  5) *
                  data.activityLevel -
                  (data.weightLossPerWeekLBS * 3500) / 7
              )
            : data.weightLossPerWeekLBS &&
              data.gender === "Female" &&
              data.currentWeightKG &&
              data.heightMetric &&
              data.age &&
              data.activityLevel
            ? Number(
                (10 * data.currentWeightKG +
                  6.25 * data.heightMetric -
                  5 * data.age -
                  161) *
                  data.activityLevel -
                  (data.weightLossPerWeekLBS * 3500) / 7
              )
            : "TBD"
        );

        setProfilePicture(data.profilePicture ? data.profilePicture : "");
        if (data.days.length) {
          if (!averageMacros) {
            handleAverageMacroCalculation(data);
          }
          if (data.days.some((day) => day.date === selectedDateFormatted)) {
            setPreviousData(true);
            const previousDataIndex = data.days.findIndex(
              (day) => day.date === selectedDateFormatted
            );
            setIndexOfPreviousData(previousDataIndex);
            if (data.days[previousDataIndex].totals.calories) {
              setDailyMacros([
                {
                  name: "Protein",
                  value:
                    data.days[previousDataIndex].totals.proteinPercentage * 100,
                },
                {
                  name: "Carbohydrate",
                  value:
                    data.days[previousDataIndex].totals.carbohydratePercentage *
                    100,
                },
                {
                  name: "Fat",
                  value: Number(
                    (
                      data.days[previousDataIndex].totals.fatPercentage * 100
                    ).toFixed(2)
                  ),
                },
              ]);
              setDailyMacrosGrams([
                {
                  name: "Protein",
                  value: data.days[previousDataIndex].totals.protein,
                },
                {
                  name: "Carbohydrate",
                  value: data.days[previousDataIndex].totals.carbohydrates,
                },
                {
                  name: "Fat",
                  value: data.days[previousDataIndex].totals.fat,
                },
              ]);
            }
          } else {
            setPreviousData(false);
            setIndexOfPreviousData(-1);
            setDailyMacros("");
            setDailyMacrosGrams("");
            setTabActiveKey("averageMacros");
          }
        }
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
        setWeightLossPerWeekChanged(false);
        setUpdating(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to Save Weight Loss Per Week Goal");
        setUpdating(false);
      });
  };

  const onSetTabActiveKey = (e) => {
    setTabActiveKey(e);
  };

  useEffect(() => {
    //Tries to avoid hydration issues with server and react due to date creation
    if (selectedDate === "") {
      const date = new Date();
      setSelectedDate(date);
      setSelectedDateFormatted(
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`
      );
      setAmericanDate(
        `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
          date.getDate()
        ).padStart(2, "0")}-${date.getFullYear()}`
      );
    }

    //calculates screen size changes so that the outer radius of the pie chart can be updated accordingly
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    async function fetchUser(userId) {
      try {
        const res = await fetch(`/api/getUser/${userId}`);
        if (!res.ok) {
          throw new Error("User not found");
        }
        const data = await res.json();
        setInitialUser({ ...data });
        setUpdatedUser({ ...data });
        setFamily_name(data.family_name);
        setGiven_name(data.given_name);
        setAge(data.age ? data.age : "");
        setEmail(data.email ? data.email : "");
        setGoalWeightKG(data.goalWeightKG ? data.goalWeightKG : "");
        setCurrentWeightKG(data.currentWeightKG ? data.currentWeightKG : "");
        setGoalWeightLBS(data.goalWeightLBS ? data.goalWeightLBS : "");
        setCurrentWeightLBS(data.currentWeightLBS ? data.currentWeightLBS : "");
        setPreference(data.preference ? data.preference : "Metric");
        setGender(data.gender ? data.gender : "Male");
        setHeightImperial(
          data.heightImperial[0]
            ? [data.heightImperial[0], data.heightImperial[1]]
            : ["", ""]
        );
        setHeightMetric(data.heightMetric ? data.heightMetric : "");
        if (
          data.heightMetric &&
          data.heightImperial[0] &&
          data.currentWeightLBS &&
          data.currentWeightKG &&
          (data.heightImperial[1] === 0 || data.heightImperial[1])
        ) {
          setBMIKG(
            data.bmiKG
              ? typeof data.bmiKG === "number"
                ? Number(data.bmiKG)
                : "TBD"
              : Number(data.currentWeightKG) /
                  (Number(data.heightMetric) / 100) ** 2
          );
          setBMILBS(
            data.bmiLBS
              ? typeof data.bmiLBS === "number"
                ? data.bmiLBS
                : "TBD"
              : (Number(data.currentWeightLBS) * 703) /
                  Math.pow(
                    Number(data.heightImperial[0]) * 12 +
                      Number(data.heightImperial[1]),
                    2
                  )
          );
        }
        setWeightLossPerWeekKG(
          data.weightLossPerWeekKG ? data.weightLossPerWeekKG : 0
        );
        setWeightLossPerWeekLBS(
          data.weightLossPerWeekLBS ? data.weightLossPerWeekLBS : 0
        );
        setActivityLevel(data.activityLevel ? data.activityLevel : 1.2);
        setDailyCalorieGoal(
          data.dailyCalorieGoal
            ? data.dailyCalorieGoal
            : data.weightLossPerWeekLBS &&
              data.gender === "Male" &&
              data.currentWeightKG &&
              data.heightMetric &&
              data.age &&
              data.activityLevel
            ? Number(
                (10 * data.currentWeightKG +
                  6.25 * data.heightMetric -
                  5 * data.age +
                  5) *
                  data.activityLevel -
                  (data.weightLossPerWeekLBS * 3500) / 7
              )
            : data.weightLossPerWeekLBS &&
              data.gender === "Female" &&
              data.currentWeightKG &&
              data.heightMetric &&
              data.age &&
              data.activityLevel
            ? Number(
                (10 * data.currentWeightKG +
                  6.25 * data.heightMetric -
                  5 * data.age -
                  161) *
                  data.activityLevel -
                  (data.weightLossPerWeekLBS * 3500) / 7
              )
            : "TBD"
        );

        setProfilePicture(data.profilePicture ? data.profilePicture : "");
        if (data.days.length) {
          if (!averageMacros) {
            handleAverageMacroCalculation(data);
          }
          if (data.days.some((day) => day.date === selectedDateFormatted)) {
            setPreviousData(true);
            const previousDataIndex = data.days.findIndex(
              (day) => day.date === selectedDateFormatted
            );
            setIndexOfPreviousData(previousDataIndex);
            if (data.days[previousDataIndex].totals.calories) {
              setDailyMacros([
                {
                  name: "Protein",
                  value:
                    data.days[previousDataIndex].totals.proteinPercentage * 100,
                },
                {
                  name: "Carbohydrate",
                  value:
                    data.days[previousDataIndex].totals.carbohydratePercentage *
                    100,
                },
                {
                  name: "Fat",
                  value: Number(
                    (
                      data.days[previousDataIndex].totals.fatPercentage * 100
                    ).toFixed(2)
                  ),
                },
              ]);
              setDailyMacrosGrams([
                {
                  name: "Protein",
                  value: data.days[previousDataIndex].totals.protein,
                },
                {
                  name: "Carbohydrate",
                  value: data.days[previousDataIndex].totals.carbohydrates,
                },
                {
                  name: "Fat",
                  value: data.days[previousDataIndex].totals.fat,
                },
              ]);
            }
          } else {
            setPreviousData(false);
            setIndexOfPreviousData(-1);
            setDailyMacros("");
            setDailyMacrosGrams("");
            setTabActiveKey("averageMacros");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (session && initialUser === "") {
      fetchUser(session.user.id);
      setIsLoading(false);
      setIsUnauthenticated(false);
    } else if (session && initialUser != "") {
      if (updatedUser.days.length) {
        if (!averageMacros) {
          handleAverageMacroCalculation(updatedUser);
        }
        if (
          updatedUser.days.some((day) => day.date === selectedDateFormatted)
        ) {
          setPreviousData(true);
          const previousDataIndex = updatedUser.days.findIndex(
            (day) => day.date === selectedDateFormatted
          );
          setIndexOfPreviousData(previousDataIndex);
          if (updatedUser.days[previousDataIndex].totals.calories) {
            setDailyMacros([
              {
                name: "Protein",
                value:
                  updatedUser.days[previousDataIndex].totals.proteinPercentage *
                  100,
              },
              {
                name: "Carbohydrate",
                value:
                  updatedUser.days[previousDataIndex].totals
                    .carbohydratePercentage * 100,
              },
              {
                name: "Fat",
                value: Number(
                  (
                    updatedUser.days[previousDataIndex].totals.fatPercentage *
                    100
                  ).toFixed(2)
                ),
              },
            ]);
            setDailyMacrosGrams([
              {
                name: "Protein",
                value: updatedUser.days[previousDataIndex].totals.protein,
              },
              {
                name: "Carbohydrate",
                value: updatedUser.days[previousDataIndex].totals.carbohydrates,
              },
              {
                name: "Fat",
                value: updatedUser.days[previousDataIndex].totals.fat,
              },
            ]);
          } else {
            setDailyMacros("");
            setDailyMacrosGrams("");
            setTabActiveKey("averageMacros");
          }
        } else {
          setPreviousData(false);
          setIndexOfPreviousData(-1);
          setDailyMacros("");
          setDailyMacrosGrams("");
          setTabActiveKey("averageMacros");
        }
      }
    } else if (status === "loading") {
      setIsLoading(true);
      setIsUnauthenticated(false);
    } else if (status === "unauthenticated") {
      //signIn();
    }

    if (!dailyMacros && tabActiveKey === "dailyMacros") {
      onSetTabActiveKey("averageMacros");
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // initial call

    return () => window.removeEventListener("resize", handleResize);
  }, [selectedDateFormatted, session, tabActiveKey, initialUser, updatedUser]);

  const contextValue = {
    session,
    status,
    show,
    initialUser,
    updatedUser,
    family_name,
    given_name,
    email,
    password,
    newPassword,
    confirmNewPassword,
    profilePicture,
    preview,
    age,
    bmiLBS,
    bmiKG,
    weightLossPerWeekKG,
    weightLossPerWeekLBS,
    handleWeightLossPerWeekChange,
    dailyCalorieGoal,
    currentWeightKG,
    goalWeightKG,
    currentWeightLBS,
    goalWeightLBS,
    heightMetric,
    heightImperial,
    userChanged,
    updating,
    search,
    currentSearch,
    weightLossPerWeekChanged,
    page,
    results,
    foodDetails,
    searchLoading,
    foodDetailsLoading,
    isModalOpen,
    searchModal,
    servings,
    updateServings,
    inputError,
    selectedDate,
    selectedDateFormatted,
    previousData,
    indexOfPreviousData,
    currentMeal,
    dailyMacros,
    averageMacros,
    screenWidth,
    isEditing,
    handleShow,
    handleClose,
    handleUpdateUser,
    handleCancelChanges,
    handleFamilyNameChange,
    handleGivenNameChange,
    handleProfilePictureChange,
    handleAgeChange,
    handleConfirmNewPasswordChange,
    handleCurrentPasswordChange,
    handleEmailChange,
    handleGoalWeightChange,
    handleImperialFeetHeightChange,
    handleImperialInchesHeightChange,
    handleCurrentWeightChange,
    handleMetricHeightChange,
    handlePreferenceChange,
    handleNewPasswordChange,
    nameError,
    ageError,
    currentWeightError,
    goalWeightError,
    heightError,
    passwordError,
    emailError,
    profilePictureError,
    gender,
    handleGenderChange,
    isUnauthenticated,
    isLoading,
    preference,
    pieChartColors,
    handleReduceDate,
    handleDateChange,
    handleIncreaseDate,
    handleSaveChanges,
    handleDeleteFoodItem,
    handleAddFoodItem,
    handleCloseSearchModal,
    handleInputChange,
    handleSearch,
    handlePageChange,
    handleClearSearch,
    handleFoodChoice,
    handleCloseModal,
    handleServingsInput,
    handleUpdateServings,
    handleAddToMeal,
    handleAverageMacroCalculation,
    handleUpdateDailyTotals,
    handleUpdateMealTotals,
    handleFormatDate,
    handleCancelUserChanges,
    handleWeightLossPerWeekCancel,
    handleWeightLossPerWeekSave,
    handleActivityLevelChange,
    handleActivityLevelCancel,
    handleActivityLevelSave,
    activityLevel,
    activityLevelChanged,
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
    myFoods,
    handleCloseMyFoodsModal,
    handleMyFoodChoice,
    handleCloseMyFoodDetailsModal,
    isMyFoodDetailsModalOpen,
    tabActiveKey,
    onSetTabActiveKey,
    averageMacrosGrams,
    dailyMacrosGrams,
    success,
    handleCloseAfterUpdate,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <NavBar
        age={age}
        email={email}
        profilePicture={profilePicture}
        currentPassword={password}
        family_name={family_name}
        given_name={given_name}
        currentWeightKG={currentWeightKG}
        currentWeightLBS={currentWeightLBS}
        goalWeightKG={goalWeightKG}
        goalWeightLBS={goalWeightLBS}
        preference={preference}
        heightImperial={heightImperial}
        heightMetric={heightMetric}
        userChanged={userChanged}
        updating={updating}
        newPassword={newPassword}
        confirmNewPassword={confirmNewPassword}
        preview={preview}
        initialUser={initialUser}
        onUpdateUser={handleUpdateUser}
        onCancelChanges={handleCancelChanges}
        onFamilyNameChange={handleFamilyNameChange}
        onGivenNameChange={handleGivenNameChange}
        onProfilePictureChange={handleProfilePictureChange}
        onAgeChange={handleAgeChange}
        onConfirmNewPasswordChange={handleConfirmNewPasswordChange}
        onCurrentPasswordChange={handleCurrentPasswordChange}
        onEmailChange={handleEmailChange}
        onGoalWeightChange={handleGoalWeightChange}
        onImperialFeetHeightChange={handleImperialFeetHeightChange}
        onImperialInchesHeightChange={handleImperialInchesHeightChange}
        onCurrentWeightChange={handleCurrentWeightChange}
        onMetricHeightChange={handleMetricHeightChange}
        onPreferenceChange={handlePreferenceChange}
        onNewPasswordChange={handleNewPasswordChange}
        show={show}
        onClose={handleClose}
        status={status}
        onShow={handleShow}
        onCloseAfterUpdate={handleCloseAfterUpdate}
      />
      {children}
    </UserContext.Provider>
  );
}
