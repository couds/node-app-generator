FROM node:12 as base
WORKDIR /code
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm ci --silent

FROM base as builder
ADD src src
ADD webpack.config.js webpack.config.js
ARG NODE_ENV=production
ARG VERSION
RUN npm run build

FROM node:12-alpine
RUN npm i -g nodemon
WORKDIR /code
COPY --from=builder /code/dist/ .
ENV PORT 80
ARG NODE_ENV=production
EXPOSE 80
CMD node .