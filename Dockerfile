FROM node:18 AS builder

WORKDIR /app

RUN npm init -y
RUN npm install next react react-dom

COPY . .

FROM node:18-slim

WORKDIR /app

EXPOSE 3000

CMD ["npm", "start"]
