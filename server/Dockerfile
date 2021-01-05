FROM node:current-alpine

WORKDIR /server

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . ./

EXPOSE 3001

CMD [ "npm", "start" ]