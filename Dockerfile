FROM node:12
WORKDIR /usr/src/app
COPY . ./
RUN yarn --frozen-lockfile
RUN yarn build
EXPOSE 3000
CMD yarn start
