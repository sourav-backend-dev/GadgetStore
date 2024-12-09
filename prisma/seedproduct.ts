// prisma/seedcategory.ts
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create electronic products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'iPhone 14 Pro',
        description: 'Latest Apple iPhone with 6.1-inch display, A16 chip, and triple-camera system.',
        price: 999.99,
        stock: 50,
        imageUrl: 'https://m.media-amazon.com/images/I/81+GIkwqLIL._SX679_.jpg',
        categoryId: 1, // Smartphones
        userId: 1, // Replace with appropriate user ID
      },
      {
        name: 'Samsung Galaxy S23 Ultra',
        description: 'Flagship smartphone with a 200MP camera, 6.8-inch display, and Snapdragon 8 Gen 2.',
        price: 1199.99,
        stock: 40,
        imageUrl: 'https://m.media-amazon.com/images/I/41Z2gCkqEUL._SX300_SY300_QL70_FMwebp_.jpg',
        categoryId: 1, // Smartphones
        userId: 1,
      },
      {
        name: 'MacBook Pro 16-inch',
        description: 'Apple MacBook Pro with M1 Pro chip, 16-inch Retina display, and long battery life.',
        price: 2499.99,
        stock: 30,
        imageUrl: 'https://m.media-amazon.com/images/I/618d5bS2lUL._SX679_.jpg',
        categoryId: 2, // Laptops
        userId: 1,
      },
      {
        name: 'Dell XPS 13',
        description: 'Premium ultrabook with Intel i7 processor, 13.4-inch 4K display, and long battery life.',
        price: 1399.99,
        stock: 25,
        imageUrl: 'https://m.media-amazon.com/images/I/41UeV99zOFL._SX300_SY300_QL70_FMwebp_.jpg',
        categoryId: 2, // Laptops
        userId: 1,
      },
      {
        name: 'Sony WH-1000XM5',
        description: 'Wireless noise-canceling over-ear headphones with superb sound quality.',
        price: 349.99,
        stock: 100,
        imageUrl: 'https://www.sony.com/image/2a3f5e6cb2b53148086298c29ccca4ec?fmt=pjpeg&bgcolor=ffffff&bgc=ffffff&wid=1860&hei=1035',
        categoryId: 3, // Headphones
        userId: 1,
      },
      {
        name: 'Bose QuietComfort 45',
        description: 'Noise-canceling wireless headphones with world-class sound and comfort.',
        price: 329.99,
        stock: 80,
        imageUrl: 'https://www.bose.com/content/dam/Bose_DAM/Web/Consumer_Electronics/Headphones/QC45/quietcomfort_45_bose_hero_1024x1024.jpg',
        categoryId: 3, // Headphones
        userId: 1,
      },
      {
        name: 'Apple Watch Series 8',
        description: 'Smartwatch with advanced health features like ECG, blood oxygen, and temperature sensing.',
        price: 399.99,
        stock: 60,
        imageUrl: 'https://m.media-amazon.com/images/I/41oFI9n8m9L._SX300_SY300_QL70_FMwebp_.jpg',
        categoryId: 4, // Smart Watches
        userId: 1,
      },
      {
        name: 'Samsung Galaxy Watch 6',
        description: 'Fitness and health-tracking smartwatch with 1.5-inch AMOLED display and up to 40 hours of battery life.',
        price: 349.99,
        stock: 50,
        imageUrl: 'https://m.media-amazon.com/images/I/41WXXkxrc+L._SY300_SX300_.jpg',
        categoryId: 4, // Smart Watches
        userId: 1,
      },
      {
        name: 'Canon EOS R5',
        description: 'Mirrorless digital camera with a 45MP sensor, 8K video, and fast autofocus.',
        price: 3899.99,
        stock: 15,
        imageUrl: 'https://m.media-amazon.com/images/I/51VJY3OFEBL._SY300_SX300_QL70_FMwebp_.jpg',
        categoryId: 5, // Cameras
        userId: 1,
      },
      {
        name: 'Sony A7 III',
        description: 'Full-frame mirrorless camera with 24.2MP sensor and 4K video recording.',
        price: 1999.99,
        stock: 20,
        imageUrl: 'https://m.media-amazon.com/images/I/318FD8X6ndL._SX300_SY300_QL70_FMwebp_.jpg',
        categoryId: 5, // Cameras
        userId: 1,
      },
      {
        name: 'LG OLED C2 55-inch',
        description: '55-inch OLED smart TV with 4K resolution and webOS platform for streaming.',
        price: 1499.99,
        stock: 40,
        imageUrl: 'https://m.media-amazon.com/images/I/41Lein6Gi4L._SX300_SY300_QL70_FMwebp_.jpg',
        categoryId: 6, // Televisions
        userId: 1,
      },
      {
        name: 'Samsung QLED 75-inch',
        description: 'Large 75-inch QLED TV with 4K resolution, HDR, and AI-enhanced picture quality.',
        price: 1899.99,
        stock: 35,
        imageUrl: 'https://m.media-amazon.com/images/I/519sokimO0S._SY300_SX300_QL70_FMwebp_.jpg',
        categoryId: 6, // Televisions
        userId: 1,
      },
      {
        name: 'Apple iPad Air (5th Gen)',
        description: '10.9-inch tablet with Apple M1 chip and liquid Retina display.',
        price: 599.99,
        stock: 100,
        imageUrl: 'https://m.media-amazon.com/images/I/31maRjvUQfL._SY445_SX342_QL70_FMwebp_.jpg',
        categoryId: 7, // Tablets
        userId: 1,
      },
      {
        name: 'Samsung Galaxy Tab S8',
        description: 'High-performance tablet with 12.4-inch AMOLED display, Snapdragon processor, and S Pen support.',
        price: 849.99,
        stock: 75,
        imageUrl: 'https://m.media-amazon.com/images/I/31B51tyBwdL._SX300_SY300_QL70_FMwebp_.jpg',
        categoryId: 7, // Tablets
        userId: 1,
      },
      {
        name: 'Sony PlayStation 5',
        description: 'Next-gen gaming console with 4K gaming, ultra-fast load times, and incredible graphics.',
        price: 499.99,
        stock: 150,
        imageUrl: 'https://m.media-amazon.com/images/I/41mA095BwTL._SX300_SY300_QL70_FMwebp_.jpg',
        categoryId: 8, // Gaming Consoles
        userId: 1,
      },
      {
        name: 'Microsoft Xbox Series X',
        description: 'Powerful gaming console with 4K graphics, 120FPS gameplay, and a large game library.',
        price: 499.99,
        stock: 120,
        imageUrl: 'https://m.media-amazon.com/images/I/41YzPePn9iL._SX300_SY300_QL70_FMwebp_.jpg',
        categoryId: 8, // Gaming Consoles
        userId: 1,
      },
      {
        name: 'Dyson V11 Torque Drive',
        description: 'Cordless vacuum cleaner with powerful suction and advanced filtration system.',
        price: 599.99,
        stock: 25,
        imageUrl: 'https://m.media-amazon.com/images/I/31WFvU8OZxL._SX300_SY300_QL70_FMwebp_.jpg',
        categoryId: 9, // Home Appliances
        userId: 1,
      },
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
