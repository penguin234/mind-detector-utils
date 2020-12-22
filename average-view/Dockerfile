FROM node
MAINTAINER penguin

RUN mkdir /app
ADD . /app
WORKDIR /app

RUN npm install

EXPOSE 8080

CMD ["node", "index.js"]