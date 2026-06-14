import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RGPI Institute Management API',
      version: '1.0.0',
      description: 'API documentation for the RGPI backend system',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  // src ফোল্ডারের ভেতরের সব রাউট ফাইল থেকে ডকুমেন্টেশন রিড করবে
  apis: ['./src/routes/*.ts', './src/server.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}