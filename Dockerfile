FROM postgres:14.6-alpine

COPY init.sql /docker-entrypoint-initdb.d/