FROM node:lts-alpine as builder

COPY . /docker/web

WORKDIR /docker/web
RUN rm -rf dist/ node_modules/
RUN yarn install
RUN yarn build

FROM nginx:alpine

COPY --from=0 /docker/web/dist /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
