FROM node:18-alpine

WORKDIR /app

COPY ./package.json ./

RUN yarn install

COPY . /app
RUN yarn run build

CMD ["yarn", "run", "web:serve"]