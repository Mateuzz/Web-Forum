FROM alpine:3.19

RUN apk update && apk add \
        postgresql

ENV PGDATA=/var/lib/postgresql/data
ENV DB_DATABASE=app

ENV DB_USERNAME=app_server
ENV DB_PASSWORD=123456

RUN mkdir /var/run/postgresql ${PGDATA} && \ 
    chown -R postgres /var/run/postgresql && \
    chown -R postgres /var/lib/postgresql && \
    chown -R postgres /var/log/postgresql


WORKDIR /app

COPY ./server.sh .

EXPOSE 5432
VOLUME [ "/var/lib/postgresql/data" ]

USER postgres

CMD exec sh -c "/app/server.sh && /bin/sleep infinity"
