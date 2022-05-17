FROM node:latest

WORKDIR /usr/nodeapp

COPY ./ ./

RUN npm install

EXPOSE 3000
CMD ["node", "app.js"]