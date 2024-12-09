import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

// Handle POST requests for signup
export async function POST(req: Request) {
  const { firstName, lastName, email, password, roleId } = await req.json();

  // Check if all required fields are present
  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roleId,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user: ", error);
    return NextResponse.json({ error: "User creation failed" }, { status: 500 });
  }
}
