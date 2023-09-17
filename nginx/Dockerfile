FROM nginx:1.21-alpine
 
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
# RUN apk add --no-cache certbot openssl

# RUN certbot certonly --standalone -d huseinnaimov.com --agree-tos --email huseinnaimov@bk.ru --non-interactive --no-eff-email

# COPY /etc/letsencrypt/live/huseinnaimov.com/fullchain.pem /etc/nginx/ssl/cert.crt
# COPY /etc/letsencrypt/live/huseinnaimov.com/privkey.pem /etc/nginx/ssl/cert.key