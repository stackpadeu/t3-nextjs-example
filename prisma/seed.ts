import { randomUUID } from "node:crypto";
import { PrismaClient } from "../generated/prisma/index.js";

const db = new PrismaClient();

async function main() {
  const user = await db.user.upsert({
    where: { email: "info@jrsb.nl" },
    update: {},
    create: {
      id: randomUUID(),
      name: "Jeroen Breemhaar",
      email: "info@jrsb.nl",
      emailVerified: true,
    },
  });

  const posts = await db.$transaction([
    db.post.create({
      data: { name: "Eerste post", createdById: user.id },
    }),
    db.post.create({
      data: { name: "Tweede post", createdById: user.id },
    }),
  ]);

  console.log("Created user:", user);
  console.log("Created posts:", posts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());