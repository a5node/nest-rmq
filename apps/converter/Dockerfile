FROM node:16-alpine as dev
WORKDIR /opt/app
ADD package*.json ./
RUN npm install glob rimraf
RUN npm install
COPY . .
RUN npm run build converter

FROM node:16-alpine
WORKDIR /opt/app
ADD package.json ./
RUN npm install --only=prod
COPY --from=dev /opt/app/dist/apps/converter ./dist
CMD ["node", "./dist/main.js"]