FROM alpine:3.19

RUN apk update && apk add \
    redis

WORKDIR /app

COPY ./data/redis.conf /etc/redis/redis.conf

EXPOSE 6379

CMD [ "redis-server", "/etc/redis/redis.conf" ]
