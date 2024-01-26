FROM node:12
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn --ignore-engines
COPY . ./
RUN yarn build
EXPOSE 3000
CMD yarn start
