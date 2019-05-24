FROM node:10-alpine

RUN mkdir /var/task

COPY . /var/task
WORKDIR /var/task

COPY package*.json ./
RUN npm install
CMD ["npm", "run", "start"]
