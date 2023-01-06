import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { fetchUrl } from './server.utils';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`\n⚡️[server]: Server is running at http://localhost:${port}\n`);
});

app.get('/proxy/:url', async (req: Request, res: Response) => {
  const url = req.params.url;
  const params = req.query;

  console.log(`Received request for url ${url} and params ${JSON.stringify(params)}`)

  const repl = await fetchUrl(url, params);
  console.log(`Sent back data for url ${url}`)

  res.send(repl);
});
