FROM node:14
FROM jenkins/jenkins:lts
USER root
RUN apt-get update
RUN curl -sSL https://get.docker.com/ | sh
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3040
CMD [ "npm", "start" ]
