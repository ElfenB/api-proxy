# Simple API-Proxy

This express app acts as a small simple api-proxy server.

There are several different use-cases for this:

1. The actual API you want to use does not send the cors headers you need
2. You want to adjust the data in a backend before sending it to your frontend
3. You are not allowed to set specific cookies directly from within the frontend
4. Your own specific reason here ...

## Installation

### Docker

```shell
docker-compose up -d --build
```

### Native (Node)

```shell
yarn build
```

```shell
yarn start
```

### Development Server

```shell
yarn dev
```

## Usage

Send requests to the proxy endpoint like this:

### Example

```rest
Sample url:
https://<your-endpoint-url>/proxy/<your-api-url-encoded>

https://api.publicapis.org/entries => urlencode => https%3A%2F%2Fapi.publicapis.org%2Fentries

https://my-endpoint-url.com/proxy/https%3A%2F%2Fapi.publicapis.org%2Fentries
```

### Typescript (with axios)

```typescript
const proxyUrl = 'https://my-endpoint-url.com';
const url = encodeURIComponent('https://api.publicapis.org/entries');

const res = await axios.get(proxyUrl + url, {
  // Query params
  params: {
    title: 'og',
    cors: 'no',
    // When not using proxy, move this outside of params
    headers: {
      Cookie: 'key="value"',
    },
  },
});
return res.data;
```

As in the example above, cookies can be send as a query param, within the headers object.
