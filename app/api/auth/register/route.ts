import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await hash(password, 10);

    const response = await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name},${email}, ${hashedPassword})
  `;
  

  } catch (error) {
    console.log(error)
  }

  return NextResponse.json({ message: 'success' })
}
