FROM node:alpine
MAINTAINER Cyril Marchive <cyril.marchive@gmail.com>

EXPOSE 3000
WORKDIR app
COPY . ./
RUN npm install

CMD ["npm", "start"]