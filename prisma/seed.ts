// prisma/seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
async function main() {

  // Create products
  const products = await prisma.product.createMany({
    data: [
      {
        name: '7 Shakra Bracelet',
        description: '7 chakra bracelet, in blue or black.',
        price: 42.99,
        stock: 1,
        imageUrl: 'https://burst.shopifycdn.com/photos/7-chakra-bracelet_925x.jpg',
        categoryId: 11, // Bracelet
        userId: 1, // Replace with appropriate user ID
      }
    ],
  });


  console.log(`${products.count} products created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });