FROM node:latest
ENV NODE_ENV=development
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install react-scripts --silent
RUN npm install --development
COPY . ./
CMD ["npm","run","start"]