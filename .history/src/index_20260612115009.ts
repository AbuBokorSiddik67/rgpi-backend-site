import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Institute TypeScript Backend Server is Running!" });
});

app.listen(PORT, () => {
  console.log(`⚡ [server]: Server is running at http://localhost:${PORT}`);
});