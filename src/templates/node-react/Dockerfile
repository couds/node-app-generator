FROM node:14 as base
WORKDIR /code
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN apt-get update && apt-get install libgl1 --yes
RUN npm ci --silent --no-optional
ADD src src
ADD .webpack .webpack
ADD .linguirc .linguirc

FROM base as builder
ARG NODE_ENV=production
ARG VERSION
ARG CDN
RUN npm run build

FROM node:14-alpine
RUN npm i -g nodemon
RUN adduser -D -g '' nodeuser
USER nodeuser
WORKDIR /code
COPY --from=builder /code/dist/ .
ENV PORT 80
ARG NODE_ENV=production
EXPOSE 80
CMD node server
