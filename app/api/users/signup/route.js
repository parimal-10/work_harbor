import { getDbClient } from "@/utils/database";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const db = getDbClient(); 

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { firstName, lastName, email, phone, password, confirmPassword } =
      reqBody;
    const response = await db.query("SELECT * FROM users WHERE email=$1", [email])
    const user = response.rows;

    if (user.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    console.log("here");
    if (password != confirmPassword) {
      return NextResponse.json(
        { message: "Password does not match" },
        { status: 400 }
      );
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const res = await db.query("INSERT INTO users (firstname, lastname, email, phone, role, password) VALUES ($1, $2, $3, $4, $5, $6)", [firstName, lastName, email, phone, 'user', hashedPassword]);
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
