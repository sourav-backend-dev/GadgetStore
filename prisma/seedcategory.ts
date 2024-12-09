// prisma/seedcategory.ts
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await prisma.category.createMany({
    data: [
      {
        name: 'Smartphones',
      },
      {
        name: 'Laptops',
      },
      {
        name: 'Headphones',
      },
      {
        name: 'Smart Watches',
      },
      {
        name: 'Cameras',
      },
      {
        name: 'Televisions',
      },
      {
        name: 'Tablets',
      },
      {
        name: 'Gaming Consoles',
      },
      {
        name: 'Home Appliances',
      },
      {
        name: 'Speakers',
      },
    ],
  });

  console.log(`${categories.count} categories created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
