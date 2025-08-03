import { createRouter } from "next-connect";
import { NextResponse } from "next/server";
import bodyParser from "body-parser";
import cors from "cors";

const handler = createRouter();

// Attach bodyParser middleware
handler.use(
  cors({
    origin: "*", // Allow all origins
  })
);
handler.use(bodyParser.urlencoded({ extended: false }));
handler.use(bodyParser.json());

handler.post(async (req) => {
  return req.json().then(async (body) => {
    const fdcId = body.fdcId;

    return fetch(
      `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${process.env.API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("RETURNED FOOD DETAILS");

        const calories = data.foodNutrients.find(
          (nutrient) => nutrient.nutrient.id === 1008
        );
        const protein = data.foodNutrients.find(
          (nutrient) => nutrient.nutrient.id === 1003
        );
        const fat = data.foodNutrients.find(
          (nutrient) => nutrient.nutrient.id === 1004
        );
        const carbohydrates = data.foodNutrients.find(
          (nutrient) => nutrient.nutrient.id === 1005
        );
        const foodDetails = {
          description: data.description,
          brandName: data.brandName,
          brandOwner: data.brandOwner,
          fdcId: data.fdcId,
          ingredients: data.ingredients,
          servingSize: data.servingSize,
          servingSizeUnit: data.servingSizeUnit,
          nutrients: data.foodNutrients.map((nutrient) => {
            return {
              name: nutrient.nutrient.name,
              id: nutrient.nutrient.id,
              amount: nutrient.amount,
              amountPerServing: !data.servingSize
                ? nutrient.amount
                : (nutrient.amount * data.servingSize) / 100,
              unit: nutrient.nutrient.unitName,
              number: nutrient.nutrient.number,
            };
          }),
          calories: {
            name: calories.nutrient.name,
            id: calories.nutrient.id,
            amount: calories.amount,
            amountPerServing: !data.servingSize
              ? calories.amount
              : (calories.amount * data.servingSize) / 100,
            unit: calories.nutrient.unitName,
            number: calories.nutrient.number,
          },
          protein: {
            name: protein.nutrient.name,
            id: protein.nutrient.id,
            amount: protein.amount,
            amountPerServing: !data.servingSize
              ? protein.amount
              : (protein.amount * data.servingSize) / 100,
            unit: protein.nutrient.unitName,
            number: protein.nutrient.number,
          },
          fat: {
            name: fat.nutrient.name,
            id: fat.nutrient.id,
            amount: fat.amount,
            amountPerServing: !data.servingSize
              ? fat.amount
              : (fat.amount * data.servingSize) / 100,
            unit: fat.nutrient.unitName,
            number: fat.nutrient.number,
          },
          carbohydrates: {
            name: carbohydrates.nutrient.name,
            id: carbohydrates.nutrient.id,
            amount: carbohydrates.amount,
            amountPerServing: !data.servingSize
              ? carbohydrates.amount
              : (carbohydrates.amount * data.servingSize) / 100,
            unit: carbohydrates.nutrient.unitName,
            number: carbohydrates.nutrient.number,
          },
        };
        console.log(foodDetails);
        return NextResponse.json(foodDetails, { status: 200 });
      });
  });
});

export async function POST(request, context) {
  return handler.run(request, context);
}
