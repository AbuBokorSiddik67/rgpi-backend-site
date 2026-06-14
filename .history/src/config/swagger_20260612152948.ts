import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { A } from 'express';

// swaggerJSDoc ফাংশনের প্রথম প্যারামিটারের টাইপটি আমরা এখানে নিচ্ছি
// এর ফলে কোনো 'any' ব্যবহার ছাড়াই নিখুঁত টাইপ সেফটি পাওয়া যাবে
const options: Parameters<typeof swaggerJSDoc>[0] = {
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
  apis: ['./src/routes/*.ts', './src/server.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}