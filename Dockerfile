FROM node:14.15.4

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build:prod --omit=dev

RUN npm install -g serve

EXPOSE 5000

CMD serve -s build


