FROM node:12

WORKDIR /app

RUN npm i npm@latest -g

RUN npm cache clean --force

RUN rm -rf ~/.npm

COPY ./api .

RUN npm install

RUN npm rebuild bcrypt --build-from-source

RUN npm run build

EXPOSE 3000