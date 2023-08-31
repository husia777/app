FROM node:19-alpine3.16 as build
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . . 
RUN npm run build 
RUN npm start


FROM nginx:1.21-alpine
EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

