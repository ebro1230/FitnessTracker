import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

const NextResponse = NextResponse.default
console.log("Next Response:", typeof NextResponse)

export async function GET(req, { params }) {
  await connectToDatabase();

  try {
    const { id } = await params; // Get the dynamic ID from the URL
    const user = await User.findById(id); // Find user by ID

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const body = await req.json(); // Parse JSON in App Router
    const user = await User.findByIdAndUpdate(
      body._id, // The ID of the user to update
      body, // The data to update
      { new: true, runValidators: true } // Options: return updated document, run validation
    );
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
