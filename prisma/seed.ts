const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        {
          name: "Famous People",
        },
        {
          name: "Movies & TV",
        },
        {
          name: "Musician",
        },
        {
          name: "Games",
        },
        {
          name: "Animals",
        },
        {
          name: "Philosophy",
        },
        {
          name: "Scientist",
        },
      ],
    });
    console.log("Seeded Successfully!");
  } catch (error) {
    console.log("Error seeding categoris", error);
  } finally {
    await db.$disconnect();
  }
}

main();
