import axios from 'axios';
import { ParsedQs } from 'qs';

export async function fetchUrl(url: string, params: ParsedQs) {
  console.log(`Fetching data for url ${url}`);

  const res = await axios.get(url, {
    headers: {
      Cookie: 'schoolname="_YmJzIGJpbmdlbg=="',
    },
    params,
  });
  
  return res.data;
}
