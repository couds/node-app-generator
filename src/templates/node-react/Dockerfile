FROM node:12 as base
WORKDIR /code
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN apt-get update && apt-get install libgl1 --yes
RUN npm ci --silent --no-optional

FROM base as builder
ADD src src
ADD .webpack .webpack
ADD .linguirc .linguirc
ADD .babelrc .babelrc
ARG NODE_ENV=production
ARG VERSION
ARG CDN
RUN npm run build

FROM node:12-alpine
RUN npm i -g nodemon
WORKDIR /code
COPY --from=builder /code/dist/ .
ENV PORT 80
ARG NODE_ENV=production
EXPOSE 80
CMD node server
