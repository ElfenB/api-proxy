import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { fetchUrl } from './server.utils';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

console.log(port);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.get('/proxy/:url', async (req: Request, res: Response) => {
  const url = req.params.url;
  const params = req.query;

  // console.info('url', url);
  // console.info('params', params);

  const repl = await fetchUrl(url, params);

  res.send(repl);
});
