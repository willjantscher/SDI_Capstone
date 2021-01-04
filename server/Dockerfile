FROM node:current-alpine

RUN mkdir -p /src/server

WORKDIR /src/server

COPY . /src/server

RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]