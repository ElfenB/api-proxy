# build stage
FROM node:16.14.2-alpine as build-stage
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .
RUN yarn build

# production stage
FROM node:16.14.2-alpine as production-stage
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY --from=build-stage ./app/dist/ ./dist/
COPY --from=build-stage ./app/node_modules/ ./node_modules/
COPY --from=build-stage ./app/package.json ./
COPY --from=build-stage ./app/.env ./

EXPOSE 3000

CMD [ "yarn", "start" ]
