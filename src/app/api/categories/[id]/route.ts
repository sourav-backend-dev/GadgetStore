import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const categoryId = parseInt(params.id);
  const body = await request.json();

  if (isNaN(categoryId)) {
    return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
  }

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: body, // Update fields dynamically
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: 'Error updating category' }, { status: 500 });
  }
}
