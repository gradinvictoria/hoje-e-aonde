import { PrismaClient } from "@prisma/client";
import { reseedPlacesFromOsm } from "../src/places/reseedOsm";

const prisma = new PrismaClient();

reseedPlacesFromOsm(prisma)
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
