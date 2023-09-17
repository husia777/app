FROM nginx:1.21-alpine
 
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
RUN apk add --update python3 py3-pip
RUN apk add certbot
RUN pip install certbot-nginx


RUN mkdir -p /var/www/letsencrypt

RUN certbot certonly --standalone -d huseinnaimov.com --agree-tos --email huseinnaimov@bk.ru --non-interactive --no-eff-email 
COPY /etc/letsencrypt/live/huseinnaimov.com/fullchain.pem /etc/nginx/ssl/cert.crt
COPY /etc/letsencrypt/live/huseinnaimov.com/privkey.pem /etc/nginx/ssl/cert.key