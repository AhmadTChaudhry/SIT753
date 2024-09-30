FROM node:14
FROM jenkins/inbound-agent
RUN apt-get update && apt-get install XXX

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3040
CMD [ "npm", "start" ]
