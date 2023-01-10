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
  let headers = params.headers;
  if (!(headers instanceof Object)) {
    try {
      headers = JSON.parse(decodeURI(params.headers as string));
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  }
  // Reset this on the params
  params.headers = undefined;

  console.log(
    `Received request for url ${url} and params ${JSON.stringify(params)} and headers ${JSON.stringify(headers)}`
  );

  const repl = await fetchUrl(url, params, headers);
  console.log(`Sent back data for url ${url}`);

  res.send(repl);
});
