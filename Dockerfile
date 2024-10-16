FROM node:21-alpine

ENV TZ="Europe/London"

USER root

RUN apk add --no-cache \
    openjdk17-jre-headless \
    curl \
    aws-cli

WORKDIR /app

COPY . .
RUN npm install

ENV HTTP_PROXY=localhost:3128

ENTRYPOINT [ "./entrypoint.sh" ]
