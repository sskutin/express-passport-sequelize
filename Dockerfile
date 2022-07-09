FROM node:16
WORKDIR .
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
CMD yarn start