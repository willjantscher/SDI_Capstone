FROM node:current-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app
COPY package-lock.json /app

RUN npm install --silent

COPY . /app

EXPOSE 3000

CMD [ "npm", "start" ]