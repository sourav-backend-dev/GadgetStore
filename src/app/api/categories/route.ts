import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  const newCategory = await prisma.category.create({
    data: {
      name,
    },
  });
  return NextResponse.json(newCategory);
}
