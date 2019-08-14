FROM node:8.9-alpine

WORKDIR /usr/blox

ENV NODE_ENV=production

COPY package*.json ./
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

COPY . .
RUN ["npm", "run", "build"]

CMD ["npm", "start"]
