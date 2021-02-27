FROM node:latest
ENV NODE_ENV=development
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --development
COPY . .
CMD [ "node", "index" ]