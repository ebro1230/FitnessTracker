import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectToDatabase();
    let body = await req.json(); // Parse JSON in App Router
    console.log("BODY");
    console.log(body.email);
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      console.log("USER EXISTS");
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    } else {
      console.log("USER DOESN'T EXIST");
      body.password = await bcrypt.hash(body.password, 10); // 10 is the salt rounds

      const newUser = await User.create({
        email: body.email,
        password: body.password,
        family_name: body.family_name,
        given_name: body.given_name,
        age: body.age,
      });
      return NextResponse.json(newUser, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
