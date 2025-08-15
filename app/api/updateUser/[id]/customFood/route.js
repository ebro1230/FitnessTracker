import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { uploadFileToS3 } from "@/lib/s3";
const NextResponseDefault = NextResponse.default;

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params; // Get the dynamic ID from the URL
    const user = await User.findById(id); // Find user by ID
    let myFoodsArray = [];
    const formData = await req.formData();

    let foodDetails = formData.get("foodDetails");
    foodDetails = JSON.parse(foodDetails);

    try {
      if (user.myFoods.length) {
        if (
          user.myFoods.some((food) => {
            return food.description === foodDetails.description;
          })
        ) {
          throw new Error(
            `Your "My Foods" already contain a food with that name.\nPlease enter a unique name.`
          );
        } else {
          myFoodsArray = user.myFoods.push(foodDetails);
        }
      } else {
        myFoodsArray = [foodDetails];
      }
    } catch (error) {
      console.error("Error Adding Food, Please Try Again", error);
      return NextResponseDefault.json(
        { error: error.message },
        { status: 400 }
      );
    }
    const updatedUser = await User.findByIdAndUpdate(
      id, // The ID of the user to update
      { $set: { myFoods: myFoodsArray } }, // dynamically set the field
      { new: true, runValidators: true } // return updated doc & validate
    );
    return NextResponseDefault.json(updatedUser, { status: 201 });
  } catch (error) {
    return NextResponseDefault.json({ error: error.message }, { status: 400 });
  }
}
