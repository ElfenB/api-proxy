import axios from 'axios';
import { ParsedQs } from 'qs';

export async function fetchUrl(url: string, params: ParsedQs, headers?: {}) {
  console.log(`Fetching data for url ${url}`);

  const res = await axios.get(url, {
    headers,
    params,
  });

  return res.data;
}
