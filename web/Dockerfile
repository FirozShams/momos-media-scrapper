FROM node:12

WORKDIR /app

RUN npm i npm@latest -g

RUN npm cache clean --force

RUN rm -rf ~/.npm

COPY ./web .

RUN npm install

EXPOSE 3000