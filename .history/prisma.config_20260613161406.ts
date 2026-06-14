import "dotenv/config";
import { defineConfig } from "prisma/config";
import process from "node:process";

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL,
  },
});

// import { defineConfig } from "@prisma/config";

// export default defineConfig({
//   schema: "prisma/schema.prisma",
//   datasource: {
//     url: process.env.DATABASE_URL || "",
//   },
// });
