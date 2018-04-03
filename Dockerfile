FROM node:carbon-alpine

WORKDIR /usr/src/app
ADD package.json yarn.lock ./
RUN yarn install
COPY . .

ENV PORT 3000
EXPOSE 3000
CMD [ "yarn", "start" ]
