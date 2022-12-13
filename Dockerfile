FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g tsc-alias
COPY . /usr/src/app
EXPOSE 3000
CMD [ "npm", "start" ]
