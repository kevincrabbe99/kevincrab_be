

FROM node:14

WORKDIR /

ENV PATH /node_modules/.bin:$PATH
# ENV REACT_APP_ITIFN_API ${_REACT_APP_ITIFN_API}

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g
RUN npm install serve -g

COPY . .

EXPOSE 3000

RUN npm run build
CMD serve -s build -l 3000