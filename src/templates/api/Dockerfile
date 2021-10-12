FROM node:14 as base
WORKDIR /code
ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm ci --silent
ADD src src
ADD .webpack .webpack

FROM base as builder
ARG NODE_ENV=production
ARG VERSION
RUN npm run build

FROM node:14-alpine
RUN adduser -D -g '' nodeuser
USER nodeuser
WORKDIR /code
COPY --from=builder /code/dist/ .
ENV PORT 80
ARG NODE_ENV=production
EXPOSE 80
CMD node .
