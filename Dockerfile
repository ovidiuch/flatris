FROM node:15
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn --ignore-engines
COPY . ./
RUN yarn build
EXPOSE 3000
CMD yarn start
