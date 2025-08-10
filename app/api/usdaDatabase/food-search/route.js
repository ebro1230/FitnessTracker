import { createRouter } from "next-connect";
import { NextResponse } from "next/server";
import bodyParser from "body-parser";
import cors from "cors";
const NextResponseDefault = NextResponse.default;

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
    const search = body.search;
    const page = body.page;
    console.log("PAGE");
    console.log(page);

    return fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.API_KEY}&query=${search}*&pageSize=25&pageNumber=${page}&dataType=Branded&sortBy=score&sortOrder=asc`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("RETURNED DATA");
        console.log(data);
        const foodData = {
          totalHits: data.totalHits,
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          pageList: data.pageList,
          foods: data.foods.map((foodItem) => {
            return {
              fdcId: foodItem.fdcId,
              description: foodItem.description ? foodItem.description : null,
              brandOwner: foodItem.brandOwner ? foodItem.brandOwner : null,
              brandName: foodItem.brandName ? foodItem.brandName : null,
              packageWeight: foodItem.packageWeight
                ? foodItem.packageWeight
                : null,
              servingSize: foodItem.servingSize
                ? Number(foodItem.servingSize.toFixed(2))
                : null,
              servingSizeUnit: foodItem.servingSizeUnit
                ? foodItem.servingSizeUnit.toLowerCase()
                : null,
              householdServingFullText: foodItem.householdServingFullText
                ? foodItem.householdServingFullText
                : null,
            };
          }),
        };
        return NextResponseDefault.json(foodData, { status: 200 });
      });
  });
});

export async function POST(request, context) {
  return handler.run(request, context);
}
