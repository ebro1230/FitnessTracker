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
    let otherFields = {};
    const formData = await req.formData();

    // Grab normal text fields
    const family_name = formData.get("family_name");
    const given_name = formData.get("given_name");
    const preference = formData.get("preference");
    const age = formData.get("age");
    const currentWeightKG = formData.get("currentWeightKG");
    const currentWeightLBS = formData.get("currentWeightLBS");
    const goalWeightKG = formData.get("goalWeightKG");
    const goalWeightLBS = formData.get("goalWeightLBS");
    const heightImperialFeet = formData.get("heightImperialFeet");
    const heightImperialInches = formData.get("heightImperialInches");
    const gender = formData.get("gender");
    let heightImperial = [];
    if (heightImperialFeet && heightImperialInches) {
      heightImperial = [heightImperialFeet, heightImperialInches];
    } else if (heightImperialFeet) {
      heightImperial = [heightImperialFeet, 0];
    } else if (heightImperialInches) {
      heightImperial = [0, heightImperialInches];
    }
    const heightMetric = formData.get("heightMetric");
    const email = formData.get("email");
    const password = formData.get("password");
    const newPassword = formData.get("newPassword");
    const bmiKG = formData.get("bmiKG");
    const bmiLBS = formData.get("bmiLBS");
    let days = formData.get("days");
    days = JSON.parse(days);

    // Get the file
    const profilePicture = formData.get("profilePicture"); // must match the frontend field name

    if (password && newPassword) {
      try {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Incorrect Password");
        }
        if (password === newPassword) {
          throw new Error("New Password can't be the same as the Old Password");
        }
        if (isValidPassword) {
          const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds
          otherFields.password = hashedPassword; // Replace the password field with the hashed password
        }
      } catch (error) {
        console.error("Error Updating Password, Please Try Again", error);
        return NextResponseDefault.json({ error: error.message }, { status: 400 });
      }
    }
    if (profilePicture) {
      console.log("profilePicture");
      console.log(profilePicture);
      try {
        const uploadedUrl = await uploadFileToS3(profilePicture);
        otherFields.profilePicture = uploadedUrl;
      } catch (error) {
        console.error(
          "Error Uploading Profile Picture, Please Restart the Application and Try Again",
          error
        );
        return NextResponseDefault.json({ error: error.message }, { status: 400 });
      }
    }
    family_name ? (otherFields.family_name = family_name) : null;
    given_name ? (otherFields.given_name = given_name) : null;
    preference ? (otherFields.preference = preference) : null;
    age ? (otherFields.age = age) : null;
    currentWeightKG ? (otherFields.currentWeightKG = currentWeightKG) : null;
    currentWeightLBS ? (otherFields.currentWeightLBS = currentWeightLBS) : null;
    goalWeightKG ? (otherFields.goalWeightKG = goalWeightKG) : null;
    goalWeightLBS ? (otherFields.goalWeightLBS = goalWeightLBS) : null;
    heightImperial.length
      ? (otherFields.heightImperial = heightImperial)
      : null;
    heightMetric ? (otherFields.heightMetric = heightMetric) : null;
    email ? (otherFields.email = email) : null;
    gender ? (otherFields.gender = gender) : null;
    days ? (otherFields.days = days) : null;
    bmiKG ? (otherFields.bmiKG = bmiKG) : null;
    bmiLBS ? (otherFields.bmiLBS = bmiLBS) : null;

    console.log(otherFields);

    const updatedUser = await User.findByIdAndUpdate(
      id, // The ID of the user to update
      { $set: otherFields }, // Update all fields, including the hashed password if present
      { new: true, runValidators: true } // Options: return updated document, run validation
    );
    return NextResponseDefault.json(updatedUser, { status: 201 });
  } catch (error) {
    return NextResponseDefault.json({ error: error.message }, { status: 400 });
  }
}
