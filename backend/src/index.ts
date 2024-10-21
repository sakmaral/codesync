import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
