FROM node:lts-alpine AS packages

ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

WORKDIR /app

RUN yarn --frozen-lockfile

FROM packages

ADD . /app

ENV NODE_ENV=production
ENV PORT=5000

RUN yarn build

EXPOSE 5000

CMD ["node", "./dist/server.js"]