FROM node:14.18.1-alpine AS builder

WORKDIR /usr/app

COPY . /usr/app

RUN rm -rf /usr/app/node_modules/

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.19-alpine AS server

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/build /usr/share/nginx/html