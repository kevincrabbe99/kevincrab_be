FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build --omit=dev

RUN npm install -g serve

EXPOSE 5000

CMD serve -s build


