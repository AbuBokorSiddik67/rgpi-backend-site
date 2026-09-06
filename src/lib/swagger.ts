import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options: Parameters<typeof swaggerJSDoc>[0] = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RGPI Management API",
      version: "1.0.0",
      description: "API documentation for the RGPI backend system",
    },
    servers: [
      {
        url: "/",
        description: "Current Environment (Local or Vercel)",
      },
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
  apis: [
    path.join(__dirname, "../app.ts"),
    path.join(__dirname, "../app.js"),
    path.join(__dirname, "../app/routes/**/*.ts"),
    path.join(__dirname, "../app/routes/**/*.js"),
    path.join(__dirname, "../modules/**/*.ts"),
    path.join(__dirname, "../modules/**/*.js"),
    path.join(__dirname, "../routes/**/*.ts"),
    path.join(__dirname, "../routes/**/*.js"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions = {
  customCssUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.min.css",
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-standalone-preset.js",
  ],
};

export function setupSwagger(app: Application): void {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions),
  );
}
