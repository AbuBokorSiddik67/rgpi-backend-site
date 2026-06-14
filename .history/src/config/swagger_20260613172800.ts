import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options: Parameters<typeof swaggerJSDoc>[0] = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RGPI Institute Management API",
      version: "1.0.0",
      description: "API documentation for the RGPI backend system",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1", // 💡 আপনার এপিআই-এর বেস ইউআরএল দিলে ভালো হয়
        description: "Development server",
      },
    ],
  },
  apis: ["./src/**/*.ts", "./src/**/*.js", "./src/server.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Application): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
