import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const liking = await prisma.liking.create({
    data: {
      displayName: "レモン",
      description: "めっちゃ好き",
      isLike: true,
      isAllergy: false,
      alias: {
        create: [
          { alias: "れもん" },
          { alias: "檸檬" },
        ]
      },
    },
  });
  console.log(liking);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
