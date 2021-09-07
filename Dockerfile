FROM node:16
WORKDIR /app
COPY package.json /app
RUN node -v
RUN npm install
# RUN npm uninstall node-sass
# RUN npm install node-sass@4.14.1
COPY . /app
CMD ["npm", "start"]
