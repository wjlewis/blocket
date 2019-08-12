FROM node:8.9-alpine

WORKDIR /usr/blocket

ENV NODE_ENV=production

COPY package*.json ./
RUN ["npm", "install"]

COPY . .
RUN ["npm", "run", "build"]

CMD ["npm", "start"]
