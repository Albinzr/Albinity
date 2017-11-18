FROM node

WORKDIR /app

RUN npm install nodemon -g

COPY package.json /app/package.json
COPY routes /app/routes
COPY views /app/views
COPY public /app/public
COPY app.js /app/app.js
COPY bin /app/bin

RUN npm install

EXPOSE 3000

RUN npm start
