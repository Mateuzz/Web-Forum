FROM alpine

WORKDIR /app

RUN apk update && apk add \
        nginx \
        nodejs \
        npm

COPY package* .
RUN npm i

ENV VITE_API_URL="http://api.localhost"
ENV VITE_API_BASE_PATH="api"

COPY . .
RUN chmod +x ./server.sh

EXPOSE 80

CMD ["./server.sh"]
